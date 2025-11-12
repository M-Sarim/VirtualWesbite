/**
 * Companies House API Service
 * Converts Python scraping logic to TypeScript for live company searches
 */

const BASE_URL = "https://find-and-update.company-information.service.gov.uk";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; CH-MenuScraper/1.0)",
};

export interface CompanySearchResult {
  name: string;
  company_number: string | null;
  status: string;
  incorporated_on: string | null;
  address: string;
  url: string;
  previous_names: string[];
}

export interface CompanyDetails extends CompanySearchResult {
  registered_office_address: string;
  company_type: string;
  nature_of_business: string[];
  previous_names_full: Array<{
    name: string;
    period: string;
  }>;
  accounts: {
    first_accounts_made_up_to: string | null;
    due_by: string | null;
  };
  confirmation_statement: {
    next_made_up_to: string | null;
    next_due_by: string | null;
    last_made_up_to: string | null;
  };
}

/**
 * Helper function to parse HTML string into a Document
 */
function parseHTML(html: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html");
}

/**
 * Search for companies on Companies House
 */
export async function searchCompanies(
  query: string
): Promise<CompanySearchResult[]> {
  const url = `${BASE_URL}/search/companies?q=${encodeURIComponent(query)}`;

  console.log(`Searching for: "${query}"`);
  console.log(`Request URL: ${url}`);

  try {
    const response = await fetch(url, {
      headers: HEADERS,
      mode: "cors",
      credentials: "omit",
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log(`Response received, length: ${html.length} characters`);

    const results = parseSearchPage(html);
    console.log(`Parsed ${results.length} companies`);

    return results;
  } catch (error) {
    console.error("Search failed:", error);

    // If CORS is blocking, provide helpful error message
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error(
        "CORS Error: Unable to access Companies House directly from browser. Please use a backend proxy."
      );
    }

    throw new Error("Failed to search companies. Please try again.");
  }
}

/**
 * Parse search results page HTML
 */
function parseSearchPage(html: string): CompanySearchResult[] {
  const doc = parseHTML(html);
  const results: CompanySearchResult[] = [];
  const companyItems = doc.querySelectorAll("li.type-company");

  companyItems.forEach((li) => {
    try {
      // Extract name and URL
      const h3 = li.querySelector("h3");
      const anchor = h3?.querySelector("a");
      if (!anchor) return;

      const name = anchor.textContent?.trim() || "";
      const relUrl = anchor.getAttribute("href") || "";
      const url = BASE_URL + relUrl;

      // Extract company number, status, and dates
      let number: string | null = null;
      let status = "Active";
      let incorporated: string | null = null;

      const metaParagraphs = li.querySelectorAll("p.meta");
      metaParagraphs.forEach((p) => {
        const text = p.textContent?.trim() || "";

        // Match: "12345678 - Incorporated on 1 January 2020"
        const incorporatedMatch = text.match(
          /([A-Z0-9]+)\s*-\s*(?:Incorporated|Registered) on\s+(.+)/
        );
        if (incorporatedMatch) {
          number = incorporatedMatch[1];
          incorporated = incorporatedMatch[2];
          return;
        }

        // Match: "12345678 - Dissolved on 1 January 2020"
        const dissolvedMatch = text.match(
          /([A-Z0-9]+)\s*-\s*Dissolved on\s+(.+)/
        );
        if (dissolvedMatch) {
          number = dissolvedMatch[1];
          status = "Dissolved";
          return;
        }

        // Generic pattern: "12345678 - Active"
        const genericMatch = text.match(/([A-Z0-9]+)\s*-\s*(.+)/);
        if (genericMatch && !number) {
          number = genericMatch[1];
          status = genericMatch[2];
        }
      });

      // Extract address (last paragraph in li)
      const allParagraphs = li.querySelectorAll("p");
      const address =
        allParagraphs[allParagraphs.length - 1]?.textContent?.trim() || "";

      // Extract previous names
      const previousNames: string[] = [];
      const liText = li.textContent || "";
      if (liText.includes("Matching previous names")) {
        const span = li.querySelector("span");
        if (span) {
          previousNames.push(span.textContent?.trim() || "");
        }
      }

      results.push({
        name,
        company_number: number,
        status,
        incorporated_on: incorporated,
        address,
        url,
        previous_names: previousNames,
      });
    } catch (error) {
      console.warn("Skipping malformed entry:", error);
    }
  });

  return results;
}

/**
 * Fetch detailed company information
 */
export async function fetchCompanyDetails(
  url: string
): Promise<CompanyDetails | null> {
  console.log(`Fetching details: ${url}`);

  try {
    const response = await fetch(url, {
      headers: HEADERS,
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    return parseCompanyDetailsPage(html, url);
  } catch (error) {
    console.error("Failed to fetch company details:", error);
    return null;
  }
}

/**
 * Parse company details page HTML
 */
function parseCompanyDetailsPage(html: string, url: string): CompanyDetails {
  const doc = parseHTML(html);

  // Helper to get <dd> value after <dt>
  const getDdValue = (dtText: string): string => {
    const allDt = doc.querySelectorAll("dt");
    for (const dt of allDt) {
      if (dt.textContent?.trim() === dtText) {
        const dd = dt.nextElementSibling;
        if (dd?.tagName === "DD") {
          return dd.textContent?.trim() || "";
        }
      }
    }
    return "";
  };

  // Extract core details
  const nameElement = doc.querySelector("h1.heading-xlarge");
  const name = nameElement?.textContent?.trim() || "Unknown";

  // Find company number (strong tag with alphanumeric pattern)
  const strongElements = doc.querySelectorAll("strong");
  let company_number: string | null = null;
  for (const strong of strongElements) {
    const text = strong.textContent?.trim() || "";
    if (/^[A-Z0-9]+$/.test(text) && text.length >= 8) {
      company_number = text;
      break;
    }
  }

  const data: CompanyDetails = {
    name,
    company_number,
    registered_office_address: getDdValue("Registered office address"),
    status: getDdValue("Company status"),
    company_type: getDdValue("Company type"),
    incorporated_on: null,
    address: getDdValue("Registered office address"),
    url,
    nature_of_business: [],
    previous_names: [],
    previous_names_full: [],
    accounts: {
      first_accounts_made_up_to: null,
      due_by: null,
    },
    confirmation_statement: {
      next_made_up_to: null,
      next_due_by: null,
      last_made_up_to: null,
    },
  };

  // Extract "Incorporated on" or "Registered on"
  const allDt = doc.querySelectorAll("dt");
  for (const dt of allDt) {
    const text = dt.textContent?.trim() || "";
    if (/Incorporated on|Registered on/i.test(text)) {
      const dd = dt.nextElementSibling;
      if (dd?.tagName === "DD") {
        data.incorporated_on = dd.textContent?.trim() || null;
      }
      break;
    }
  }

  // Extract SIC codes (nature of business)
  const sicList = doc.querySelector('ul[id*="sic"]');
  if (sicList) {
    const sicItems = sicList.querySelectorAll("li");
    data.nature_of_business = Array.from(sicItems).map(
      (li) => li.textContent?.trim() || ""
    );
  }

  // Extract previous names from table
  const prevNamesTable = doc.getElementById("previousNameTable");
  if (prevNamesTable) {
    const rows = prevNamesTable.querySelectorAll("tr");
    Array.from(rows)
      .slice(1)
      .forEach((tr) => {
        const tds = tr.querySelectorAll("td");
        if (tds.length >= 2) {
          const prevName = tds[0].textContent?.trim() || "";
          const period = tds[1].textContent?.trim() || "";
          data.previous_names_full.push({ name: prevName, period });
          data.previous_names.push(prevName);
        }
      });
  }

  // Extract accounts information
  const accountsHeading = Array.from(doc.querySelectorAll("h2")).find(
    (h2) => h2.textContent?.trim() === "Accounts"
  );
  if (accountsHeading) {
    const accountsPara = accountsHeading.nextElementSibling;
    if (accountsPara?.tagName === "P") {
      const htmlText = accountsPara.innerHTML;
      const madeMatch = htmlText.match(
        /made up to\s*<strong>([^<]+)<\/strong>/
      );
      const dueMatch = htmlText.match(/due by\s*<strong>([^<]+)<\/strong>/);

      data.accounts = {
        first_accounts_made_up_to: madeMatch ? madeMatch[1] : null,
        due_by: dueMatch ? dueMatch[1] : null,
      };
    }
  }

  // Extract confirmation statement
  const confirmationHeading = Array.from(doc.querySelectorAll("h2")).find(
    (h2) => h2.textContent?.trim() === "Confirmation statement"
  );
  if (confirmationHeading) {
    let nextElement = confirmationHeading.nextElementSibling;
    let count = 0;

    while (nextElement && count < 4) {
      if (nextElement.tagName === "P") {
        const htmlText = nextElement.innerHTML;
        const plainText = nextElement.textContent || "";

        if (plainText.includes("Next statement date")) {
          const strongMatches = htmlText.match(/<strong>([^<]+)<\/strong>/g);
          if (strongMatches && strongMatches.length >= 2) {
            data.confirmation_statement.next_made_up_to =
              strongMatches[0].replace(/<\/?strong>/g, "");
            data.confirmation_statement.next_due_by = strongMatches[1].replace(
              /<\/?strong>/g,
              ""
            );
          }
        }

        if (plainText.includes("Last statement dated")) {
          const lastMatch = htmlText.match(/<strong>([^<]+)<\/strong>/);
          if (lastMatch) {
            data.confirmation_statement.last_made_up_to = lastMatch[1];
          }
        }
      }
      nextElement = nextElement.nextElementSibling;
      count++;
    }
  }

  return data;
}

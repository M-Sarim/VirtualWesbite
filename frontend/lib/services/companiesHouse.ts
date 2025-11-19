import axios from "axios";

const BASE_URL = "https://virtual-wesbite.vercel.app/api/companies-house";
export interface CompanySearchResult {
  title: string;
  company_number: string;
  address_snippet: string;
  company_status?: string;
  date_of_creation?: string;
  date_of_cessation?: string;
  previous_company_names?: { name: string }[];
}

export async function searchCompanies(
  query: string
): Promise<CompanySearchResult[]> {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.items || [];
  } catch (error) {
    console.error("Search failed:", error);
    throw new Error("Failed to search companies. Please try again.");
  }
}

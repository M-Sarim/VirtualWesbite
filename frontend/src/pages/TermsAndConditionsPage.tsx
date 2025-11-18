import Header from "../../components/header";

const TermsAndConditions: React.FC = () => {
  const headingStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontSize: "36px",
    lineHeight: "45px",
    color: "rgb(64, 64, 64)",
    marginTop: "40px",
    marginBottom: "20px",
  };

  const textStyle = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "27px",
    color: "rgb(102, 112, 133)",
    marginBottom: "20px",
  };

  return (
    <>
      <Header />
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          padding: "40px 8px",
          maxWidth: "1200px",
          margin: "0 auto",
          marginTop: "90px",
        }}
      >
        <h1 style={{ ...headingStyle, textAlign: "left", marginTop: "0" }}>
          Terms of Business
        </h1>

        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "30px",
            borderRadius: "8px",
            marginBottom: "40px",
          }}
        >
          <p style={textStyle}>
            These Terms of Business ("Terms") set out the terms under which
            Services are sold and provided by Us to business customers through
            this website, www.yourvirtualofficelondon.co.uk ("Our Site") and/or
            outside of Our Site. Please read these Terms carefully and ensure
            that you understand them before ordering any Services from Us. You
            will be required to read and accept these Terms when ordering
            Services. If you do not agree to comply with and be bound by these
            Terms, you will not be able to order Services from Us including but
            not limited to through Our Site. These Terms, as well as any and all
            Contracts are in the English language only.
          </p>
        </div>

        <h2 style={headingStyle}>1. Definitions and Interpretation</h2>
        <p style={textStyle}>
          1.1 In these Terms, unless the context otherwise requires, the
          following expressions have the following meanings:
        </p>
        <p style={textStyle}>
          <strong>"Company"</strong> means the legal entity whether limited
          company, LLC, or any other type of legal person being formed and/or
          administered for you by Us under the Contract;
        </p>
        <p style={textStyle}>
          <strong>"Contract"</strong> means a contract for the purchase and sale
          of Services, as explained in Clause 6.2;
        </p>
        <p style={textStyle}>
          <strong>"Data Protection Legislation"</strong> means all applicable
          legislation in force from time to time in the United Kingdom
          applicable to data protection and privacy including, but not limited
          to, the UK GDPR (the retained EU law version of the General Data
          Protection Regulation ((EU) 2016/679), as it forms part of the law of
          England and Wales, Scotland, and Northern Ireland by virtue of section
          3 of the European Union (Withdrawal) Act 2018); the Data Protection
          Act 2018 (and regulations made thereunder); and the Privacy and
          Electronic Communications Regulations 2003 as amended;
        </p>
        <p style={textStyle}>
          <strong>"Hirer"</strong> means you in your capacity as hirer of any
          Meeting Room(s);
        </p>
        <p style={textStyle}>
          <strong>"Meeting Room(s)"</strong> means meeting room(s) available for
          hire at Our business premises;
        </p>
        <p style={textStyle}>
          <strong>"Order"</strong> means your order for the Services;
        </p>
        <p style={textStyle}>
          <strong>"Related Entities"</strong> means parent, holding or corporate
          group companies as well as other legal entities or physical persons
          holding a substantial stake or having substantial influence in a
          Company;
        </p>
        <p style={textStyle}>
          <strong>"Order Confirmation"</strong> means Our acceptance and
          confirmation of your Order;
        </p>
        <p style={textStyle}>
          <strong>"Services"</strong> means the services which are to be
          provided by Us to you as specified in your Order (and confirmed in the
          Order Confirmation); and
        </p>
        <p style={textStyle}>
          <strong>"We/Us/Our"</strong> means CAPITAL OFFICE LIMITED.
        </p>

        <h2 style={headingStyle}>2. Information About Us</h2>
        <p style={textStyle}>
          2.1 Our Site is owned and operated by CAPITAL OFFICE LIMITED, a
          limited company registered in England and Wales under company number
          06294297, whose registered address is 124 City Road, London, EC1V 2NX,
          United Kingdom.
        </p>
        <p style={textStyle}>2.2 Our VAT number is 976201416.</p>

        <h2 style={headingStyle}>3. Access to and Use of Our Site</h2>
        <p style={textStyle}>3.1 Access to Our Site is free of charge.</p>
        <p style={textStyle}>
          3.2 It is your responsibility to make any and all arrangements
          necessary in order to access Our Site.
        </p>
        <p style={textStyle}>
          3.3 Access to Our Site is provided "as is" and on an "as available"
          basis. We may alter, suspend or discontinue Our Site (or any part of
          it) at any time and without notice. We will not be liable to you in
          any way if Our Site (or any part of it) is unavailable at any time and
          for any period.
        </p>
        <p style={textStyle}>
          3.4 Use of Our Site is subject to Our Website Terms and Conditions.
          Please ensure that you have read them carefully and that you
          understand them.
        </p>

        <h2 style={headingStyle}>4. Business Customers and Consumers</h2>
        <p style={textStyle}>
          4.1 These Terms apply to business customers only. These Terms do not
          apply to individual consumers as We are not providing the Services for
          anyone's personal purposes (that is, not in connection with, or for
          use in, their trade, business, craft, or profession).
        </p>
        <p style={textStyle}>
          4.2 These Terms, together with any other terms referenced herein that
          are applicable to the Services ordered, constitute the entire
          agreement between Us and you with respect to your purchase of Services
          from Us. You acknowledge that you have not relied upon any statement,
          representation, warranty, assurance, or promise made by or on behalf
          of Us that is not set out or otherwise referred to in these Terms and
          that you shall have no claim for innocent or negligent
          misrepresentation or negligent misstatement based upon any statement
          herein.
        </p>

        <h2 style={headingStyle}>5. Services, Pricing and Availability</h2>
        <p style={textStyle}>
          5.1 We make all reasonable efforts to ensure that all general
          descriptions of the Services available from Us correspond to the
          actual Services that will be provided to you, however please note that
          the exact nature of the Services may vary depending upon your
          individual requirements and circumstances.
        </p>
        <p style={textStyle}>
          5.2 Please note that sub-Clause 5.1 does not exclude Our
          responsibility for mistakes due to negligence on Our part and refers
          only to variations of the correct Services, not to different Services
          altogether.
        </p>
        <p style={textStyle}>
          5.3 Where appropriate, you may be required to select the required
          package of Services.
        </p>
        <p style={textStyle}>
          5.4 We neither represent nor warrant that all Services will be
          available at all times and cannot necessarily confirm availability
          until confirming your Order. Availability indications are not provided
          on Our Site.
        </p>
        <p style={textStyle}>
          5.5 We make all reasonable efforts to ensure that all prices shown on
          Our Site are correct at the time of going online. We reserve the right
          to change prices and to add, alter, or remove special offers and/or
          Services from time to time and as necessary. Subject to sub-Clause 5.8
          and 5.9 changes in price will not affect any Order that you have
          already placed.
        </p>
        <p style={textStyle}>
          5.6 All prices are checked by Us when We process your Order. In the
          unlikely event that We have shown incorrect pricing information,
          except for situations regulated by sub-Clause 5.8 and 5.9 We will
          contact you in writing before proceeding with your Order to inform you
          of the mistake and to ask you how you wish to proceed. We will give
          you the option to purchase the Services at the correct price or to
          cancel your Order (or the affected part thereof). We will not proceed
          with processing your Order until you respond. If We do not receive a
          response from you within three days, We will treat your Order as
          cancelled and notify you of the same in writing.
        </p>
        <p style={textStyle}>
          5.7 In the event that the price of Services you have ordered changes
          between your Order being placed and Us processing that Order and
          taking payment, you will be charged the price shown on Our Site at the
          time of placing your Order.
        </p>
        <p style={textStyle}>
          5.8 Prices on Our Site are shown exclusive of VAT. VAT is added at
          checkout. If the VAT rate changes between your Order being placed and
          Us taking payment, the amount of VAT payable will be automatically
          adjusted when taking payment.
        </p>
        <p style={textStyle}>
          5.9 If there are changes in official fees and/or external costs
          relating to the Services you have ordered including but not limited to
          fees imposed by Companies House or Royal Mail between your Order being
          placed and Us having to pay the official fees and/or external costs,
          the amount payable will be automatically adjusted when We are taking
          payment and/or it may lead to Us to sending you a supplemental invoice
          for the extra costs.
        </p>

        <h2 style={headingStyle}>6. Orders – How Contracts Are Formed</h2>
        <p style={textStyle}>
          6.1 Our Site will guide you through the ordering process. Before
          submitting your Order to Us you will be given the opportunity to
          review your Order and amend any errors. Please ensure that you have
          checked your Order carefully before submitting it.
        </p>
        <p style={textStyle}>
          6.2 No part of Our Site constitutes a contractual offer capable of
          acceptance. Your Order constitutes a contractual offer that We may, in
          Our sole discretion, accept. Our acknowledgement of receipt of your
          Order does not mean that We have accepted it. Our acceptance is
          indicated by Us sending you an Order Confirmation by email. Only once
          We have sent you an Order Confirmation will there be a legally binding
          contract between Us and you.
        </p>
        <p style={textStyle}>
          6.3 Order Confirmations shall contain the following information:
        </p>
        <p style={{ ...textStyle, marginLeft: "30px" }}>
          6.3.1 Confirmation of the Services ordered including full details of
          the main characteristics of those Services; and
        </p>
        <p style={{ ...textStyle, marginLeft: "30px" }}>
          6.3.2 Fully itemised pricing for the Services ordered including, where
          appropriate, taxes and other additional charges.
        </p>
        <p style={textStyle}>
          6.4 If We, for any reason, do not accept or cannot fulfil your Order,
          no payment shall be taken under normal circumstances. If We have taken
          payment, any such sums will be refunded to you as soon as possible and
          in any event within 8 days.
        </p>
        <p style={textStyle}>
          6.5 If you want to change your Order, We will let you know if it is
          possible and at which costs and if possible endeavour to assist you
          with this.
        </p>
        <p style={textStyle}>
          6.6 We may cancel your Order at any time before We begin providing the
          Services in the following circumstances:
        </p>
        <p style={{ ...textStyle, marginLeft: "30px" }}>
          6.6.1 The required personnel and/or required materials necessary for
          the provision of the Services are not available; or
        </p>
        <p style={{ ...textStyle, marginLeft: "30px" }}>
          6.6.2 An event outside of Our control renders the provision of the
          Services impossible or difficult for Us (please refer to Clause 21 for
          events outside of Our control).
        </p>
        <p style={textStyle}>
          6.7 If We cancel your Order under sub-Clause 6.6 and We have taken
          payment any such sums will be refunded to you as soon as possible and
          in any event within 8 days.
        </p>
        <p style={textStyle}>
          6.8 Any refunds due under this Clause 6 will be made using the same
          payment method that you used when ordering the Services.
        </p>

        <h2 style={headingStyle}>7. Payment</h2>
        <p style={textStyle}>
          7.1 Payment for the Services will be due in the form of an advance
          payment for the Services. Price and payment details will be confirmed
          in the Order Confirmation. Your chosen payment method will be charged
          as indicated.
        </p>
        <p style={textStyle}>
          7.2 All sums due must be paid in full without any set-off,
          counterclaim, deduction, or withholding (except where any deduction or
          withholding of tax is required by law).
        </p>
        <p style={textStyle}>
          7.3 We accept the following methods of payment on Our Site:
        </p>
        <p style={{ ...textStyle, marginLeft: "30px" }}>7.3.1 VISA;</p>
        <p style={{ ...textStyle, marginLeft: "30px" }}>
          7.3.2 American Express;
        </p>
        <p style={{ ...textStyle, marginLeft: "30px" }}>7.3.3 Mastercard;</p>
        <p style={{ ...textStyle, marginLeft: "30px" }}>
          7.3.4 Switch/Maestro/Solo.
        </p>
        <p style={textStyle}>
          7.4 If you do not make any payment to Us by the due date We may charge
          you interest on the overdue sum at the rate of 8% per annum above the
          base lending rate of Barclays Bank Plc from time to time. Interest
          will accrue on a daily basis from the due date for payment until the
          actual date of payment of the overdue sum, whether before or after
          judgment. You must pay any interest due when paying an overdue sum.
        </p>
        <p style={textStyle}>
          7.5 If you are taking out a subscription to one of the Services that
          require periodic payments including but not limited to Address, Post
          and/or Telephone Handling Services and in situations regulated by
          sub-Clause 5.8 and 5.9 your acceptance of these Terms means you accept
          to pay the subscription fees when due and to ensure that you have
          always added sufficient funds on your account to cover cost of postage
          for mail forwarding services and other fees if applicable.
        </p>
        <p style={textStyle}>
          7.6 In situations regulated by sub-Clause 5.8 and 5.9; i.e., if there
          are changes in VAT, official fees and/or external costs relating to
          the Services you have ordered including but not limited to fees
          imposed by Companies House or Payment, the cost will be charged at the
          applicable rates at time of payment. This may lead to collection of
          additional payment.
        </p>

        <h2 style={headingStyle}>8. Provision of the Services</h2>
        <p style={textStyle}>
          8.1 We will provide the Services with reasonable skill and care
          consistent with best practices and standards in Our industry. We will
          begin providing the Services on the date agreed when you make your
          Order (which We shall confirm in the Order Confirmation).
        </p>
        <p style={textStyle}>
          8.2 We will continue providing the Services until completion or for a
          period set out in the Order Confirmation.
        </p>
        <p style={textStyle}>
          8.3 We will make every reasonable effort to provide the Services in a
          timely manner. We cannot, however, be held responsible for any delays
          if an event outside of Our control occurs. Please refer to Clause 21
          for events outside of Our control.
        </p>
        <p style={textStyle}>
          8.4 If We require any information, action and/or acceptance from you
          in order to provide the Services, We will inform you of this as soon
          as is reasonably possible. Depending upon the nature of the Services
          you have ordered, We may require information from or action by you and
          We cannot provide the Services if this is not forthcoming.
        </p>
        <p style={textStyle}>
          8.5 If the information you provide or the action you take or
          acceptance you provide under sub-Clause 8.4 is delayed, incomplete or
          otherwise incorrect, We will not be responsible for any delay caused
          as a result. If additional work is required from Us to correct or
          compensate for a problem arising as a result of delayed, incomplete or
          otherwise incorrect information or action that you have provided or
          taken, We may charge you a reasonable additional sum for that work.
        </p>
        <p style={textStyle}>
          8.6 In certain circumstances, for example where there is a delay in
          you sending Us information, taking action or providing acceptance
          required under sub-Clause 8.4, We may suspend or terminate the
          Services.
        </p>
        <p style={textStyle}>
          8.7 In certain circumstances, for example where We encounter a
          technical problem, We may need to suspend or otherwise interrupt the
          Services to resolve the issue.
        </p>
        <p style={textStyle}>
          8.8 If you do not pay Us for the Services as required by Clause 7, We
          may suspend the Services until you have paid any and all outstanding
          sums due. This does not affect Our right to charge you interest on any
          overdue sums under sub-Clause 7.4.
        </p>
        <p style={textStyle}>
          8.9 We always use reasonable endeavours to ensure that Our Services
          are trouble-free. If, however, there is a problem with the Services
          please contact Us as soon as is reasonable possible as specified in
          Clause 22.
        </p>

        <h2 style={headingStyle}>
          9. General Conditions for the Provision of the Services
        </h2>
        <p style={textStyle}>
          9.1 In order to set up and maintain the Services you agree to on
          request provide us with acceptable and valid form of photo
          identification and proof of residential address of all directors,
          partners, shareholders and/or other stake holders under any current or
          future public regulations or policies set by Us; and to verify all
          information provided and pass all KYC (Know Your Customer), PEP
          (Politically Exposed Persons) and Sanctions screenings performed at
          on-boarding and periodically by us or by third-party providers as
          required by us, if applicable. For the transfer and processing of
          personal data to such third-party providers please refer to Our
          Privacy Policy. Passing PEP and Sanctions screenings means that you
          and all directors, partners, shareholders and/or other stake holders
          do not fall into such categories. Passing KYC checks entails passing
          all screenings related to Related Entities. We shall have the right to
          charge for services provided in connection with the performance of
          periodic ID and KYC checks and PEP and Sanctions screenings for each
          director and/or shareholder beyond four total in a Company applying to
          be or being our client and for each director and/or shareholder in
          Related Entities in accordance with our then current pricing
          principles.
        </p>
        <p style={textStyle}>
          9.2 We may at any time require to see the original identity documents
          of directors, partners, shareholders and/or other stake holders; if We
          are unable to do this We may require such documents to be certified by
          a notary public or other approved person in Our discretion. It is at
          Our sole discretion to determine, if such identity checks performed by
          or for Us shall substitute screenings performed by third-party
          providers.
        </p>
        <p style={textStyle}>
          9.3 You agree that you shall not use the Services for any purpose
          which is counter to Our acceptable use policy as amended from time to
          time including but not limited to illegal or illegitimate purposes,
          and that such uses will constitute grounds for immediate termination
          of the Services by Us without provision of any refund.
        </p>
        <p style={textStyle}>
          9.4 We reserve the right to suspend or terminate all or any part of
          the Services without provision of any refund if We are unable to
          contact you at the contact address provided by you or if any
          directors, partners, shareholders and/or other stake holders of a
          company associated with your account do not pass identity, PEP and/or
          Sanctions screenings performed by Us or third-party providers as
          required by Us or if all required identity documentation has not been
          provided within the specified deadlines.
        </p>
        <p style={textStyle}>
          9.5 When you create a business account on behalf of your company on
          Our Site or as otherwise directed by Us, you agree to use a business
          email address as the main contact email when creating and using the
          account. Your account will be deemed as a company account and shall be
          linked to the companies listed within the portal provided on Our Site
          or as otherwise directed by Us. We may not permit the use of a
          personal email address as the main contact email within an account
          created on Our system.
        </p>

        <h2 style={headingStyle}>10. Company Formation Services</h2>
        <p style={textStyle}>
          10.1 Upon your full compliance with the formalities specified by Us
          and your provision of all relevant information and documentation
          materials, Companies are usually formed within 3 - 5 hours after
          filing of the completed applications to Companies House within
          standard working hours in London, UK; however, no guarantees as to the
          time scale of incorporation are given as the formation is dependent on
          external factors including but not limited to IT integration issues
          with Companies House.
        </p>
        <p style={textStyle}>
          10.2 We aim to send out the relevant documents forming part of the
          Company Formation Services without undue delay, but We accept no
          liability for any delays in the delivery of the services.
        </p>
        <p style={textStyle}>
          10.3 It is solely your duty to make certain that any company name or
          domain name you select for the Company is accessible for registration
          and can be legally used by the Company, and We accept no liability
          relating to the name of the Company.
        </p>
        <p style={textStyle}>
          10.4 By consenting to these Terms, you are giving Us authorisation to
          document with Companies House the statutory documents needed to
          instigate the Services, and in the event that the Services are halted,
          closed or elapse, the statutory documents required to stop the
          provision of the Services.
        </p>
        <p style={textStyle}>
          10.5 We shall not accept any legal responsibility if an administrative
          or judicial act results in the Company being stripped away from the
          Companies House Register and/or subjected to fines or administrative
          fees for non-compliance or other issues.
        </p>

        <h2 style={headingStyle}>11. Address and Post Handling Services</h2>
        <p style={textStyle}>
          11.1 You are entitled to use the mailing address provided by Us as
          part of the Services for address and/or post handling only during the
          term of subscription for such Services.
        </p>
        <p style={textStyle}>
          11.2 You shall on top of the fee chargeable for the Services pay the
          relevant administration fee being equal to the postage costs for mail
          forwarding.
        </p>
        <p style={textStyle}>
          11.3 You shall notify Us in writing without undue delay of any change
          of your address or contact details; including if you change your
          and/or your company's Registered Office Address, London Trading
          Address and/or Directors' (officers') Service Address away from the
          address provided by Us as part of the Services for address and/or post
          handling.
        </p>
        <p style={textStyle}>
          11.4 Registered Office Address Services only include the receipt and
          forwarding of statutory mail from Companies House, HMRC, ICO, IPO and
          the Pensions Regulator addressed to the Company. This also includes
          the receipt and forward of statutory mail from the judiciary system,
          however, this is subject to fair usage; other types of mail will be
          returned to sender unless you have also subscribed to and paid for an
          active London Trading Address. We may at our sole discretion decide to
          hold mail for a period of up to 14 days giving you the chance to
          upgrade to the correct service, before mail whether statutory or other
          post is either being returned to sender or disposed of at our sole
          discretion. Statutory mail is opened upon receipt in Our office and
          then free of charge scanned through Our digital mail room to the email
          address on file for the Company. If the item is unable to be scanned
          this will then be posted to the address on file. Charges apply for
          this service. We do not accept instructions from you to return
          statutory letters for a Company to the sender as it is a requirement
          that all companies must have registered office addresses;
          consequently, we shall have the right to consider such instruction as
          a termination of the Contract. If we are unable to identify by the
          envelope whether the mail item is statutory mail as herein defined,
          the mail item will be categorised as non-statutory, and hence will
          require an active London Trading Address for forwarding. A
          subscription for Registered Office Address Services can only be
          applied to one company; if multiple companies are using the address
          then multiple subscriptions for Registered Address Services must be
          purchased.
        </p>
        <p style={textStyle}>
          11.5 Mail Forwarding Service for a London Trading Address only include
          the receipt and forwarding of general mail including but not limited
          to bank and business correspondence and letters from the court
          services. The forwarding of general mail is charged at Royal Mail
          rates + 40%. This service does not include the receipt and forwarding
          of statutory mail from Companies House, HMRC, ICO, IPO and the
          Pensions Regulator for either person or the Company. We may at our
          sole discretion decide to hold mail for a period of up to 14 days
          giving you the chance to upgrade to the correct service, before mail
          is being returned to sender or disposed of. A subscription for London
          Trading Address Services covering 3 months, 6 months or 12 months
          allows general mail to be received for one company name or personal
          name and account holder's name.
        </p>
        <p style={textStyle}>
          11.6 Directors Service Address Services only include the receipt and
          forwarding of statutory mail from Companies House, HMRC, ICO, IPO and
          the Pensions Regulator addressed to the officer for which the service
          is purchased. This also includes the receipt and forward of statutory
          mail from the judiciary system, however, this is subject to fair
          usage; other types of mail may in Our sole discretion be returned to
          sender or held for a period of 14 days, giving you the chance to
          upgrade to the correct service, before being disposed of. Statutory
          mail is opened upon receipt in Our office and then scanned through Our
          digital mail room to the email address on file for the Company free of
          charge. If the item is unable to be scanned this will then be posted
          to the address on file. Charges apply for this service. Directors
          Address Services can only be applied to one officer of the Company. If
          multiple officers are using the address then multiple subscriptions to
          Directors Address Services must be purchased.
        </p>
        <p style={textStyle}>
          11.7 None of the Services allows for the receipt of postal items from
          the Driver and Vehicle Licensing Agency (DVLA), and you should not use
          Our address with DVLA as such postal items will be returned unopened
          to sender. Under UK law registration for VAT must use the address from
          where the business will operate on a day-to-day basis and where all
          business records are kept. For most businesses this address should be
          in the UK. As a general rule the HMRC will not allow the registration
          of a business at a PO box, care of (c/o), virtual office address or an
          accountant's address. These are only acceptable in exceptional
          circumstances. If you are applying to register for UK VAT but are
          abroad, you may deal directly with HMRC or appoint a tax
          representative or an agent in the UK.
        </p>
        <p style={textStyle}>
          11.8 If your subscription for a Registered Office Address and/or
          London Trading Address for the Company or you and/or Director's
          Service Address for directors of the Company is not renewed and/or
          paid on a timely basis and/or the services are terminated for other
          reasons We reserve the right to de-register the Company from the
          Registered Office Address and/or London Trading Address and/or
          de-register directors of the Company from the Director's Service
          Address and in our discretion register such directors of the Company
          at the home address(es) previously provided by you.
        </p>
        <p style={textStyle}>
          11.9 All postal items and/or deliveries received at Registered Office
          Address and/or London Trading Address for the Company or you and/or
          Director's Service Address for directors of the Company are received
          and handled entirely at your risk and We shall not accept any
          liability or responsibility whatsoever for any losses, shortages or
          damages to such postal items and/or deliveries howsoever caused.
        </p>
        <p style={textStyle}>
          11.10 If you expect to receive large (larger than length 300mm x width
          215mm x height 55mm), bulky or heavy items via the Services provided
          by Us, you must notify Us minimum 24 hours in advance either by
          telephone or email prior to the expected delivery date. We shall
          charge Our current storage fees for the storage of such items until
          the item is collected.
        </p>
        <p style={textStyle}>
          11.11 We securely destroy any post including parcels if you request Us
          to do so once you have been notified via email about the item. We use
          a certified secure third-party supplier to assist Us with this task,
          and We may charge you Our current fees for the safe destruction of
          such items.
        </p>
        <p style={textStyle}>
          11.12 We shall take all reasonable steps to ensure accurate and
          efficient dealing with all communications including but not limited to
          mail and post received on your behalf and that mail is handled in
          accordance with your subscription for Services and your instructions.
          However, no warranty or liability is accepted by Us, Our staff or
          agents in relation to the Services provided, and We do not allow you
          to have any a) important or valuable documents or items; or b)
          prohibited items pursuant to the Royal Mail listing of such items sent
          to Us as providers of the Registered Office Address and/or London
          Trading Address or you for the Company and/or Director's Service
          Address for directors of the Company.
        </p>
        <p style={textStyle}>
          11.13 By ordering address and/or post handling as part of the Services
          including subscription for a Registered Office Address and/or London
          Trading Address for the Company or you and/or Director's Service
          Address Services for directors of the Company you provide Us with
          power of attorney to receive and formally sign for the receipt of any
          post addressed to the Company, you and applicable director(s) of the
          Company.
        </p>
        <p style={textStyle}>
          11.14 Any postal items received will if We are not instructed
          otherwise and if agreed be forwarded to the address specified by you
          by Royal Mail untracked and uninsured.
        </p>
        <p style={textStyle}>
          11.15 Our address should not be used by the Company, you and/or any
          directors or other stake holders of the Company until all identity
          documentation has been fully verified and approved by Our compliance
          team, and until such approval has been obtained We reserve the right
          to hold all statutory mail that has been received at Our address in a
          digital format and hold other types of mail for a limited period of
          time or refuse receipt at reception if delivered by tracked type of
          mail.
        </p>

        <h2 style={headingStyle}>
          12. Bank and Merchant Account Referral Services
        </h2>
        <p style={textStyle}>
          12.1 If you are using Our bank and merchant account referral service
          you consent to your personal data being transferred by Us to the
          financial institution of your choice.
        </p>
        <p style={textStyle}>
          12.2 Specific Terms and Conditions of the relevant financial
          institution(s) relating to the financial services to be provided by
          the financial institution(s) apply to such services.
        </p>
        <p style={textStyle}>
          12.3 Our bank and merchant account referral service cannot guarantee
          that the relevant financial institutions accept the Company and/or you
          as a client.
        </p>

        <h2 style={headingStyle}>13. Nominee Services</h2>
        <p style={textStyle}>
          13.1 We may provide the Company with nominee directors and/or
          stakeholders if so ordered by you and accepted by Us in the Order
          Confirmation.
        </p>
        <p style={textStyle}>
          13.2 Specific Terms and Conditions relating to the Services specified
          in sub-Clause 13.1 apply to such Services.
        </p>

        <h2 style={headingStyle}>14. Meeting Room Services</h2>
        <p style={textStyle}>
          14.1 The Hirer is to leave the Meeting Room(s) at the agreed allocated
          time slot. In the event the Hirer is late for the agreed allocated
          time slot the Hirer cannot carry over the booked time period past the
          agreed allocated time slot. In the event the Hirer overstays the
          agreed allocated time slot, We will charge the Hirer the hourly rate
          for the Meeting Room for the extra time. The Hirer will be expected to
          immediately pay for extra time at Our reception. Non-payment will
          result in an invoice being raised to the Hirer with an applicable
          admin fee of £80.00 added to the outstanding balance.
        </p>
        <p style={textStyle}>
          14.2 The Hirer is to take good care of and not cause any damage to be
          done to the Meeting Room(s) or to any fittings, equipment or other
          property in the Meeting Room(s). The Hirer is to make good and pay for
          any such damage caused by any act or neglect of the Hirer or anyone
          for whom the Hirer is responsible, or anyone permitted by the Hirer to
          enter the Meeting Room(s).
        </p>
        <p style={textStyle}>
          14.3 We will not be liable for any injury to or death of any person
          attending the Meeting Room(s) or for any losses, claims, demands,
          actions, proceedings, damages, costs or expenses or other liability
          incurred by the Hirer in the exercise of the rights granted by the
          right to hire the Meeting Room(s).
        </p>
        <p style={textStyle}>
          14.4 We will not accept responsibility or liability in respect of any
          damage to or loss of any goods, articles or property of any kind
          brought into or left at the Meeting Room(s) or left or deposited with
          any officer or employee of Us either by the Hirer or by any other
          person. The Hirer will indemnify Us against such liabilities as are
          mentioned in this Clause 14.
        </p>
        <p style={textStyle}>
          14.5 We can provide basic refreshments such as tea, coffee, and water
          for paid bookings over 2 hours of duration. If additional tea and
          coffee is required, we charge £5.00 for a top up of the provided
          sachets and hot water. For free bookings of the Meeting Room(s), We
          charge basic refreshments for up to 4 persons at £5.00 and up to 8
          persons at £9.00. The prices detailed in this sub-Clause 14.5 herein
          is subject to change without notice.
        </p>
        <p style={textStyle}>
          14.6 The Meeting Room(s) are not designed for food service. Only light
          refreshments or snacks (sandwiches, cookies, water, sodas, tea,
          coffee, etc.,) are allowed in the Meeting Room(s). We will only
          provide basic refreshments. Any snacks desired for to be enjoyed in
          the Meeting Room(s) must be provided by the Hirer. Hot meals (pizzas,
          soups etc.) and alcoholic beverages are not allowed in the Meeting
          Room(s).
        </p>

        <h2 style={headingStyle}>
          15. Telephone, Call Answering and Voicemail services
        </h2>
        <p style={textStyle}>
          15.1 If you subscribe for Our call answering and/or voicemail services
          you will be assigned a unique telephone number starting with 0203 or a
          telephone number starting with 0207 (extra fee may be payable).
        </p>
        <p style={textStyle}>
          15.2 You may only divert calls from your own telephone number to your
          assigned telephone number with Us if you subscribe for Our call
          answering and/or voicemail services.
        </p>
        <p style={textStyle}>
          15.3 Our call answering service is subject to fair usage. We may at
          our sole discretion decide to pause or stop the provision of the
          services or increase the charges for the provision of the services, if
          We find that the volume or character of incoming calls is outside the
          standard on which the call answering service is based.
        </p>
        <p style={textStyle}>
          15.4 The unique telephone number provided by Us to you as part of the
          telephone, call answering and/or voicemail services belongs to Us and
          is made available for you during the term of subscription for such
          Services.
        </p>
        <p style={textStyle}>
          15.5 You are entitled to use the telephone number provided by Us as
          part of the telephone, call answering and/or voicemail services only
          during the term of subscription for such Services.
        </p>
        <p style={textStyle}>
          15.6 Telephone calls taken for you as part of Our call answering
          service may be recorded and monitored by Us for training and quality
          purposes.
        </p>
        <p style={textStyle}>
          15.7 For complete details of Our collection, processing, storage, and
          retention of personal data including personal data collected and/or
          processed during such telephone calls please refer to Our Privacy
          Policy located at the footer of Our Site.
        </p>
        <p style={textStyle}>
          15.8 If you are utilising Our call answering service you may serve as
          data controller, and We will serve as data processors in regard to
          personal data collected; you are advised to seek legal counsel to
          determine if the service may impact your legal responsibilities under
          the data protection regulation including but not limited to your
          privacy notice.
        </p>

        <h2 style={headingStyle}>16. Google Adwords Vouchers</h2>
        <p style={textStyle}>
          16.1 Any supplier vouchers including but not limited to Google Adwords
          Vouchers provided by Us are subject to the supplier’s terms.
        </p>
        <p style={textStyle}>
          16.2 Any free Google Adwords Vouchers provided are for use only on new
          Adwords accounts and are subject to Google’s Terms and Conditions as
          found on Google’s website.
        </p>

        <h2 style={headingStyle}>17. Items not Included in the Services</h2>
        <p style={textStyle}>17.1 The Services do not include the following:</p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          17.1.1 Book keeping services;
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          17.1.2 Processing of yearly accounts;
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          17.1.3 Accountancy services;
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>17.1.4 Auditing;</p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          17.1.5 Legal and/or tax counselling.
        </p>
        <p style={textStyle}>
          17.2 Any provision by Us of the services specified under sub-Clause
          17.1 requires Our prior written approval.
        </p>

        <h2 style={headingStyle}>18. Cancelling the Services</h2>
        <p style={textStyle}>
          18.1 Cancellation of the Contract shall be subject to the specific
          terms governing the Services in question and may be subject to a
          minimum contract duration. Details of the relevant duration,
          cancellation provisions and minimum notice periods will be provided
          and confirmed in the Order Confirmation or on Our Site.
        </p>
        <p style={textStyle}>
          18.2 Eligibility for refunds may vary according to the Services
          ordered. You will be required to pay for Services supplied up until
          the point at which you inform Us that you wish to cancel (please note
          that this may include charges for preparatory work that We have
          undertaken where We have reasonably incurred costs) and for any
          Services ordered by you where fees are non-refundable. Such sums will
          be deducted from any refund due to you or, if no refund is due, We
          will invoice you for the relevant sums.
        </p>
        <p style={textStyle}>
          18.3 Refunds under this Clause 18 will be issued to you as soon as
          possible, and in any event within 14 calendar days of the day on which
          you inform Us that you wish to cancel.
        </p>
        <p style={textStyle}>
          18.4 Refunds under this Clause 18 will be made using the same payment
          method that you used when ordering the Services.
        </p>

        <h2 style={headingStyle}>19. Our Rights to Cancel</h2>
        <p style={textStyle}>
          19.1 We may cancel the Contract after We have begun providing the
          Services due to an Event outside of Our control (as under sub-Clause
          21.2.4), or due to the non-availability of required personnel and/or
          required materials necessary for the provision of the Services. In
          such cases, you will only be required to pay for Services that We have
          already provided up until the point at which We inform you that We are
          cancelling. Such sums will be deducted from any refund due to you or,
          and if no refund is due, We will invoice you for the relevant sums.
        </p>
        <p style={textStyle}>
          19.2 Once We have begun providing the Services, We may in Our sole
          discretion cancel the Contract at any time and will give you at least
          14 calendar days’ written notice of such cancellation. We shall not be
          required to disclose the reason for such cancellation. You will only
          be required to pay for Services that you have received. Such sums will
          be deducted from any refund due to you or, if no refund is due, We
          will invoice you for the relevant sums.
        </p>
        <p style={textStyle}>
          19.3 We may cancel immediately by giving you written notice in the
          following circumstances:
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          19.3.1 You or any directors, partners, shareholders and/or other stake
          holders of the Company fail to provide Us or relevant third-party
          providers as required by Us with acceptable form of identification and
          proof of residential address or fail to pass all PEP (Politically
          Exposed Persons) and Sanctions screenings within a reasonable
          timeframe in Our sole discretion.
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          19.3.2 You fail to make a payment by the due date as set out in Clause
          7. Cancellation does not affect Our right to charge you interest on
          any overdue sums as set out in sub-Clause 7.4;
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          19.3.3 Sanctions for non-compliance with important public protective
          measures or other irregularities are imposed on you or the Company by
          Trading Standards or other public authorities, and these are in Our
          sole reasonable discretion deemed to be incompatible with Us
          continuing the Services; or
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          19.3.4 You breach the Contract in a material way and fail to remedy
          the breach within 3 calendar days of Us asking you in writing to do
          so.
        </p>
        <p style={textStyle}>
          19.4 Refunds under sub-Clause 19.3 are provided in Our sole
          discretion.
        </p>
        <p style={textStyle}>
          19.5 Subject to sub-Clause 19.4 refunds under sub-Clauses 19.1 – 19.3
          will be issued to you as soon as possible, and in any event within 14
          calendar days of the day on which you inform Us that you wish to
          cancel.
        </p>
        <p style={textStyle}>
          19.6 Refunds under this Clause 19 will be made using the same payment
          method that you used when ordering the Services.
        </p>

        <h2 style={headingStyle}>20. Our Liability</h2>
        <p style={textStyle}>
          20.1 Subject to sub-Clause 20.4, We will not be liable to you, whether
          in contract, tort (including negligence), breach of statutory duty, or
          otherwise, for any loss of profit, loss of business, interruption to
          business, for any loss of business opportunity, or for any indirect or
          consequential loss arising out of or in connection with any contract
          between you and Us.
        </p>
        <p style={textStyle}>
          20.2 We will not be liable for any costs including but not limited to
          fines and/or penalties resulting in the late filing of accounts and/or
          confirmation statement(s) for the Company as it is your responsibility
          to ensure timely filings of any documents or other formalities on
          behalf of the Company.
        </p>
        <p style={textStyle}>
          20.3 Subject to sub-Clause 20.4 Our total liability to you for all
          other losses arising out of or in connection with any contract between
          you and Us, whether in contract, tort (including negligence), breach
          of statutory duty, or otherwise, shall be either £100 or 50% of the
          total sums paid by you to Us under the Contract, whichever is the
          lower sum.
        </p>
        <p style={textStyle}>
          20.4 Nothing in these Terms seeks to limit or exclude Our liability
          for death or personal injury caused by Our negligence (including that
          of Our employees, agents or sub-contractors); for fraud or fraudulent
          misrepresentation; or for any other matter in respect of which
          liability cannot be excluded or restricted by law.
        </p>

        <h2 style={headingStyle}>
          21. Events Outside of Our Control (Force Majeure)
        </h2>
        <p style={textStyle}>
          21.1 We will not be liable for any failure or delay in performing Our
          obligations where that failure or delay results from any cause that is
          beyond Our reasonable control. Such causes include, but are not
          limited to: power failure, internet service provider failure,
          industrial action by third parties, civil unrest, fire, explosion,
          flood, storms, earthquakes, subsidence, acts of terrorism, acts of
          war, governmental action, epidemic or other natural disaster, or any
          other event that is beyond Our reasonable control.
        </p>
        <p style={textStyle}>
          21.2 If any event described under this Clause 21 occurs that is likely
          to adversely affect Our performance of any of Our obligations under
          these Terms:
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          21.2.1 We will inform you as soon as is reasonably possible;
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          21.2.2 Our obligations under these Terms (and therefore the Contract)
          will be suspended and any time limits that We are bound by will be
          extended accordingly;
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          21.2.3 We will inform you when the event outside of Our control is
          over and provide details of any new dates, times or availability of
          Services as necessary;
        </p>
        <p style={{ ...textStyle, marginLeft: "24px" }}>
          21.2.4 If the event outside of Our control continues for more than 14
          calendar days We may cancel the Contract and inform you of the
          cancellation. Any refunds due to you as a result of that cancellation
          will be paid to you as soon as is reasonably possible and in any event
          no later than 14 calendar days after the date on which We inform you
          of the cancellation.
        </p>

        <h2 style={headingStyle}>22. Communication and Contact Details</h2>
        <p style={textStyle}>
          22.1 If you wish to contact Us with general questions or complaints,
          for matters relating to Our Services or your Order, please contact Us
          by telephone at 020 3820 0241, by email at info@capital-office.co.uk,
          or by post to Us at 124 City Road, London, EC1V 2NX, United Kingdom.
        </p>

        <h2 style={headingStyle}>23. Complaints and Feedback</h2>
        <p style={textStyle}>
          23.1 We always welcome feedback from Our customers and, whilst We
          always use all reasonable endeavours to ensure that your experience as
          a customer of Ours is a positive one, We nevertheless want to hear
          from you if you have any cause for complaint.
        </p>

        <h2 style={headingStyle}>
          24. How We Use Your Personal Information (Data Protection)
        </h2>
        <p style={textStyle}>
          24.1 All personal information of yours that We may use will be
          collected, processed, and held in accordance with the provisions of
          the Data Protection Legislation and your rights thereunder.
        </p>
        <p style={textStyle}>
          24.2 For complete details of Our collection, processing, storage, and
          retention of personal data including, but not limited to, the
          purpose(s) for which personal data is used, the legal basis or bases
          for using it, details of your rights and how to exercise them, and
          personal data sharing (where applicable), please refer to Our Privacy
          Policy located at the footer of Our Site. When We serve as data
          processors Our Privacy Policy serves as Data Processing Agreement
          between you as data controller and Us as data processors under the
          Data Protection Legislation.
        </p>
        <p style={textStyle}>
          24.3 Our Privacy Policy is integrated into these Terms by reference
          and must be accepted by you in order for Us to provide and continue to
          provide the Services to you.
        </p>

        <h2 style={headingStyle}>25. Other Important Terms</h2>
        <p style={textStyle}>
          25.1 We may transfer (assign) any or all of Our obligations and/or
          rights under these Terms (and under the Contract, as applicable) to a
          third-party (this may happen, for example, if We sell Our business).
          If this occurs, you will be informed by Us in writing. Your rights
          under these Terms will not be affected.
        </p>
        <p style={textStyle}>
          25.2 You may not transfer (assign) your obligations and rights under
          these Terms (and under the Contract, as applicable) without Our
          express written permission.
        </p>
        <p style={textStyle}>
          25.3 The Contract is between you and Us. It is not intended to benefit
          any other person or third party in any way and no such person or party
          will be entitled to enforce any provision of these Terms.
        </p>
        <p style={textStyle}>
          25.4 If any of the provisions of these Terms are found to be unlawful,
          invalid or otherwise unenforceable by any court or other authority,
          that / those provision(s) shall be deemed severed from the remainder
          of these Terms. The remainder of these Terms shall be valid and
          enforceable.
        </p>
        <p style={textStyle}>
          25.5 No failure or delay by Us in exercising any of Our rights under
          these Terms means that We have waived that right, and no waiver by Us
          of a breach of any provision of these Terms means that We will waive
          any subsequent breach of the same or any other provision.
        </p>
        <p style={textStyle}>
          25.6 Notices under these Terms by you must be served by registered
          post to Our registered office address. Notices under these Terms
          including to directors and/or shareholders of a Company can be served
          by Us by any reasonable means including by post or courier service to
          the Company’s registered address, by post or courier service to any of
          the directors’ addresses and/or by email to the email address
          registered by the Company for forwarding of post.
        </p>
        <p style={textStyle}>
          25.7 We may revise these Terms from time to time including but not
          limited to in response to changes in relevant laws and other
          regulatory requirements.
        </p>

        <h2 style={headingStyle}>26. Law and Jurisdiction</h2>
        <p style={textStyle}>
          26.1 These Terms, and the relationship between you and Us (whether
          contractual or otherwise) shall be governed by, and construed in
          accordance with, English law.
        </p>
        <p style={textStyle}>
          26.2 Any dispute, controversy, proceedings, or claim between you and
          Us relating to the Terms or to the relationship between you and Us
          (whether contractual or otherwise) shall be subject to the exclusive
          jurisdiction of the courts of England and Wales.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import companyHouseMainOffice from "@/src/images/company-house-office.jpeg";
import callCenterWoman from "@/src/images/support representative on a call.png";
import officeTeam from "@/src/images/office team.jpeg";
import clientDealing from "@/src/images/support agent dealing with a client.jpeg";
import aboutUsBg from "@/src/images/background image.jpg";

const AboutUsPage: React.FC = () => {
  // Scroll to Mission Statement section
  const handleReadMore = () => {
    const el = document.getElementById("experts-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header showFlashSale={false} />
      <div
        className="relative w-full min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-4 md:px-0"
        style={{
          background: `url(${aboutUsBg}) center/cover no-repeat`,
        }}
      >
        {/* Blurred Overlay */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="w-full h-full absolute inset-0 backdrop-blur-[6px] bg-black/40" />
        </div>
        <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-16">
          {/* Left: Heading and Text */}
          <div className="flex-1 flex flex-col justify-center text-white max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              About us
            </h1>
            <p
              className="text-lg md:text-xl font-medium mb-8 leading-relaxed"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.25)" }}
            >
              We are a leading company formation service dedicated to helping
              entrepreneurs and businesses establish their presence with
              confidence. Our expert team brings years of industry experience,
              ensuring every client receives professional guidance, transparent
              processes, and exceptional customer service. We pride ourselves on
              our integrity, efficiency, and commitment to your success.
            </p>
            <Button
              variant="default"
              size="lg"
              className="w-fit"
              onClick={handleReadMore}
            >
              Read more
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Mission Statement Section ---
const MissionSection: React.FC = () => (
  <section
    id="mission-section"
    className="w-full max-w-6xl mx-auto py-20 px-4 md:px-0"
    style={{ background: "#fff" }}
  >
    <div
      className="flex flex-col md:flex-row items-start md:items-center justify-center"
      style={{ gap: "60px" }}
    >
      {/* Left: Mission Statement Block */}
      <div className="flex-1 max-w-2xl text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">
          Mission Statement
        </h2>
        <div className="space-y-7">
          <p className="text-gray-700 text-lg md:text-xl font-normal leading-relaxed">
            Dart Security’s mission is to empower entrepreneurs and businesses
            to start, grow, and thrive with confidence. We provide tailored
            company formation services and ongoing support, ensuring every
            client receives professional guidance, transparent processes, and
            exceptional customer care.
          </p>
          <p className="text-gray-700 text-lg md:text-xl font-normal leading-relaxed">
            Our team brings decades of industry experience and a commitment to
            integrity, efficiency, and your success. We understand that starting
            a new company can be daunting, especially for first-time business
            owners. That’s why we’re here to make the process seamless and
            stress-free.
          </p>
          <p className="text-gray-700 text-lg md:text-xl font-normal leading-relaxed">
            Based on City Road since 1971, we have a proud history of helping
            clients register their companies—long before digital registration,
            our team would walk across the road to Companies House to lodge new
            companies by hand. Today, we combine tradition with innovation to
            help you succeed.
          </p>
        </div>
      </div>
      {/* Right: Image and Caption */}
      <div className="flex-1 flex flex-col items-center md:items-start w-full h-full">
        <div
          className="overflow-hidden shadow-md bg-gray-100 flex items-center justify-center h-full"
          style={{ width: "100%", maxWidth: "709px" }}
        >
          <img
            src={companyHouseMainOffice}
            alt="Company House Main Office, Cardiff"
            className="object-cover h-full"
            style={{
              width: "100%",
              maxWidth: "709px",
              borderRadius: 0,
              display: "block",
            }}
          />
        </div>
        <div
          className="text-gray-500 text-lg font-medium text-left mt-3 md:mt-4"
          style={{ maxWidth: "709px" }}
        >
          Main office of Companies House in Cardiff.
        </div>
      </div>
    </div>
  </section>
);

// --- Team & Testimonial Section ---
const TeamAndTestimonialSection: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto py-20 px-4 md:px-0 flex flex-col gap-16">
    {/* Row 1 */}
    <div className="flex flex-col md:flex-row gap-10 md:gap-[60px] items-start">
      {/* Image left */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="overflow-hidden shadow-md bg-gray-100 flex items-center justify-center"
          style={{ width: "100%", maxWidth: "500px", height: "100%" }}
        >
          <img
            src={callCenterWoman}
            alt="Young woman working in call center office with headphones"
            className="object-cover"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "100%",
              borderRadius: 0,
              display: "block",
            }}
          />
        </div>
      </div>
      {/* Text right */}
      <div className="flex-1 flex flex-col items-start">
        <div
          className="rounded-full p-2 mb-4"
          style={{ backgroundColor: "#FDF7FA" }}
        >
          {/* Pricing Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#D30B5F"
          >
            <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
          Why Choose Us To Set Up Your Company?
        </h3>
        <p className="text-gray-600 text-base md:text-lg mb-4">
          Our team has well over 100+ years of combined expertise forming
          companies and providing corporate and secretarial services that help
          thousands of our clients grow their businesses each year.
        </p>
        <p className="text-gray-600 text-base md:text-lg mb-4">
          We are incredibly passionate about the quality of our service, and we
          are incredibly proud of our customer feedback, as shown by our
          excellent reviews and ratings. Time and time again we are selected for
          the value and expertise that our team is known for.
        </p>
        <p className="text-gray-600 text-base md:text-lg">
          We are an authorised Companies House eFiling agent which allows us to
          register companies quickly for clients in the UK and overseas. In most
          cases, once submitted to Companies House, the company formation
          process is fully completed in just over 3 hours.
        </p>
      </div>
    </div>
    {/* Row 2 */}
    <div className="flex flex-col md:flex-row-reverse gap-10 md:gap-[60px] items-start">
      {/* Image right */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="overflow-hidden shadow-md bg-gray-100 flex items-center justify-center"
          style={{ width: "100%", maxWidth: "500px", height: "100%" }}
        >
          <img
            src={officeTeam}
            alt="Office team"
            className="object-cover"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "100%",
              borderRadius: 0,
              display: "block",
            }}
          />
        </div>
      </div>
      {/* Text left */}
      <div className="flex-1 flex flex-col items-start">
        <div
          className="rounded-full p-2 mb-4"
          style={{ backgroundColor: "#FDF7FA" }}
        >
          {/* Team Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#D30B5F"
          >
            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
          Our team is your team
        </h3>
        <p className="text-gray-600 text-base md:text-lg mb-4">
          Our team have a vast amount of experience with over 100 years combined
          industry experience in company formation and secretarial services. The
          people behind Dart Security have helped shape the company formation
          industry and have been providing leading and innovative services to a
          global audience.
        </p>
        <p className="text-gray-600 text-base md:text-lg mb-4">
          We understand that any business can provide a service but it’s the
          people behind the company that make the difference. We are focused to
          bringing you the best service at a price that’s affordable.
        </p>
        <p className="text-gray-600 text-base md:text-lg">
          If you would like to get in touch with us today you can{" "}
          <a
            href="/contact"
            className="text-[#D30B5F] underline hover:text-[#B00B4F]"
          >
            contact us here
          </a>{" "}
          or feel free to browse our website.
        </p>
      </div>
    </div>
    {/* Row 3 */}
    <div className="flex flex-col md:flex-row gap-10 md:gap-[60px] items-start">
      {/* Image left */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="overflow-hidden shadow-md bg-gray-100 flex items-center justify-center"
          style={{ width: "100%", maxWidth: "500px", height: "100%" }}
        >
          <img
            src={clientDealing}
            alt="Client dealing"
            className="object-cover"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "100%",
              borderRadius: 0,
              display: "block",
            }}
          />
        </div>
      </div>
      {/* Testimonial right */}
      <div className="flex-1 flex flex-col items-start">
        <div
          className="rounded-full p-2 mb-4"
          style={{ backgroundColor: "#FDF7FA" }}
        >
          {/* Chart Up Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#D30B5F"
          >
            <path d="m296-320 122-122 80 80 142-141v63h80v-200H520v80h63l-85 85-80-80-178 179 56 56Zm-96 200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
          We go the extra mile for our clients and it shows
        </h3>
        <p className="text-gray-600 text-base md:text-lg mb-4">
          “I recently registered my new company with Dart Security and had
          fantastic experiences throughout the process. The website was easy to
          use, and the registration process was straightforward. Special mention
          to customer service representative, Charlie, who was extremely helpful
          and efficient in answering all my queries and providing guidance. I’m
          pleased to say that I passed the compliance checks and my company
          registration was underway. I would highly recommend Dart Security Ltd
          to anyone looking to register a company in the UK – they make the
          process smooth and hassle-free.”
        </p>
      </div>
    </div>
    {/* Closing Statement */}
    <div className="w-full text-center mt-16">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
        We make forming your company
        <br />
        simple, fast and affordable!
      </h2>
      <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12">
        There are many reasons why Dart Security is a UK leading formation agent
      </p>
      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-10 md:gap-x-12 max-w-6xl mx-auto text-center md:text-left">
        {/* Row 1 */}
        <div className="flex flex-col items-center md:items-start h-full">
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            No hidden <span className="text-[#D30B5F]">charges</span>
          </h4>
          <p className="text-gray-600 text-base">
            Our pricing is clear and transparent. When registering your limited
            company with us, you’ll pay what’s advertised with no hidden costs
            or additional charges.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start h-full">
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            Speedy <span className="text-[#D30B5F]">service</span>
          </h4>
          <p className="text-gray-600 text-base">
            Our service is designed to make the company setup uk process as fast
            as possible. It typically takes us hours to form a company. We are
            committed to providing you with a streamlined and efficient
            formation service that ensures your company is operational as
            quickly as possible, allowing you to focus on growing your business.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start h-full">
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            100 Years of industry{" "}
            <span className="text-[#D30B5F]">experience</span>
          </h4>
          <p className="text-gray-600 text-base">
            We are UK's top rated company formation agents. Work with us.
            Leverage over 100 years of combined experience in company formation,
            and take the hassle out of setting up your business.
          </p>
        </div>
        {/* Row 2 */}
        <div className="flex flex-col items-center md:items-start h-full">
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            Satisfaction <span className="text-[#D30B5F]">guaranteed</span>
          </h4>
          <p className="text-gray-600 text-base">
            By working with us, be confident that your satisfaction is our top
            priority. We are committed to providing you with; the best service,
            up-to-date information and user-friendly company management tools,
            making your experience seamless and pleasant. 99% of our clients
            rate our service as “Great” and “Excellent” on Trustpilot.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start h-full">
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            Competitive <span className="text-[#D30B5F]">Prices</span>
          </h4>
          <p className="text-gray-600 text-base">
            We offer competitive prices and an array of company formation
            packages. Our main goal is to help your business succeed by
            providing pricing options that fit your budget and unique needs.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start h-full">
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            Privacy and <span className="text-[#D30B5F]">security</span>
          </h4>
          <p className="text-gray-600 text-base">
            We prioritise the privacy and security of your sensitive
            information, including payment details and company and personal
            information. We designed our system with the utmost care and
            diligence, integrating measures to keep your data safe and
            confidential.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const AboutUsPageWithMission: React.FC = () => (
  <>
    <AboutUsPage />
    {/* Intro text before Mission Statement */}
    <div
      id="experts-section"
      className="w-full flex flex-col items-center justify-center py-8 px-4 md:px-0 mt-16"
    >
      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mb-4">
        Our team of experts are here to help
      </h2>
      <p className="text-xl md:text-2xl text-gray-700 text-center max-w-3xl">
        We have an enviable history that is linked to our clients success
      </p>
    </div>
    <MissionSection />
    <TeamAndTestimonialSection />
    <Footer />
  </>
);

export default AboutUsPageWithMission;

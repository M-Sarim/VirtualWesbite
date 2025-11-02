import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

const pricingPackages = [
  {
    name: "Basic",
    description:
      "A fast, affordable way to register your UK limited company. Perfect for simple setups or dormant businesses.",
    price: "£54.99",
    vat: "+ VAT",
    features: [
      { name: "UK Limited Company", hasInfo: true },
      { name: "Digital Company Documents", hasInfo: true },
    ],
    badge: null,
  },
  {
    name: "Privacy",
    description:
      "Start your company the right way. Includes a registered office address to meet legal requirements and protect your privacy.",
    price: "£59.99",
    vat: "+ VAT",
    features: [
      { name: "Everything in Basic, plus...", hasInfo: true },
      { name: "Registered Office Address", hasInfo: true },
    ],
    badge: null,
  },
  {
    name: "Comprehensive",
    description:
      "Form your company easily and stay fully compliant from day one. Everything you need to start trading.",
    price: "£99.99",
    vat: "+ VAT",
    features: [
      { name: "Everything in Privacy, plus...", hasInfo: true },
      { name: "1st Year Confirmation Statement Filing", hasInfo: true },
    ],
    badge: null,
  },
  {
    name: "Ultimate",
    description:
      "Go all in. Form your company with added extras and dedicated support for a confident start.",
    price: "£149.99",
    vat: "+ VAT",
    features: [
      { name: "Everything you need for...", hasInfo: true },
      { name: "1 year of Mail Forwarding plus many more...", hasInfo: true },
    ],
    badge: "BEST VALUE",
  },
];

const features = {
  addressFeatures: [
    {
      name: "Receive Business Mail in 3 Months",
      plans: [true, true, false, false, true],
    },
    {
      name: "Unique Office / Suite Number",
      plans: [false, true, true, true, true],
    },
    {
      name: "Unlimited Post Items Included",
      plans: [true, true, true, false, false],
    },
    {
      name: "Registered or Nominated Address",
      plans: [false, false, false, false, true],
    },
    {
      name: "Prestige Business Directory Address",
      plans: [false, true, true, false, true],
    },
    {
      name: "Virtual Business Address",
      plans: [false, false, true, true, true],
    },
    { name: "Prestigious EC1 Address", plans: [true, true, true, true, true] },
    {
      name: "Multi Currency Bank Account with up to £99 Cash Back",
      plans: [true, true, true, true, true],
    },
    {
      name: "Free Stationary Mail Scanning",
      plans: [true, true, true, false, true],
    },
    {
      name: "Choose, Scan, Forward or Collect",
      plans: [false, true, true, true, true],
    },
    {
      name: "Business Mail Forwarding",
      plans: [false, true, true, false, true],
    },
    {
      name: "Accept Signed-For Post & Parcels",
      plans: [false, false, true, true, true],
    },
    {
      name: "Proof of Address UK / International Use",
      plans: [false, true, true, false, true],
    },
    { name: "Global Courier Service", plans: [true, true, true, true, true] },
    {
      name: "View Business Mail Received Online",
      plans: [true, true, true, true, true],
    },
    { name: "Sender Information", plans: [true, true, false, false, true] },
    {
      name: "New Business Mail Notification",
      plans: [true, true, true, true, true],
    },
    {
      name: "Free Accounting HMRC Consultation",
      plans: [true, true, true, true, true],
    },
  ],
  callHandling: [
    {
      name: "Prime 0345 or 1300 Number",
      plans: [false, false, false, true, true],
    },
    {
      name: "Unlimited Inbound Calls",
      plans: [false, false, false, true, true],
    },
    { name: "Unlimited Messages", plans: [false, false, false, false, true] },
    { name: "No Cost Per Call", plans: [false, false, false, true, true] },
    {
      name: "Professionally Trained PA's",
      plans: [false, false, false, true, true],
    },
    {
      name: "Optional Live Call Transfer",
      plans: [false, false, false, false, true],
    },
    {
      name: "Calls Answered in Your Greeting",
      plans: [false, false, false, true, true],
    },
    {
      name: "Callers Questions Answered",
      plans: [false, false, false, false, true],
    },
    {
      name: "Out of Hours Bespoke Message System",
      plans: [false, false, false, true, true],
    },
  ],
  exclusiveOffers: [
    { name: "Free .co.uk Domain Name", plans: [true, true, true, true, true] },
    {
      name: "Free 2 Hour Meeting Room Use",
      plans: [false, true, true, true, true],
    },
  ],
};

export default function Services() {
  const [expandedSections, setExpandedSections] = useState({
    addressFeatures: true,
    callHandling: true,
    exclusiveOffers: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-gray-50/50 to-white"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          id="pricing"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-[#D40E60] text-white text-sm font-semibold rounded-full">
              Limited Company Formation Packages
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#727272] mb-4">
            Set up your company with an affordable package today.
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {pricingPackages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Best Value Badge */}
              {pkg.badge && (
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-[#FF7900] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    {pkg.badge}
                  </div>
                </div>
              )}

              {/* Card */}
              <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden border-t-4 border-[#D40E60] h-full flex flex-col">
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <h3 className="text-2xl font-bold text-[#D40E60] mb-3">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed min-h-[80px]">
                    {pkg.description}
                  </p>
                </div>

                {/* Price Section */}
                <div className="px-6 pb-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-[#D40E60]">
                      {pkg.price}
                    </span>
                    <span className="text-sm text-gray-500">{pkg.vat}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="px-6 pb-6 flex-1">
                  {pkg.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-3 mb-3 group/feature"
                    >
                      <div className="flex-shrink-0">
                        <Check className="w-5 h-5 text-[#D40E60]" />
                      </div>
                      <span className="text-sm text-gray-700 flex-1">
                        {feature.name}
                      </span>
                      {feature.hasInfo && (
                        <div className="flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-[#D40E60] flex items-center justify-center cursor-pointer hover:bg-[#B0094F] transition-colors">
                            <span className="text-white text-xs font-bold">
                              i
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* MORE INFO Button */}
                <div className="px-6 pb-4">
                  <button className="w-full text-center text-sm font-bold text-gray-700 py-2 hover:text-[#D40E60] transition-colors underline">
                    MORE INFO +
                  </button>
                </div>

                {/* Buy Button */}
                <div className="p-6 pt-0">
                  <Button className="w-full bg-gradient-to-r from-[#D30B5F] to-[#E91E63] hover:from-[#B0094F] hover:to-[#C2185B] text-white font-bold rounded-full text-base py-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                    Buy Now
                    <span className="text-xl">→</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table - Hidden for now, can be toggled */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100/50"
        >
          {/* Address Features Section */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => toggleSection("addressFeatures")}
              className="w-full grid grid-cols-[300px_repeat(5,1fr)] gap-0 p-4 bg-gradient-to-r from-gray-50/50 to-transparent hover:from-gray-50 transition-all text-left group"
            >
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChevronDown
                    className={`w-4 h-4 text-[#D30B5F] transition-transform duration-300 ${
                      expandedSections.addressFeatures ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <span className="font-bold text-[#D40E60] text-sm">
                  Address Features
                </span>
              </div>
              <div className="col-span-5"></div>
            </button>

            {expandedSections.addressFeatures &&
              features.addressFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-[300px_repeat(5,1fr)] gap-0 border-t border-gray-50 transition-colors hover:bg-gray-50/50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <div className="p-4 px-6 text-xs text-gray-700 flex items-center font-medium">
                    {feature.name}
                  </div>
                  {feature.plans.map((included, pIdx) => (
                    <div
                      key={pIdx}
                      className="border-l border-gray-100 p-4 flex items-center justify-center"
                    >
                      {included ? (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-[#D30B5F]" />
                        </div>
                      ) : (
                        <span className="text-gray-300 text-sm">—</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>

          {/* Call Handling Section */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => toggleSection("callHandling")}
              className="w-full grid grid-cols-[300px_repeat(5,1fr)] gap-0 p-4 bg-gradient-to-r from-pink-50/30 to-transparent hover:from-pink-50/50 transition-all text-left group"
            >
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChevronDown
                    className={`w-4 h-4 text-[#D30B5F] transition-transform duration-300 ${
                      expandedSections.callHandling ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <span className="font-bold text-[#D40E60] text-sm">
                  Call Handling
                </span>
              </div>
              <div className="col-span-5"></div>
            </button>

            {expandedSections.callHandling &&
              features.callHandling.map((feature, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-[300px_repeat(5,1fr)] gap-0 border-t border-gray-50 transition-colors hover:bg-gray-50/50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <div className="p-4 px-6 text-xs text-gray-700 flex items-center font-medium">
                    {feature.name}
                  </div>
                  {feature.plans.map((included, pIdx) => (
                    <div
                      key={pIdx}
                      className="border-l border-gray-100 p-4 flex items-center justify-center"
                    >
                      {included ? (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-[#D30B5F]" />
                        </div>
                      ) : (
                        <span className="text-gray-300 text-sm">—</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>

          {/* Exclusive Offers Section */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => toggleSection("exclusiveOffers")}
              className="w-full grid grid-cols-[300px_repeat(5,1fr)] gap-0 p-4 bg-gradient-to-r from-pink-50/30 to-transparent hover:from-pink-50/50 transition-all text-left group"
            >
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChevronDown
                    className={`w-4 h-4 text-[#D30B5F] transition-transform duration-300 ${
                      expandedSections.exclusiveOffers ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <span className="font-bold text-[#003366] text-sm">
                  Exclusive Capital Consultants Offers
                </span>
              </div>
              <div className="col-span-5"></div>
            </button>

            {expandedSections.exclusiveOffers &&
              features.exclusiveOffers.map((feature, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-[300px_repeat(5,1fr)] gap-0 border-t border-gray-50 transition-colors hover:bg-gray-50/50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <div className="p-4 px-6 text-xs text-gray-700 flex items-center font-medium">
                    {feature.name}
                  </div>
                  {feature.plans.map((included, pIdx) => (
                    <div
                      key={pIdx}
                      className="border-l border-gray-100 p-4 flex items-center justify-center"
                    >
                      {included ? (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-[#D30B5F]" />
                        </div>
                      ) : (
                        <span className="text-gray-300 text-sm">—</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </motion.div>

        {/* Payment Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 mb-6"
        >
          <div className="text-center mb-6">
            <span className="text-sm font-semibold text-gray-600 tracking-wide">
              Payment Options
            </span>
          </div>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            {/* Visa */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 w-20 h-14 flex items-center justify-center border border-gray-100 hover:border-[#D40E60] hover:-translate-y-0.5">
              <img
                src="/images/VISA-logo.png"
                alt="Visa"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Mastercard */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 w-20 h-14 flex items-center justify-center border border-gray-100 hover:border-[#D40E60] hover:-translate-y-0.5">
              <img
                src="/images/MASTER-logo.png"
                alt="Mastercard"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Amex */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 w-20 h-14 flex items-center justify-center border border-gray-100 hover:border-[#D40E60] hover:-translate-y-0.5">
              <img
                src="/images/AMEX-logo.png"
                alt="American Express"
                className="w-full h-full object-contain"
              />
            </div>

            {/* PayPal */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 w-20 h-14 flex items-center justify-center border border-gray-100 hover:border-[#D40E60] hover:-translate-y-0.5">
              <img
                src="/images/PAYPAL-logo.png"
                alt="PayPal"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-gray-500 mt-6 py-4"
        >
          <p className="font-medium tracking-wide">
            All prices are excluding VAT
          </p>
        </motion.div>
      </div>
    </section>
  );
}

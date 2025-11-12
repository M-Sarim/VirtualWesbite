import { Search, FileText, CreditCard, Send } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Choose name",
    description:
      "Prepare at least three potential names for the company to be registered. Search to see if any of your proposed company name is available, starting with the most preferred name. Once you find an available name, proceed to the next step.",
    icon: Search,
  },
  {
    number: 2,
    title: "Choose a company package",
    description:
      "Determine your preferred limited company structure. Your Company Formations ensures your company is incorporated as fast as possible.",
    icon: FileText,
  },
  {
    number: 3,
    title: "Checkout",
    description:
      "Review your order details and proceed to checkout. Enter your Company Formations account information, billing, and card details. After completing the payment, you will receive your login credentials and receipt.",
    icon: CreditCard,
  },
  {
    number: 4,
    title: "Submit your details",
    description:
      "Fill out your company details, including the uk registered office, directors and shareholders information, and leave us to take care of the rest. If you have any questions, please review this company formation uk checklist",
    icon: Send,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-main mb-4 sm:mb-6 px-4">
              How to Setup a Company in the UK
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D30B5F] to-[#FF1F7A] mx-auto mb-6 sm:mb-8 rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 sm:space-y-4 max-w-4xl mx-auto px-4"
          >
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Form your company online using our intuitive 5 minute application
              process. Based on the package you select, your company documents
              will be delivered immediately, either digitally or by post. Every
              package also includes support for completing the compulsory ID
              check required under Anti Money Laundering regulations.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Our customer service team is here to support you before, during,
              and after your formation. You can ask questions at any stage,
              request a document review, or get clear guidance on your next
              steps. We are committed to helping you stay compliant and
              confident as your business grows.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Most applications are processed within 3 to 4 hours, depending on
              Companies House workload. Getting started is simple. Just follow
              four quick steps below.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 w-full">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-100 hover:border-[#D30B5F] transition-all duration-300 hover:shadow-xl hover:shadow-[#D30B5F]/10 w-full"
              >
                {/* Number Badge */}
                <div className="absolute -top-3 sm:-top-4 left-4 sm:left-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#D30B5F] to-[#FF1F7A] text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="mt-6 sm:mt-8 mb-4 sm:mb-6 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon
                      className="w-8 h-8 sm:w-10 sm:h-10 text-[#D30B5F]"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-[#2D2D2D] text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center break-words">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

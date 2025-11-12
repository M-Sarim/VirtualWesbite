import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { Mail, Phone, Clock, MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<string | number | null>(null);

  const faqs = [
    {
      question:
        "I have just signed up with Capital Office, I'm unsure what address to use?",
      answer:
        "After signing up, you'll receive your official registered office address via email. This address should be used for all company registration and official correspondence.",
    },
    {
      question:
        "I haven't received the Welcome Email/ Purchase Order Confirmation?",
      answer:
        "Please check your spam/junk folder. If you still haven't received it, contact our support team and we'll resend your welcome package immediately.",
    },
    {
      question:
        "I have signed up and received the welcome information but unsure what to do next?",
      answer:
        "Follow the step-by-step guide in your welcome email. Our support team is also available to walk you through the process and answer any questions.",
    },
    {
      question:
        "I have received the Welcome Email but unable to login to Capital Office portal?",
      answer:
        "Use the credentials provided in your welcome email. If you're still having issues, use the 'Forgot Password' option or contact support for assistance.",
    },
    {
      question:
        "Now that I have purchased the service, can I start using the address?",
      answer:
        "Yes! You can start using your registered office address immediately after receiving your welcome confirmation email.",
    },
    {
      question:
        "I have selected the Free LTD company formation option when signing up, when will this be done?",
      answer:
        "Free LTD company formation is processed within 3-5 business days. You'll receive updates via email throughout the process.",
    },
  ];

  const complianceFaqs = [
    {
      question:
        "I have submitted documents via Credas, how long should I expect to wait for feedback?",
      answer:
        "Document verification typically takes 24-48 hours. You'll receive email notification once the review is complete.",
    },
    {
      question:
        "I need to submit ID but haven't received the information on how to do so?",
      answer:
        "Check your email for instructions from Credas. If not received, contact support and we'll resend the verification link.",
    },
    {
      question:
        "There's more than one Director/Shareholder with the business but I've only received one Credas invitation?",
      answer:
        "Each director/shareholder should receive individual invitations. Contact support if any are missing and we'll issue them immediately.",
    },
    {
      question:
        "I have been with Capital Office for many years but now asked to supply ID?",
      answer:
        "This is a regulatory requirement for compliance with UK Anti-Money Laundering regulations. All clients must complete this verification process.",
    },
  ];

  const postFaqs = [
    {
      question:
        "I have received an email stating post has arrived which is not included?",
      answer:
        "Some correspondence may not be covered under your current plan. Contact support to discuss options for handling additional post items.",
    },
    {
      question:
        "I have received an email regarding low funds for postage, how do I top up?",
      answer:
        "Log into your portal and navigate to the billing section where you can add funds to your postage account.",
    },
    {
      question:
        "I need my post to be sent but would like it sent to a different forwarding address as a one-off to what's listed on my account?",
      answer:
        "Contact support with your request and the alternative address. We can arrange one-time forwarding for your convenience.",
    },
    {
      question:
        "I have post which needs to be collected, when can I come to the office and do I need to make an appointment?",
      answer:
        "Office visits require an appointment. Contact support to schedule a convenient time for collection.",
    },
    {
      question:
        "My parcel is showing as delivered to the office, but I haven't received notification of arrival?",
      answer:
        "There may be a short delay in processing. If you haven't received notification within 24 hours, contact support with your tracking information.",
    },
  ];

  const renewalFaqs = [
    {
      question:
        "I have received renewal alerts via email but unsure how to renew?",
      answer:
        "Log into your portal and navigate to the renewals section, or click the link in your renewal email to process payment securely.",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[140px] sm:pt-[160px] lg:pt-[180px] bg-gray-50 w-full overflow-hidden">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white w-full">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="heading-main mb-3 sm:mb-4">Contact Us</h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
              Get in touch with our team today. Call, email or speak to us via
              our website's Live Chat service. Our customer service team is
              always happy to assist no matter how small or large your request.
            </p>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 w-full">
              {/* Left Column - FAQ */}
              <div className="space-y-6 sm:space-y-8 w-full">
                {/* Find Quick Answers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-sm w-full"
                >
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#2D2D2D]">
                    Find Quick Answers
                  </h2>
                  <div className="space-y-2 w-full">
                    {faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="border-b border-gray-200 last:border-0 w-full"
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(openFaq === idx ? null : idx)
                          }
                          className="w-full py-3 sm:py-4 flex justify-between items-start text-left hover:text-[#D30B5F] transition-colors"
                        >
                          <span className="text-xs sm:text-sm font-medium text-gray-700 pr-3 sm:pr-4 break-words flex-1">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 transition-transform ${
                              openFaq === idx ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pb-3 sm:pb-4"
                          >
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Compliance, Identification & Account Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-sm w-full"
                >
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#2D2D2D]">
                    Compliance, Identification & Account Status
                  </h2>
                  <div className="space-y-2 w-full">
                    {complianceFaqs.map((faq, idx) => (
                      <div
                        key={`compliance-${idx}`}
                        className="border-b border-gray-200 last:border-0 w-full"
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(
                              openFaq === `compliance-${idx}`
                                ? null
                                : (`compliance-${idx}` as any)
                            )
                          }
                          className="w-full py-3 sm:py-4 flex justify-between items-start text-left hover:text-[#D30B5F] transition-colors"
                        >
                          <span className="text-xs sm:text-sm font-medium text-gray-700 pr-3 sm:pr-4 break-words flex-1">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 transition-transform ${
                              openFaq === `compliance-${idx}`
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        {openFaq === `compliance-${idx}` && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="pb-3 sm:pb-4"
                          >
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Common Post & Parcel Questions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h2 className="text-xl font-bold mb-4 text-[#2D2D2D]">
                    Common Post & Parcel Questions
                  </h2>
                  <div className="space-y-2">
                    {postFaqs.map((faq, idx) => (
                      <div
                        key={`post-${idx}`}
                        className="border-b border-gray-200 last:border-0"
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(
                              openFaq === `post-${idx}`
                                ? null
                                : (`post-${idx}` as any)
                            )
                          }
                          className="w-full py-4 flex justify-between items-start text-left hover:text-[#D30B5F] transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-700 pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                              openFaq === `post-${idx}` ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openFaq === `post-${idx}` && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="pb-4"
                          >
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Renewals */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h2 className="text-xl font-bold mb-4 text-[#2D2D2D]">
                    Renewals
                  </h2>
                  <div className="space-y-2">
                    {renewalFaqs.map((faq, idx) => (
                      <div
                        key={`renewal-${idx}`}
                        className="border-b border-gray-200 last:border-0"
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(
                              openFaq === `renewal-${idx}`
                                ? null
                                : (`renewal-${idx}` as any)
                            )
                          }
                          className="w-full py-4 flex justify-between items-start text-left hover:text-[#D30B5F] transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-700 pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                              openFaq === `renewal-${idx}` ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openFaq === `renewal-${idx}` && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="pb-4"
                          >
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Contact Info & Form */}
              <div className="space-y-6">
                {/* How to contact us */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 shadow-sm"
                >
                  <h2 className="text-2xl font-bold mb-6 text-[#2D2D2D]">
                    How to contact us!
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    {/* Address */}
                    <div>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-[#D30B5F]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#2D2D2D] mb-1">
                            Address
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Capital Office, 124 City Road,
                            <br />
                            London, EC1V 2NX
                          </p>
                          <a
                            href="#"
                            className="text-[#D30B5F] text-sm font-medium hover:underline mt-1 inline-block"
                          >
                            Get Directions
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Telephone */}
                    <div>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-[#D30B5F]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#2D2D2D] mb-1">
                            Telephone
                          </h3>
                          <p className="text-sm text-gray-600">
                            +020 3820 7631
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Office Hours */}
                    <div>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-[#D30B5F]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#2D2D2D] mb-1">
                            Usual Office Hours
                          </h3>
                          <p className="text-sm text-gray-600">
                            Monday to Friday 09:00 - 17:00
                            <br />
                            Local Time is (GMT)
                          </p>
                          <p className="text-xs text-[#D30B5F] mt-1">
                            Closed UK Bank Holidays (
                            <a href="#" className="underline">
                              Dates
                            </a>
                            )
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* E-mail */}
                    <div>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-[#D30B5F]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#2D2D2D] mb-1">
                            E-mail
                          </h3>
                          <p className="text-sm text-gray-600">
                            info@capital-office.co.uk
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Good to know section */}
                  <div className="bg-white rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-[#2D2D2D] mb-3 text-sm text-[#D30B5F]">
                      Good to know
                    </h3>
                    <h4 className="font-bold text-[#2D2D2D] mb-3">
                      Key Important Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Company Number:</span>
                        <span className="font-semibold text-[#2D2D2D]">
                          06294297
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ICO Number:</span>
                        <span className="font-semibold text-[#2D2D2D]">
                          ZA084808
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">AML Number:</span>
                        <span className="font-semibold text-[#2D2D2D]">
                          XZML00000125126
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT Number:</span>
                        <span className="font-semibold text-[#2D2D2D]">
                          976201416
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-gray-600">
                          Terms & Conditions
                        </span>
                        <a
                          href="#"
                          className="text-[#D30B5F] font-medium hover:underline"
                        >
                          Click Here
                        </a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Privacy Policy</span>
                        <a
                          href="#"
                          className="text-[#D30B5F] font-medium hover:underline"
                        >
                          Click Here
                        </a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cookie Policy</span>
                        <a
                          href="#"
                          className="text-[#D30B5F] font-medium hover:underline"
                        >
                          Click Here
                        </a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Website Usage Terms
                        </span>
                        <a
                          href="#"
                          className="text-[#D30B5F] font-medium hover:underline"
                        >
                          Click Here
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Send our team a Message Now */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h2 className="text-2xl font-bold mb-2 text-[#2D2D2D]">
                    Send our team a Message Now
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Please contact Capital Office if you have any questions. You
                    will find our staff extremely friendly and helpful. If you
                    are just looking for some general advice or guidance, we do
                    not hesitate to get in touch either! We are at your service.
                  </p>
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

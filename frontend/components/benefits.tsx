import { Zap, Shield, Globe, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Zap,
    title: "Fast Company Registration",
    description:
      "Get your UK company registered in days, not weeks. Simple process, zero hassle.",
    color: "from-[#D30B8D] to-[#B0096D]",
  },
  {
    icon: Shield,
    title: "Legal Compliance",
    description:
      "Full compliance with Companies House requirements and UK business standards.",
    color: "from-[#D30B8D] to-[#B0096D]",
  },
  {
    icon: Globe,
    title: "Hassle-Free Mail Forwarding",
    description:
      "Receive and manage your business mail digitally from anywhere in the world.",
    color: "from-[#D30B8D] to-[#B0096D]",
  },
  {
    icon: Clock,
    title: "Affordable Plans",
    description:
      "Scalable pricing designed for startups and growing businesses worldwide.",
    color: "from-[#D30B8D] to-[#B0096D]",
  },
];

export default function Benefits() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#D30B8D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#D30B5F]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-[#D30B8D]/10 text-[#D30B8D] text-sm font-semibold border border-[#D30B8D]/20">
              Why Choose Us
            </span>
          </div>
          <h2 className="heading-main mb-6">Key Benefits</h2>
          <p className="text-lg sm:text-xl text-[#666] max-w-3xl mx-auto leading-relaxed">
            Everything you need to establish and manage your UK business
            presence with confidence and ease
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-8 bg-white rounded-2xl border-2 border-[#E0E0E0] hover:border-[#D30B5F] transition-all duration-300 shadow-md hover:shadow-2xl overflow-hidden">
                  {/* Gradient Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color}`}
                  />

                  {/* Icon with Gradient Background */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {/* Decorative circle */}
                    <div className="absolute -z-10 top-0 left-0 w-16 h-16 bg-[#D30B8D]/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-xl mb-3 text-[#003366] group-hover:text-[#D30B5F] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-[#D30B5F] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Decorative Corner Element */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[#D30B8D]/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Number Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#D30B5F] to-[#B0094F] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

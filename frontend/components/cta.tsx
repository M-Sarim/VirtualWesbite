import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CTA() {
  const benefits = [
    "Fast Setup in 24 Hours",
    "Expert UK Business Support",
    "Trusted by 500+ Companies",
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D2D2D] via-[#1a1a1a] to-[#2D2D2D]"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D30B5F] rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF1F7A] rounded-full blur-[120px] opacity-15"></div>

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-block">
            <div className="px-4 py-2 bg-[#D30B5F]/10 border border-[#D30B5F]/30 rounded-full">
              <span className="text-[#FF1F7A] text-sm font-semibold">
                Start Your Journey Today
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Ready to Launch Your{" "}
            <span className="bg-gradient-to-r from-[#D30B5F] to-[#FF1F7A] bg-clip-text text-transparent">
              UK Business?
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of businesses that have already established their UK
            presence with professional support and seamless setup.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-center gap-2 text-gray-200"
              >
                <CheckCircle2 className="w-5 h-5 text-[#D30B5F]" />
                <span className="text-sm sm:text-base font-medium">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
        >
          <Link to="/signup">
            <button className="group px-8 py-4 bg-gradient-to-r from-[#D30B5F] to-[#FF1F7A] text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-[#D30B5F]/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link to="/contact">
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300">
              Schedule a Call
            </button>
          </Link>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8"
        >
          <p className="text-gray-400 text-sm">
            Rated 4.9/5 by 200+ satisfied clients
          </p>
        </motion.div>
      </div>
    </section>
  );
}

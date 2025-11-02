import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Founder, Tech Startup",
    content:
      "UK Business Pro made setting up my UK company so easy. I was able to register from Canada without any hassle!",
    rating: 5,
    initial: "SJ",
  },
  {
    name: "Marcus Chen",
    role: "Freelance Consultant",
    content:
      "The virtual address service is exactly what I needed. Professional presence in the UK while working remotely.",
    rating: 5,
    initial: "MC",
  },
  {
    name: "Emma Williams",
    role: "E-commerce Owner",
    content:
      "Fast, reliable, and affordable. Their team was helpful throughout the entire process. Highly recommended!",
    rating: 5,
    initial: "EW",
  },
  {
    name: "David Martinez",
    role: "International Entrepreneur",
    content:
      "Professional service from start to finish. The team guided me through every step of the company formation process.",
    rating: 5,
    initial: "DM",
  },
  {
    name: "Lisa Thompson",
    role: "Small Business Owner",
    content:
      "Their virtual office solution gave my business instant credibility. Customer support is outstanding!",
    rating: 5,
    initial: "LT",
  },
  {
    name: "James Brown",
    role: "Digital Nomad",
    content:
      "Managing my UK business from anywhere in the world has never been easier. Truly exceptional service!",
    rating: 5,
    initial: "JB",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-main mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D30B5F] to-[#FF1F7A] mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by entrepreneurs and businesses worldwide to build their
              UK presence
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#D30B5F] transition-all duration-300 hover:shadow-xl hover:shadow-[#D30B5F]/10">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-[#D30B5F]" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#D30B5F] text-[#D30B5F]"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px] min-h-[120px]">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D30B5F] to-[#FF1F7A] flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {testimonial.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D2D2D] text-[15px]">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            Join hundreds of satisfied clients
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#D30B5F] to-[#FF1F7A] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#D30B5F]/30 transition-all duration-300"
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";

// Enhanced Hero Section
const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen relative bg-black text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gray-800 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gray-800 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto min-h-screen flex items-center px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              Powered by AI
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Transform Your <br />
              <span className="text-primary-400">Social Media</span> Strategy
            </h1>

            <p className="text-xl text-gray-300 max-w-xl">
              Unlock powerful insights with AI-driven analytics to boost your
              social media engagement and grow your audience organically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Get Started
                <ArrowRight size={20} />
              </Link>

              <Link
                to="https://youtu.be/TGx_P_ZqODM?si=xarEUl8PBNHYYbXy"
                className="inline-flex items-center justify-center gap-2 bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 border border-gray-600">
                View Demo
                <ChartBar size={20} />
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/40/40?random=${i}`}
                    alt={`User ${i + 1}`}
                    className="w-10 h-10 rounded-full border-2 border-gray-800"
                  />
                ))}
              </div>
              <div>
                <p className="text-gray-300">
                  <span className="font-bold text-primary-400">200+</span>{" "}
                  satisfied users
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl blur-2xl opacity-20 transform rotate-3"></div>
            <img
              src="https://i.ibb.co/5sZdm14/original-6b6aaeaabdf1bccf2917e75e36a8a8b8.png"
              alt="Analytics Dashboard"
              className="relative rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>

  );
};

export default Hero;

// import React from "react";
// import { motion } from "framer-motion";
// import { BarChart2, Share2, Globe, LineChart, Target, Zap } from "lucide-react";

// const Features = () => {
//   const features = [
//     {
//       icon: <BarChart2 size={24} />,
//       title: "Real-time Analytics",
//       description:
//         "Track your social media performance in real-time with comprehensive analytics and insights. Make data-driven decisions instantly.",
//     },
//     {
//       icon: <Globe size={24} />,
//       title: "Global Reach Analysis",
//       description:
//         "Understand your audience demographics and reach across different regions and platforms.",
//     },
//     {
//       icon: <LineChart size={24} />,
//       title: "Growth Tracking",
//       description:
//         "Monitor your follower growth, engagement rates, and content performance over time.",
//     },
//     {
//       icon: <Target size={24} />,
//       title: "Audience Insights",
//       description:
//         "Get detailed insights about your audience preferences, behaviors, and engagement patterns.",
//     },
//     {
//       icon: <Share2 size={24} />,
//       title: "GPT-powered Insights",
//       description:
//         "Leverage AI to generate content ideas, optimize posting times, and improve engagement.",
//     },
//     {
//       icon: <Zap size={24} />,
//       title: "Smart Automation",
//       description:
//         "Automate your social media workflow with intelligent scheduling and posting features.",
//     },
//   ];

//   return (
//     <section id="features" className="py-20 px-4 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}>
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             Powerful Features
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Everything you need to succeed on social media, powered by
//             cutting-edge AI technology
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-white p-8 rounded-xl border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-300">
//               <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;


import React from "react";
import { motion } from "framer-motion";
import { BarChart2, Share2, Globe, LineChart, Target, Zap } from "lucide-react";

const Highlights = () => {
  const highlights = [
    {
      icon: <BarChart2 size={24} />,
      title: "Comprehensive Analytics",
      description:
        "Analyze your digital footprint with real-time metrics and actionable insights to enhance performance.",
    },
    {
      icon: <Globe size={24} />,
      title: "Global Audience Insights",
      description:
        "Discover detailed demographics and engagement stats for your global audience across multiple platforms.",
    },
    {
      icon: <LineChart size={24} />,
      title: "Performance Metrics",
      description:
        "Track trends and key performance indicators to measure your growth and optimize strategies.",
    },
    {
      icon: <Target size={24} />,
      title: "User Behavior Analysis",
      description:
        "Dive deep into user preferences and engagement behaviors to tailor your content effectively.",
    },
    {
      icon: <Share2 size={24} />,
      title: "AI-Driven Optimization",
      description:
        "Harness AI tools to refine content strategies, schedule posts, and boost interaction rates.",
    },
    {
      icon: <Zap size={24} />,
      title: "Effortless Automation",
      description:
        "Streamline your workflow with automated scheduling, content posting, and performance tracking.",
    },
  ];

  return (
    <section id="highlights" className="py-20 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-white mb-4">
            Exceptional Highlights
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Empower your digital presence with our innovative and intuitive features.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                {highlight.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default Highlights;

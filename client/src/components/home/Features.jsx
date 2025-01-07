import { BarChart2, Share2, Globe, LineChart, Target, Zap } from "lucide-react";
import FeatureCard from '../ui/FeatureCard';

const Features = () => {
  const features = [
    {
      title: 'Social Media Performance Analysis',
      description: 'Track likes, comments, shares, and post types to uncover what drives engagement and optimize your social media strategy',
    },
    {
      title: 'Seamless Data & Workflow Integration',
      description: 'Built on DataStax Astra DB and Langflow, our platform efficiently stores engagement data and automates workflows to deliver accurate metrics for reels, carousels, and static posts',
    },
    {
      title: 'Visual Analytics Made Simple',
      description: 'Interactive charts and graphs make it easy to compare engagement metrics, track trends, and identify top-performing content',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-black text-white">
      <div>
        <div className="w-full mb-7 text-center text-white font-extrabold text-5xl 2xl:text-6xl">Why Choose Us</div>
        <div className="w-[75%] mx-auto mb-16 text-center text-xl text-gray-300">Supercharge your social media performance with data-backed insights and AI-powered analysis, designed to help you grow and engage your audience more effectively</div>
        <div className="w-full h-30vh flex items-center justify-evenly">
          {
            features.map((item) => (
              <FeatureCard key={item} title={item.title} description={item.description} />
            ))
          }
        </div>
      </div>
    </section>

  );
};

export default Features;

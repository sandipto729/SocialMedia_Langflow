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
    <section id="highlights" className="py-20 px-4 bg-black text-white">
      <div>
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

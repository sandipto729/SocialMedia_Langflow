import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, GraduationCap } from "lucide-react";

const TeamSection = () => {
  const team = [
    {
      name: "Chahat Kesharwani",
      role: "Designer & Developer",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQGYfizBcQGVXA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698137364469?e=1741219200&v=beta&t=R7fzAqHEFVmY0NXMemIuDu7LgzD5RFz3BP3rUcy1mS0",
      graduationYear: "2027",
      college: "NIT Jalandhar",
      linkedin: "https://linkedin.com/in/chahatkesharwani/",
      github: "https://github.com/chahatkesh",
    },
    {
      name: "Davinder Singh",
      role: "Fullstack Developer",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQFQ0sZTcyVDMg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726599571777?e=1741219200&v=beta&t=r-OCtXZFVt4Iars1N_D5_iH53FjUnZpLkp1wDbwQUs0",
      graduationYear: "2027",
      college: "NIT Jalandhar",
      linkedin: "https://www.linkedin.com/in/davinder-singh-913541302/",
      github: "https://github.com/Davinder1436",
    },
    {
      name: "Rishi Ahuja",
      role: "Langflow Developer",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQG87n2sers9aA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725363814807?e=1741219200&v=beta&t=3SBlI7ohn1NqqsZLGnAyFcBNDFNP5SwryZUSFENsJS8",
      graduationYear: "2028",
      college: "NIT Jalandhar",
      linkedin: "https://www.linkedin.com/in/rishi-ahuja-b1a224310/",
      github: "https://github.com/rishiahuja",
    },
    {
      name: "Vatsal Khanna",
      role: "ML Developer",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQGBwIJdp-bJeQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728579143693?e=1741219200&v=beta&t=L0B61qKKRKdE0QuTzfnsxGG81y3LLmqpW0eM2L43nFM",
      graduationYear: "2027",
      college: "NIT Jalandhar",
      linkedin: "https://www.linkedin.com/in/vatsalkhanna/",
      github: "https://github.com/VatsalKhanna5",
    },
  ];

  return (
    <section
      id="team"
      className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The brilliant minds behind SocialAnalytics, bringing together
            expertise in development, data science, and design
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group">
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto object-cover ring-4 ring-primary-100 group-hover:ring-primary-200 transition-all duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-primary-600 font-medium mb-3">{member.role}</p>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                <GraduationCap size={18} className="text-primary-500" />
                <span className="text-sm">
                  {member.college} ({member.graduationYear})
                </span>
              </div>
              <div className="flex justify-center gap-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors duration-300">
                  <Github size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

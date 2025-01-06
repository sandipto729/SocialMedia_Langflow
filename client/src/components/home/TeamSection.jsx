import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, GraduationCap } from "lucide-react";

const TeamSection = () => {
  const team = [
    {
      name: "Abir Roy",
      role: "Fullstack and Blockchain Developer",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQGIDDxeS4AwTA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715072661288?e=1741824000&v=beta&t=g7tgF58cjeFM_P5k1iYbvS2ELxbCbf0q-ac0o2q3zy4",
      graduationYear: "2027",
      college: "NIT Durgapur",
      linkedin: "https://www.linkedin.com/in/abir-roy-21b3052aa/",
      github: "https://github.com/roy-abir05",
    },
    {
      name: "Sandipto Roy",
      role: "Fullstack and WEB3 Developer",
      image:
        "https://res.cloudinary.com/dodpgohuc/image/upload/v1730047709/cerxkkbkdfqygshhdfpo.jpg",
      graduationYear: "2027",
      college: "NIT Durgapur",
      linkedin: "https://www.linkedin.com/in/sandipto-roy-675600277/",
      github: "https://github.com/sandipto729",
    },
    {
      name: "Ankit Roy",
      role: "Fullstack and AI Developer",
      image:
        "https://media.licdn.com/dms/image/v2/D5635AQETRForTT4kog/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1720361252276?e=1736794800&v=beta&t=pQ65bhFiYbLiXNmEK7w8007x2ER6bi3eBo9wyEg5d_Q",
      graduationYear: "2027",
      college: "NIT Durgapur",
      linkedin: "https://www.linkedin.com/in/ankit-roy-04349421a/",
      github: "https://github.com",
    }
  ];

  return (
    <section
      id="team"
      className="py-20 px-4 bg-black text-white m-[auto]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Team from NIT Durgapur
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group">
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto object-cover ring-4 ring-gray-600 group-hover:ring-primary-400 transition-all duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {member.name}
              </h3>
              <p className="text-primary-400 font-medium mb-3">{member.role}</p>
              <div className="flex items-center justify-center gap-2 text-gray-300 mb-4">
                <GraduationCap size={18} className="text-primary-400" />
                <span className="text-sm">
                  {member.college} ({member.graduationYear})
                </span>
              </div>
              <div className="flex justify-center gap-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-300 hover:text-primary-400 hover:bg-gray-700 rounded-full transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-300 hover:text-primary-400 hover:bg-gray-700 rounded-full transition-colors duration-300">
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

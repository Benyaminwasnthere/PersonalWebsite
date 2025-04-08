import { motion } from "framer-motion";
import { FaBriefcase, FaExternalLinkAlt } from "react-icons/fa";

const ExperienceSection = ({ isDarkMode }) => {
  const experiences = [
    {
      id: 1,
      role: "Data Engineer Research",
      company: "Clearcut Software LLC",
      location: "Paramus, NJ",
      period: "Mar 2024 – Aug 2024",
      description: "Researched the DuckDB database and developed, built, and deployed functions for clients",
      achievements: [
        " Crafted tailored aggregation functions in C++ for DuckDB, aligning precisely with client specifications & conducting thorough unit tests to ensure robustness while significantly enhancing resource efficiency",
        " Streamlined SQL query creation by developing Python scripts, resulting in a substantial increase in team productivity & efficiency, leveraging NumPy & Pandas for seamless integration",
        " Utilized advanced programming techniques to enhance performance & ensure smooth integration with existing data analytics pipelines, facilitating clients in efficiently extracting actionable insights from vast datasets ",
        "Resolved technical challenges by debugging and troubleshooting issues using GitHub tickets, ensuring smooth project development and deployment"
      ],
      skills: ["C++", "Python", "SQL", "DuckDB", "NumPy", "Pandas"],
    }
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const timelineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-3xl font-bold mb-8 flex items-center gap-3"
      >
        <FaBriefcase className="text-blue-500" />
        Work Experience
      </motion.h2>

      <div className="relative">
        {/* Timeline */}
        <motion.div
          variants={timelineVariants}
          className={`absolute left-6 top-0 w-1 ${
            isDarkMode ? "bg-gray-600" : "bg-gray-200"
          }`}
          style={{ originY: 0 }}
        />

        <div className="space-y-10 pl-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-10 top-1 w-4 h-4 rounded-full border-4 ${
                isDarkMode 
                  ? "bg-gray-800 border-blue-400" 
                  : "bg-white border-blue-500"
              }`}></div>

              <div className={`p-6 rounded-xl border transition-all ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:border-blue-500"
                  : "bg-white border-gray-200 hover:border-blue-400"
              }`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{exp.company}</p>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1 rounded-full ${
                            isDarkMode
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-500"
                          }`}
                          aria-label="Company website"
                        >
                          <FaExternalLinkAlt className="text-sm" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {exp.period}
                  </div>
                </div>

                <p className={`mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {exp.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-2 ${
                          isDarkMode ? "bg-blue-400" : "bg-blue-500"
                        }`}></span>
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs ${
                        isDarkMode
                          ? "bg-gray-700 text-blue-400"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
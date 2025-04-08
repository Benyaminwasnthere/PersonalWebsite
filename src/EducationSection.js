import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import RutgersLogo from "./Rutgers-logo.png";
import NJITLogo from "./Njit-logo.png";

const EducationSection = ({ isDarkMode }) => {
  const educationData = [
    {
      id: 1,
      degree: "Master of Science in Artificial Intelligence",
      institution: "NJIT Ying Wu College of Computing",
      location: "Newark, NJ",
      period: "Dec 2024 – Jan 2027",
      coursework: ["Data Mining"],
      logo: NJITLogo,
      logoAlt: "NJIT Logo",
      logoClass: "h-12 w-auto" // Consistent size for NJIT logo
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Science",
      institution: "Rutgers University",
      location: "New Brunswick, NJ",
      period: "Sept 2020 – May 2024",
      coursework: [
        "Artificial Intelligence",
        "Machine Learning Principles",
        "Brain Inspired Computing",
        "Computational Robotics",
        "Operating Systems",
        "Software Methodology",
        "Data Management",
        "Systems Programming",
        "Data Structures",
        "Algorithms Design & Analysis"
      ],
      logo: RutgersLogo,
      logoAlt: "Rutgers Logo",
      logoClass: "h-10 w-auto" // Consistent size for Rutgers logo
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
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
        className="text-3xl font-bold mb-6 flex items-center gap-3"
      >
        <FaGraduationCap className="text-blue-500" />
        Education
      </motion.h2>

      {educationData.map((edu) => (
        <motion.div
          key={edu.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
            isDarkMode 
              ? "bg-gray-800 border border-gray-700 hover:border-blue-500" 
              : "bg-white border border-gray-200 hover:border-blue-400"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo Container - Removed dark mode filter */}
            <div className="flex-shrink-0 flex items-center justify-center p-2">
              <img 
                src={edu.logo} 
                alt={edu.logoAlt} 
                className={edu.logoClass} // Removed the dark mode filter
              />
            </div>
            
            {/* Content Container */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {edu.period}
                </p>
              </div>
              
              <div className="mb-4">
                <p className="font-semibold">{edu.institution}</p>
                <p className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  {edu.location}
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, index) => (
                    <motion.span 
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode 
                          ? "bg-gray-700 text-blue-400" 
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EducationSection;
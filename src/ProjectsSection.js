import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";

const ProjectsSection = ({ isDarkMode }) => {
  const projects = [
    {
      id: 1,
      title: "Tetris Confetti",
      description: "Creative Tetris game with confetti effects and sand physics",
      technologies: ["JavaScript", "React", "Firebase","p5.js"],
      githubUrl: "https://github.com/Benyaminwasnthere/Confetti-Tetris",
      liveDemoUrl: "https://confetti-3b50f.web.app/game",
      features: [
        "Real-time score tracking with Firebase",
        "Custom BFS algorithm for chain detection",
        "Responsive design for all devices"
      ]
    },
    {
      id: 2,
      title: "Dementia Detection AI",
      description: "AI-powered dementia detection through text analysis",
      technologies: ["Python", "XGBoost", "React Native", "FastAPI","Scikit-learn"],
      githubUrl: "https://github.com/OX-S/early-trace",
      liveDemoUrl: null, // No live demo for this project
      features: [
        "Achieved 0.95 F1-score with XGBoost",
        "Processed 1.4M tokens of text data",
        "Built with BGE-large-en-v1.5 transformer"
      ],
      award: "2nd Place - Social Good Category (HackRU 2025)"
    },
    {
        id: 3,
        title: "JavaFX Photo Gallery App",
        description: "A full-featured desktop photo management app built with JavaFX and Scene Builder.",
        technologies: ["Java", "JavaFX", "FXML", "Scene Builder"],
        githubUrl: "https://github.com/Benyaminwasnthere/android-photo-gallery",
        liveDemoUrl: null,
        features: [
          "Secure login and single-user account system",
          "Album creation, photo tagging, and advanced search",
          "Admin panel for user creation, deletion, and listing",
          "Data persistence through Java object serialization"
        ]
      },
      {
        id: 4,
        title: "Tic-Tac-Toe ( Multi-Player / Multi-Session )",
        description: "A multithreaded Tic-Tac-Toe game server with support for multiple concurrent game sessions.",
        technologies: ["C", "Multithreading", "Sockets"],
        githubUrl: "https://github.com/Benyaminwasnthere/TIKTACTOE",
        liveDemoUrl: null, // No live demo for this project
        features: [
          "Multithreading support for concurrent games",
          "Multiple game sessions for users to join and play",
          "Tic-Tac-Toe basic rule set"
        ],
        testPlan: "Tested using multiple terminal instances for concurrent gameplay testing."
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
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
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
        <FaCode className="text-blue-500" />
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover="hover"
            className={`rounded-xl overflow-hidden border transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        isDarkMode
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      aria-label="GitHub Repository"
                    >
                      <FaGithub />
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full ${
                        isDarkMode
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                      aria-label="Live Demo"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>

              <p className={`mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {project.description}
              </p>

              {project.award && (
                <div className={`mb-4 px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {project.award}
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-medium mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mt-2 mr-2 ${
                        isDarkMode ? "bg-blue-400" : "bg-blue-500"
                      }`}></span>
                      <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 rounded-full text-xs ${
                      isDarkMode
                        ? "bg-gray-700 text-blue-400"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Headshot from "./Lumatic_Headshot.jpg";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import EducationSection from "./EducationSection.js";
import ProjectsSection from "./ProjectsSection.js";
import ExperienceSection from "./ExperienceSection";
import ContactSection from "./ContactSection";
import PhotographySection from "./PhotographySection.js";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import ResumePDF from "./Benyamin_Plaksienko_Website_Resume.pdf";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const contentRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Vanta.js effect initialization
  useEffect(() => {
    let effect;
    let timeoutId;

    const initVanta = () => {
      if (!vantaEffect && vantaRef.current) {
        effect = NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3a0ca3,
          backgroundColor: 0xf3f4f6,
          points: 10,
          maxDistance: 20,
          spacing: 16,
        });
        setVantaEffect(effect);
      }
    };

    timeoutId = setTimeout(initVanta, 100);

    return () => {
      clearTimeout(timeoutId);
      if (effect && effect.destroy) {
        effect.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only on mount

  // Update Vanta effect when dark mode changes
  useEffect(() => {
    if (vantaEffect && typeof vantaEffect.setOptions === "function") {
      try {
        vantaEffect.setOptions({
          color: isDarkMode ? 0x3a86ff : 0x3a0ca3,
          backgroundColor: isDarkMode ? 0x111827 : 0xf3f4f6,
          points: isDarkMode ? 12 : 10,
          maxDistance: isDarkMode ? 22 : 20,
          spacing: isDarkMode ? 18 : 16,
        });
      } catch (error) {
        console.error("Failed to update Vanta effect:", error);
        if (vantaEffect.destroy) {
          vantaEffect.destroy();
        }
        const newEffect = NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: isDarkMode ? 0x3a86ff : 0x3a0ca3,
          backgroundColor: isDarkMode ? 0x111827 : 0xf3f4f6,
          points: isDarkMode ? 12 : 10,
          maxDistance: isDarkMode ? 22 : 20,
          spacing: isDarkMode ? 18 : 16,
        });
        setVantaEffect(newEffect);
      }
    }
  }, [isDarkMode, vantaEffect]);

  const navItems = useMemo(() => [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Work Experience" },
    { id: "photography", label: "Photography" },
    { id: "contact", label: "Contact" },
  ], []);

  const navigateSections = useCallback((direction) => {
    const currentIndex = navItems.findIndex((item) => item.id === activeSection);
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < navItems.length) {
      setActiveSection(navItems[nextIndex].id);
    }
  }, [activeSection, navItems]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsSwiping(false);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const xDiff = touchStartX.current - touchEndX;
    const yDiff = touchStartY.current - touchEndY;

    if (Math.abs(xDiff) > Math.abs(yDiff) * 1.5) {
      setIsSwiping(true);
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (!touchStartX.current || !touchStartY.current) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const xDiff = touchStartX.current - touchEndX;
      const yDiff = touchStartY.current - touchEndY;

      const minSwipeDistance = 50;
      const horizontalRatio = Math.abs(xDiff) / Math.abs(yDiff);

      if (horizontalRatio > 1.5 && Math.abs(xDiff) > minSwipeDistance && isSwiping) {
        if (xDiff > 0) {
          navigateSections(1);
        } else {
          navigateSections(-1);
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
      setIsSwiping(false);
    },
    [isSwiping, navigateSections]
  );

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("touchstart", handleTouchStart, { passive: false });
      contentElement.addEventListener("touchmove", handleTouchMove, { passive: false });
      contentElement.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("touchstart", handleTouchStart);
        contentElement.removeEventListener("touchmove", handleTouchMove);
        contentElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = ResumePDF;
    link.setAttribute("download", "Benyamin_Plaksienko_Website_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sectionContent = {
    about: (
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
          <img
            src={Headshot}
            alt="Benyamin Plaksienko"
            className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="mb-4">
            Hey! I’m Benyamin Plaksienko, a developer from Fair Lawn, NJ. I’ve always loved building things and solving problems with code. I also played hockey my whole life, including D3 at Rutgers, which taught me a lot about teamwork and perseverance.
          </p>
          <p className="mb-6">
            I enjoy creating websites that are easy to use and look good. I'm always learning and love turning ideas into something real.
          </p>
          <motion.button
            onClick={downloadResume}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all shadow-md ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <FaDownload className="text-lg" />
            Download My Resume
          </motion.button>
        </div>
      </div>
    ),
    projects: <ProjectsSection isDarkMode={isDarkMode} />,
    education: <EducationSection isDarkMode={isDarkMode} />,
    experience: <ExperienceSection isDarkMode={isDarkMode} />,
    photography: <PhotographySection isDarkMode={isDarkMode} />,
    contact: <ContactSection isDarkMode={isDarkMode} />,
  };

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        color: isDarkMode ? "white" : "rgb(17, 24, 39)",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 shadow-md ${
          isDarkMode ? "bg-gray-800/80 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold">Benyamin Plaksienko</h1>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      isDarkMode
                        ? activeSection === item.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700 text-gray-300"
                        : activeSection === item.id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full focus:outline-none hover:bg-opacity-20 hover:bg-gray-500"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="md:hidden mt-4 overflow-x-auto">
            <div className="flex gap-2 w-max">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isDarkMode
                      ? activeSection === item.id
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-700 text-gray-300"
                      : activeSection === item.id
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main ref={contentRef} className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full z-10">
        <div
          className={`p-6 rounded-lg shadow-md ${
            isDarkMode ? "bg-gray-800/80 border-gray-700 backdrop-blur-sm" : "bg-white/80 border-gray-200 backdrop-blur-sm"
          } border`}
        >
          {sectionContent[activeSection]}
        </div>
        <div className="md:hidden flex justify-center items-center mt-4 text-xs text-gray-500 gap-4">
          <span className="opacity-50">← Swipe →</span>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`w-full text-sm ${
          isDarkMode ? "bg-gray-800/80 text-white backdrop-blur-sm" : "bg-gray-900/80 text-white backdrop-blur-sm"
        } z-10`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <address className="flex flex-col gap-2 not-italic text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Fair Lawn, NJ, USA</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:benplaksienko@hotmail.com" className="hover:underline">
                  benplaksienko@hotmail.com
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+13472797732" className="hover:underline">
                  +1 (347) 279-7732
                </a>
              </div>
            </address>
            <div className="flex gap-4">
              <a
                href="https://github.com/Benyaminwasnthere"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ben-plaksienko/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Benyamin Plaksienko. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
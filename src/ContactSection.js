import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const ContactSection = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'service_1w6ufyl',
      'template_ntgirwj',
      formRef.current,
      'VOHAApMIEYaIWg2QZ'
    )
    .then((result) => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    });
  };

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
        className="text-3xl font-bold mb-8 flex items-center gap-3"
      >
        <FaPaperPlane className="text-blue-500" />
        Contact Me
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-xl border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">Send me a message</h3>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="name" 
                className={`block mb-1 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className={`block mb-1 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label 
                htmlFor="message" 
                className={`block mb-1 text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              ></textarea>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-500 text-sm">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>
              )}
            </div>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-xl border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"
              }`}>
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <a 
                  href="mailto:benplaksienko@hotmail.com" 
                  className={`hover:underline ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  benplaksienko@hotmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"
              }`}>
                <FaPhone className="text-xl" />
              </div>
              <div>
                <h4 className="font-medium">Phone</h4>
                <a 
                  href="tel:+13472797732" 
                  className={`hover:underline ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  +1 (347) 279-7732
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${
                isDarkMode ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"
              }`}>
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Fair Lawn, NJ, USA
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-medium mb-3">Connect with me</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/Benyaminwasnthere"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/ben-plaksienko/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactSection;
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCamera, FaHeart, FaRegHeart, FaExpand } from "react-icons/fa";

// Import local images
import photo1 from "./1.jpg";
import photo2 from "./2.jpg";
import photo3 from "./3.jpg";
import photo4 from "./4.jpg";
import photo5 from "./5.jpg";
import photo6 from "./6.jpg";

const PhotographySection = ({ isDarkMode }) => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      src: photo1,
      title: "Paterson Falls Star Trail",
      liked: false
    },
    {
      id: 2,
      src: photo2,
      title: "Sleepy Hollow Star Trail",
      liked: false
    },
    {
      id: 3,
      src: photo3,
      title: "Statue Of Liberty / Empire State Building",
      liked: true
    },
    {
      id: 4,
      src: photo4,
      title: "Rome",
      liked: false
    },
    {
      id: 5,
      src: photo5,
      title: "Amalfi",
      liked: false
    },
    {
      id: 6,
      src: photo6,
      title: "Vessel / Empire State Building",
      liked: false
    }
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const toggleLike = (id) => {
    setPhotos(prevPhotos => 
      prevPhotos.map(photo => 
        photo.id === id ? { ...photo, liked: !photo.liked } : photo
      )
    );
    
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto(prev => ({ ...prev, liked: !prev.liked }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      className="space-y-8 p-4"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-3xl font-bold mb-8 flex items-center gap-3"
      >
        <FaCamera className="text-blue-500" />
        Photography
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            className={`relative group rounded-xl overflow-hidden shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x600?text=Photo+Not+Available";
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg">{photo.title}</h3>
              
              <div className="flex justify-between items-center mt-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(photo.id);
                  }}
                  className="text-white hover:text-red-500 transition-colors"
                  aria-label={photo.liked ? "Unlike" : "Like"}
                >
                  {photo.liked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(photo);
                  }}
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label="Expand"
                >
                  <FaExpand />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Expanded View */}
      {selectedPhoto && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top controls bar */}
            <div className={`flex justify-between items-center mb-4 p-3 rounded-t-lg ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            }`}>
              <h3 className="text-xl font-bold truncate max-w-[80%]">
                {selectedPhoto.title}
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(selectedPhoto.id);
                  }}
                  className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${
                    selectedPhoto.liked 
                      ? "bg-red-500 text-white" 
                      : isDarkMode 
                        ? "bg-gray-700 hover:bg-gray-600 text-white" 
                        : "bg-white hover:bg-gray-200 text-gray-800"
                  }`}
                  aria-label={selectedPhoto.liked ? "Unlike" : "Like"}
                >
                  {selectedPhoto.liked ? <FaHeart /> : <FaRegHeart />}
                  <span className="hidden sm:inline">
                    {selectedPhoto.liked ? "Liked" : "Like"}
                  </span>
                </button>
                
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${
                    isDarkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-white" 
                      : "bg-white hover:bg-gray-200 text-gray-800"
                  } font-bold`}
                  aria-label="Close"
                >
                  ✕
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </div>
            
            {/* Image container with subtle frame */}
            <div className={`flex-1 overflow-hidden rounded-lg border ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-full max-h-[70vh] object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/1200x800?text=Photo+Not+Available";
                }}
              />
            </div>
            
            {/* Bottom info panel */}
            
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PhotographySection;
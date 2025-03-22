
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Welcome = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Preload other pages' assets
    const imagePreload = new Image();
    imagePreload.src = '/lovable-uploads/5f234f74-cac9-459f-b0c3-5e86a8e99001.png';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        delay: 0.6
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl font-bold mb-2 text-left"
          variants={itemVariants}
        >
          Welcome to PopX
        </motion.h1>
        
        <motion.p 
          className="text-gray-500 text-left mb-8"
          variants={itemVariants}
        >
          A powerful platform for modern businesses to manage and grow their online presence.
        </motion.p>
        
        <motion.div 
          className="space-y-3"
          variants={itemVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/register" className="btn-primary block text-center">
              Create Account
            </Link>
          </motion.div>
          
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/login" className="btn-secondary block text-center">
              Already Registered? Login
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;

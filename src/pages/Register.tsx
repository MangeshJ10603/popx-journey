
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? name === 'isAgency' ? checked : !checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['fullName', 'phoneNumber', 'email', 'password'];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`${field.replace(/([A-Z])/g, ' $1').trim()} is required`);
        return;
      }
    }
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(formData);
      // Navigation is handled in the register function
    } catch (error) {
      // Error is handled in the register function
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 py-10">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl font-bold mb-2 text-left"
          variants={itemVariants}
        >
          Create your PopX account
        </motion.h1>
        
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-4 mt-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-popx-purple mb-1" htmlFor="fullName">
              Full Name*
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              className="input-field"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-popx-purple mb-1" htmlFor="phoneNumber">
              Phone number*
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              className="input-field"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-popx-purple mb-1" htmlFor="email">
              Email address*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-popx-purple mb-1" htmlFor="password">
              Password*
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-popx-purple mb-1" htmlFor="companyName">
              Company name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Enter your company name"
              className="input-field"
              value={formData.companyName}
              onChange={handleChange}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-6">
            <p className="text-sm font-medium text-popx-purple mb-3">Are you an Agency?*</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  id="agency-yes"
                  name="isAgency"
                  type="radio"
                  className="h-5 w-5 text-popx-purple"
                  checked={formData.isAgency}
                  onChange={() => setFormData({...formData, isAgency: true})}
                />
                <label htmlFor="agency-yes" className="ml-2 text-gray-700">
                  Yes
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="agency-no"
                  name="isAgency"
                  type="radio"
                  className="h-5 w-5 text-popx-purple"
                  checked={!formData.isAgency}
                  onChange={() => setFormData({...formData, isAgency: false})}
                />
                <label htmlFor="agency-no" className="ml-2 text-gray-700">
                  No
                </label>
              </div>
            </div>
          </motion.div>
          
          <motion.button
            type="submit"
            className="btn-primary mt-8 flex justify-center items-center"
            disabled={isLoading}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            ) : 'Create Account'}
          </motion.button>
          
          <motion.div
            className="text-center pt-4"
            variants={itemVariants}
          >
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-popx-purple hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;

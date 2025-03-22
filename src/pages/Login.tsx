
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      // Navigation is handled in the login function
    } catch (error) {
      // Error handling is done in the login function
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
        staggerChildren: 0.1,
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
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
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
          Sign in to your PopX account
        </motion.h1>
        
        <motion.p 
          className="text-gray-500 text-left mb-8"
          variants={itemVariants}
        >
          Welcome back! Please enter your credentials to access your account.
        </motion.p>
        
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-5"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-popx-purple mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-popx-purple mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>
          
          <motion.button
            type="submit"
            className="btn-primary flex justify-center items-center"
            disabled={isLoading}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            ) : 'Login'}
          </motion.button>
          
          <motion.div
            className="text-center pt-4"
            variants={itemVariants}
          >
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-popx-purple hover:underline">
                Create one
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;

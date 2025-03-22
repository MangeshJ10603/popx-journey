
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";

const Profile = () => {
  const { user, updateProfile, updateProfileImage, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    companyName: user?.companyName || '',
    bio: user?.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquam erat.'
  });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload this to a server
    // For this demo, we'll use a FileReader to get a data URL
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await updateProfileImage(reader.result as string);
        toast.success("Profile image updated!");
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsDataURL(file);
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-medium">Account Settings</h1>
        </div>
      </div>
      
      <motion.div
        className="max-w-md mx-auto px-4 py-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
          variants={itemVariants}
        >
          <div className="flex items-start">
            <div className="relative mr-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                {user?.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.fullName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {user?.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 bg-popx-purple text-white rounded-full p-1 shadow-md hover:bg-popx-dark transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            
            <div>
              <h2 className="text-lg font-semibold">{user?.fullName}</h2>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-700 text-sm">
              {user?.bio || formData.bio}
            </p>
          </div>
        </motion.div>
        
        {isEditing ? (
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm p-6"
            variants={itemVariants}
          >
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="input-field"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className="input-field"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  className="input-field"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="input-field"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                type="submit"
                className="btn-primary w-auto px-6 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                ) : 'Save Changes'}
              </button>
              
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Account Details</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="text-popx-purple hover:text-popx-dark focus:outline-none transition-colors"
              >
                Edit
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1">{user?.fullName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{user?.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                <p className="mt-1">{user?.phoneNumber}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company</h3>
                <p className="mt-1">{user?.companyName || 'Not specified'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                <p className="mt-1">{user?.isAgency ? 'Agency' : 'Individual'}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-100">
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;

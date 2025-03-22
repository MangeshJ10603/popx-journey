
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  isAgency: boolean;
  profileImage?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updateProfileImage: (imageUrl: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('popx_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll check if the user exists in localStorage
      const storedUsers = localStorage.getItem('popx_users');
      if (!storedUsers) {
        throw new Error('No user found with these credentials');
      }

      const users = JSON.parse(storedUsers) as Array<User & { password: string }>;
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('popx_user', JSON.stringify(userWithoutPassword));
      
      toast.success("Login successful!");
      navigate('/profile');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to login");
      throw error;
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<void> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll store the user in localStorage
      
      // Generate a unique ID
      const id = Math.random().toString(36).substring(2, 15);
      
      const newUser = {
        id,
        ...userData
      };
      
      // Check if users array exists in localStorage
      const storedUsers = localStorage.getItem('popx_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if email already exists
      if (users.some((u: User) => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      // Add new user to array and save
      users.push(newUser);
      localStorage.setItem('popx_users', JSON.stringify(users));
      
      // Log user in
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('popx_user', JSON.stringify(userWithoutPassword));
      
      toast.success("Account created successfully!");
      navigate('/profile');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to register");
      throw error;
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('popx_user');
    toast.success("Logged out successfully!");
    navigate('/');
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      if (!user) throw new Error('Not authenticated');
      
      // Update user in context
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // Update user in localStorage
      localStorage.setItem('popx_user', JSON.stringify(updatedUser));
      
      // Update user in users array
      const storedUsers = localStorage.getItem('popx_users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const updatedUsers = users.map((u: User) => 
          u.id === user.id ? { ...u, ...data } : u
        );
        localStorage.setItem('popx_users', JSON.stringify(updatedUsers));
      }
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
      throw error;
    }
  };

  const updateProfileImage = async (imageUrl: string): Promise<void> => {
    try {
      await updateProfile({ profileImage: imageUrl });
    } catch (error) {
      toast.error("Failed to update profile image");
      throw error;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        register, 
        logout, 
        updateProfile,
        updateProfileImage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

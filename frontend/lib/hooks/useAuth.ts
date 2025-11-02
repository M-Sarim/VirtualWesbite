import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface User {
  email: string;
  name?: string;
}

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          setIsAuthenticated(true);
          setUser({ email: credentials.email });
          navigate("/dashboard");
          resolve({ success: true });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const register = async (data: RegisterData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email && data.password && data.name) {
          setIsAuthenticated(true);
          setUser({ email: data.email, name: data.name });
          navigate("/dashboard");
          resolve({ success: true });
        } else {
          reject(new Error("Registration failed"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
}

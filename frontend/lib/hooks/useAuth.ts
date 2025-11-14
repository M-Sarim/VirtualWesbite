import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
  role?: "admin" | "user";
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface User {
  email: string;
  name?: string;
  role: "admin" | "user";
}

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("user");
  });

  const login = async (credentials: LoginCredentials) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          // For demo: if email is admin@site.com, role is admin, else user
          const role =
            credentials.email === "admin@site.com" ? "admin" : "user";
          const userObj: User = { email: credentials.email, role };
          setIsAuthenticated(true);
          setUser(userObj);
          localStorage.setItem("user", JSON.stringify(userObj));
          // Check personalization completion
          const personalizationComplete =
            localStorage.getItem("personalizationComplete") === "true";
          if (personalizationComplete) {
            navigate("/dashboard");
          } else {
            navigate("/personalize");
          }
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
        if (data.email && data.password && data.name && data.role) {
          const userObj: User = {
            email: data.email,
            name: data.name,
            role: data.role,
          };
          setIsAuthenticated(true);
          setUser(userObj);
          localStorage.setItem("user", JSON.stringify(userObj));
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
    localStorage.removeItem("user");
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

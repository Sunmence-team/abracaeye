import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import api, { setupInterceptors } from "../helpers/api";

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface userProviderProps {
  children: React.ReactNode;
}

interface userProps {
  id: string;
  name: string;
  email: string;
  role: string;
  vendor: boolean;
  blog: boolean;
}

interface UserContextType {
  user: userProps | null;
  token: string | null;
  role: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<userProps | null>>;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
//   login: (token: string, user: userProps) => void;
  logout: () => void;
  isLoggedIn: boolean;
  refreshUser: (token: string) => Promise<void>;
  loading:boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: userProviderProps) => {
  const [user, setUser] = useState<userProps | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(storedToken);
      setUser(parsedUser);
      setRole(parsedUser?.role || null);
    }

    setLoading(false);
  }, []);

//   const login = (token: string, user: userProps) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setToken(token);
//     setUser(user);
//     setRole(user?.role || null);
//   };

  const isLoggedIn = Boolean(token);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("user");
    setUser(null);

    toast.success("Logged out successfully");
    setTimeout(() => {
      // window.location.href = "https://abracaeye.com";
    }, 1000);
  };

  useEffect(() => {
    setupInterceptors(logout);
  }, []);

  const refreshUser = async (authToken:string) => {
    try {
      const response = await api.get(`/auth/show`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const updatedUser = response.data.data;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setRole(updatedUser?.role || null);
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        role,
        setToken,
        setUser,
        setRole,
        // login,
        logout,
        isLoggedIn,
        refreshUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};

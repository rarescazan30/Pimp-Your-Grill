import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5001/api/users"; 

  useEffect(() => {
    const storedToken = localStorage.getItem("site_token");
    const storedUser = localStorage.getItem("site_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }


      setToken(data.token);
      setUser(data.user);

      localStorage.setItem("site_token", data.token);
      localStorage.setItem("site_user", JSON.stringify(data.user));

      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: error.message };
    }
  };

  const register = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Registration Error:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("site_token");
    localStorage.removeItem("site_user");
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import API from "../api/api";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("nutripulse_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const saveAuthentication = useCallback((token, userData) => {
    localStorage.setItem("nutripulse_token", token);
    localStorage.setItem(
      "nutripulse_user",
      JSON.stringify(userData)
    );
    setUser(userData);
  }, []);

  const clearAuthentication = useCallback(() => {
    localStorage.removeItem("nutripulse_token");
    localStorage.removeItem("nutripulse_user");
    setUser(null);
  }, []);

  const register = useCallback(
    async (payload) => {
      const response = await API.post("/auth/register", payload);
      saveAuthentication(response.data.token, response.data.user);
      return response.data;
    },
    [saveAuthentication]
  );

  const login = useCallback(
    async (email, password) => {
      const response = await API.post("/auth/login", {
        email,
        password,
      });
      saveAuthentication(response.data.token, response.data.user);
      return response.data;
    },
    [saveAuthentication]
  );

  const logout = useCallback(() => {
    clearAuthentication();
  }, [clearAuthentication]);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("nutripulse_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await API.get("/auth/me");
      const currentUser = response.data.user || response.data.profile;
      localStorage.setItem(
        "nutripulse_user",
        JSON.stringify(currentUser)
      );
      setUser(currentUser);
    } catch {
      clearAuthentication();
    } finally {
      setLoading(false);
    }
  }, [clearAuthentication]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
      refreshUser,
    }),
    [user, loading, register, login, logout, refreshUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

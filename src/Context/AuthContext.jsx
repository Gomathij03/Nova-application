import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("novaCurrentUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("novaCurrentUser");
      }
    }

    setIsLoading(false);
  }, []);

  const login = (loggedInUser) => {
    setUser(loggedInUser);

    localStorage.setItem(
      "novaCurrentUser",
      JSON.stringify(loggedInUser)
    );
  };

  const signup = (newUser) => {
    setUser(newUser);

    localStorage.setItem(
      "novaCurrentUser",
      JSON.stringify(newUser)
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("novaCurrentUser");
  };

  const value = {
    user,
    isLoggedIn: Boolean(user),
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}

export default AuthContext;
export { AuthProvider };
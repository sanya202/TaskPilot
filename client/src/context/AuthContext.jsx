import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const setUser = (userData) => {
    setUserState(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUserState(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import React, { useContext, useEffect } from "react";
import { isInAdminRoute, verify } from "./util";

interface AuthContextType {
  isLogin: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  isLogin: false
});

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const isLogin = !!localStorage.getItem('userInfo');

  useEffect(() => {
    if(!isLogin && isInAdminRoute()) {
      verify();
    }
  }, []);

  const value = { isLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth () {
  return useContext(AuthContext);
}

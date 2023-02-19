import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { useRouter } from "next/router";
import api from "../service/axios";

type ContextProps = {
  user: any;
  setUser: Function;
  login: Function;
  logout: Function;
  signup: Function;
};

const AuthContext = createContext({} as ContextProps);

export const Auth = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const login = useCallback(async (username: string, password: string) => {
    if (!username || !password) {
      throw new Error("Please provide both credentials");
    }
    const res: any = await api.post("/login", {
      username: username,
      password: password,
    });

    if (!res) {
      throw new Error("Internal Server Error");
    }
    if (res && res.status !== 200) {
      throw new Error(res.status);
    }
    setUser(username);
    localStorage.setItem("accessToken", res.data);
    router.push("/home");
  }, []);

  const logout = useCallback(() => {
    localStorage.remove("accessToken");
    setUser(null);
    router.push("/login");
  }, []);

  const signup = useCallback(() => {}, []);

  const valuePass = useMemo(() => {
    return {
      user,
      setUser,
      login,
      logout,
      signup,
    };
  }, [user, login, logout, signup]);

  return (
    <AuthContext.Provider value={valuePass}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

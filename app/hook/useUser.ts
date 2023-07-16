import { login, me, register } from "@/lib/api";
import User from "@/lib/types/user";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "./userAtom";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(false);
  const [user, setUser] = useRecoilState<User | null>(userAtom);

  useEffect(() => {
    refetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const loginUser = async (loginRequest: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const user = await login(loginRequest);
      setUser(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (registerRequest: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const user = await register(registerRequest);
      setUser(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetchUser = async () => {
    try {
      setLoading(true);
      const user = await me();
      setUser(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  const logout = () => {
    deleteAllCookies();
    localStorage.setItem("user", "");
    setUser(null);
    setLoading(false);
    setError(null);
  };

  const data = {
    loginUser,
    registerUser,
    refetchUser,
    loading,
    error,
    user,
    logout,
  };

  return data;
};

export default useUser;

import { createContext, useEffect, useState } from "react";
import { getAllLocalStorage } from "../services/storage";

interface IAppContext {
  user: string | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: string | null) => void;
}

export const AppContext = createContext({} as IAppContext);

export const AppContextProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storage = getAllLocalStorage();
    if (storage) {
      const { login, email } = JSON.parse(storage);
      setIsLoggedIn(login);
      setUser(email);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

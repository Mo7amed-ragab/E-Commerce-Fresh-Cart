import { createContext, useEffect, useState } from "react";

export const authContext = createContext();
export default function AuthContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(localStorage.getItem("userProfile"));

  // another way check localStorage has token or not token
  // useEffect(() => {
  //   const userToken = localStorage.getItem("token");
  //   setToken(userToken);
  // }, []);

  return (
    <>
      <authContext.Provider value={{ token, setToken, userData, setUserData }}>
        {children}
      </authContext.Provider>
    </>
  );
}

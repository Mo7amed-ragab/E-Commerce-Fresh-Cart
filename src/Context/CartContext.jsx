import React, { createContext } from "react";

const cartContext = createContext();
export default function CartContextProvider({ children }) {
  return <cartContext.Provider value={{}}>{children}</cartContext.Provider>;
}

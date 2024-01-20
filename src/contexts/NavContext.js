import React, { createContext, useState, useEffect } from "react";
export const NavContext = createContext(); //creating context

const NavContextProvider = ({ children }) => {
  const [isDD, setIsDD] = useState(false);
  const [isDDvisible, setIsDDvisible] = useState(false);
  useEffect(() => {
    const CheckAndSet = () => {
      if (window.innerWidth < 768) {
        setIsDD(true);
      } else {
        setIsDD(false);
      }
    };
    CheckAndSet();
    window.addEventListener("resize", CheckAndSet);
  }, []);

  return (
    <NavContext.Provider
      value={{
        isDD,
        isDDvisible,
        setIsDD,
        setIsDDvisible,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavContextProvider;

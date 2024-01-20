import React, { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext(); //creating context

const ThemeContextProvider = ({ children }) => {
  const [Theme, setTheme] = useState(undefined);
  useEffect(() => {
    if (Theme === undefined) {
      testTheme();
    }
  }, [Theme]);

  const testTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      console.log("hello");
    } else {
      setTheme("light");
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        Theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

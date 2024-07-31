import { createContext, useEffect, useState } from "react";

export const CryptoContext = createContext({});

export const ConfigProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDarkScheme) {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (currentTheme === "dark") {
      root.style.setProperty("--background", "6, 17, 33");
      root.style.setProperty("--textColor", "255, 255, 255");
      root.style.setProperty("--purpleColor", "138, 43, 226");
      root.style.setProperty("--accentColor", "184, 155, 228");
      root.style.setProperty("--darkSecondColor", "224, 224, 224");
    } else {
      root.style.setProperty("--background", "255, 255, 255");
      root.style.setProperty("--textColor", "25, 49, 77");
      root.style.setProperty("--purpleColor", "129, 40, 226");
      root.style.setProperty("--accentColor", "175, 107, 243");
      root.style.setProperty("--darkSecondColor", "58, 58, 58");
    }
  }, [currentTheme]);

  return (
    <CryptoContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

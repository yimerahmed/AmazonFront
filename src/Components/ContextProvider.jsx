import React, { useState, createContext, useContext } from "react";

const ColorContext = createContext();

export const useColor = () => {
  return useContext(ColorContext);
};

export const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState("light");

  const colorToggle = () => {
    setColor((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ColorContext.Provider value={{ color, colorToggle }}>
      {children}
    </ColorContext.Provider>
  );
};

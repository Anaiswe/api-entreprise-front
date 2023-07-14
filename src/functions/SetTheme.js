import { useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState("bg-dark");
    const textColor = theme === "bg-dark" ? "text-white" : "text-black";
  
    const toggleTheme = () => {
      if (theme === "light") {
        setTheme("bg-dark");
      } else {
        setTheme("light");
      }
    };
  
    return [theme, toggleTheme, textColor];
  };
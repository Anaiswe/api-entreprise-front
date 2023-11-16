import { useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState("light");
    const textColor = theme === "bg-dark" ? "text-black":"text-white" 
  
    const toggleTheme = () => {
      if (theme === "bg-dark") {
        setTheme("light");
      } else if (theme === "light") {
        setTheme("bg-dark");
      }
    };
  
    return [theme, toggleTheme, textColor];
  };
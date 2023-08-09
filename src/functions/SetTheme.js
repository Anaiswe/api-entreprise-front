import { useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState("bg-dark");
    const textColor = theme === "bg-dark" ? "text-white" : "text-black";
  
    const toggleTheme = () => {
      if (theme === "bg-dark") {
        setTheme("light");
      } else if (theme === "light") {
        setTheme("bg-dark");
      }
    };
  
    return [theme, toggleTheme, textColor];
  };
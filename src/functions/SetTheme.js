import { useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState("");
    const textColor = theme === "bg-dark" ? "text-white" : "text-black";
  
    const toggleTheme = () => {
      if (theme === "") {
        setTheme("bg-dark")
      } else if (theme === "bg-dark") {
        setTheme("light");
      } else if (theme === "light") {
        setTheme("bg-dark");
      }
    };
  
    return [theme, toggleTheme, textColor];
  };
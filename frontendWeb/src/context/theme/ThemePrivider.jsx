import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => setDarkMode(prev => !prev);

    useEffect(() => {
        window.toggleTheme = toggleTheme;
        if (darkMode) {
        document.body.classList.add("dark");
        } else {
        document.body.classList.remove("dark");
        }
    }, [darkMode]);

     return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
  );
};
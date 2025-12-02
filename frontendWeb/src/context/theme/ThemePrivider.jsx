import { useState, useEffect} from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    

    const toggleTheme = () => {
        setDarkMode(prev => {
        const newTheme = !prev;
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        return newTheme;
        });
    };

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
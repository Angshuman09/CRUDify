import { useState } from "react";
import { ThemeContext } from "./UseTheme";
export const ThemeProvider = ({children})=>{
    const [theme, setTheme] = useState("light");

    const toggleTheme = ()=>{
        setTheme((prevTheme)=>prevTheme== "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
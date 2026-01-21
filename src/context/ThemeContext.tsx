import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react"
import type { ThemeContexType } from "./type/ThemeContextType";

const ThemeContext = createContext<ThemeContexType | null>(null)

export const useTheme = ()=>{
    const context = useContext(ThemeContext)
    if(context == null){
        console.log("Error On Context");
        throw new Error("Something went wrong with ThemeContext")
    }
    return context
}

export const ThemeProvider = ({children}:{children : ReactNode}) =>{
    const [isDarkTheme,setIsDarkTheme] = useState<boolean>(false)
    const currentTheme = localStorage.getItem("theme")
    useEffect(()=>{
        if(!currentTheme)
            setIsDarkTheme(true)
        else 
            setIsDarkTheme(currentTheme === "dark" ? true : false)
    },[currentTheme])

    const toggledTheme = ()=>{
        setIsDarkTheme((prev)=>{
            localStorage.setItem("theme",!prev ? "dark" : "light" )
            return !prev
        })
    }

    const themeValue: ThemeContexType = {
        isDarkTheme,
        toggledTheme
    }

    return (
        <ThemeContext.Provider value={themeValue}>
            {children}
        </ThemeContext.Provider>
    )
}
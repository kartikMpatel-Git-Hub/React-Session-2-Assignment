import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

const Sidebar = ()=>{
    const {isDarkTheme} = useTheme()
    const navigator = useNavigate()
    const redirectToApiProducts = ()=>{
        navigator("./api-products")
    }
    const redirectToDashboard = ()=>{
        navigator("/")
    }
    return (
        <div className={`hidden md:block ${isDarkTheme ? "bg-slate-800 text-white":"bg-white text-slate-800"} px-15 h-screen font-semibold`}>
            <div>
                <button
                    onClick={redirectToDashboard} 
                    className="p-3 ">Dashboard</button>
            </div>
            <div>
                <button 
                    onClick={redirectToApiProducts}
                    className="p-3">Api Products</button>
            </div>
            <div className="p-3">Orders</div>
            <div className="p-3">Settings</div>
        </div>
    )
}

export default Sidebar
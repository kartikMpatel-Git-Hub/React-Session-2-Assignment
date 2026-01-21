import { Car, Home, Package, PackageCheckIcon, Settings, ShoppingCart, UserCircle2Icon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

const Navbar = () => {

    const navigator = useNavigate()
    const {cart} = useCart()
    const totalItem = cart.reduce((n1,n2)=>{
        return n1 + n2.qty
    },0)
    const redirectToApiProducts = () => {
        navigator("./api-products")
    }
    const redirectToDashboard = () => {
        navigator("/")
    }
    const redirectToCart = ()=>{
        navigator("/cart")
    }
    const { isDarkTheme, toggledTheme } = useTheme()

    const handleToggledTheme = () => {
        toggledTheme()
    }
    return (
        <div className=
            {`${isDarkTheme ? "bg-slate-800 text-white" : "bg-white text-slate-800 "} md:flex gap-10 m-auto w-fit lg:w-full fixed`}>
            <div className="font-bold p-3">
                E-Commerce vendor Dashboard
            </div>
            <div className="flex">
                <div
                    onClick={redirectToDashboard}
                    className="font-semibold p-3 flex">
                    <Home className="w-5 h-5 m-1" /> Home
                </div>
                <div
                    onClick={redirectToApiProducts}
                    className="font-semibold p-3 flex">
                    <Package className="w-5 h-5 m-1" /> Api Products
                </div>
                <div className=" font-semibold p-3 flex">
                    <PackageCheckIcon className="w-5 h-5 m-1" />Orders
                </div>
                <div className=" font-semibold p-3 flex">
                    <Settings className="w-5 h-5 m-1" /> Settings
                </div>
            </div>
            <div className="hidden md:block md:flex p-3">
                <UserCircle2Icon /> Profile
            </div>
            <div
                onClick={redirectToCart}
                className="p-3 flex">
                <ShoppingCart />
                <span className="text-sm p-1 font-bold">
                    {totalItem}
                </span>
            </div>
            <button
                className={`${isDarkTheme ? "bg-white text-slate-800" : " bg-slate-800 text-white"} rounded-2xl m-2 font-semibold px-10`}
                onClick={
                    handleToggledTheme
                }
            >
                Change Theme
            </button>
        </div>
    )
}
export default Navbar
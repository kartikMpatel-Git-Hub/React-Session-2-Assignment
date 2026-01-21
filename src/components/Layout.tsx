import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import Products from "./Products"
import Sidebar from "./Sidebar"
import ApiProducts from "./ApiProducts"
import Cart from "./Cart"

const Layout = () =>{
    return (
        <>
            <Navbar />
            <div className="flex gap-1 bg-gray-500 text-gray-100">
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Products/>}/>
                        <Route path="/api-products" element={<ApiProducts />}/>
                        <Route path="/cart" element={<Cart />}/>
                    </Routes> 
            </div>
        </>
    )
}

export default Layout
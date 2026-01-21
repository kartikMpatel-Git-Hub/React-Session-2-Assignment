import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Cart() {
    const { cart, clearCart } = useCart()
    const {isDarkTheme} = useTheme()
    const navigator = useNavigate()
    const totalAmount = cart.reduce((n1, n2) => {
        return n1 + (n2.price * n2.qty)
    }, 0)
    const totalQty = cart.reduce((n1, n2) => {
        return n1 + n2.qty
    }, 0)
    console.log(totalAmount);
    console.log(totalQty);

    const handleClearCart = () => {
        clearCart()
    }
    const handleCheckout = () => {
        window.alert("Your Order has Been placed !")
        clearCart()
    }

    const redirectToApiProducts = () => {
        navigator("../api-products")
    }

    return (
        <div className="w-fit h-fit gap-3 m-auto justify-center rounded-2xl mt-20">
            <div className="">
                {cart.map(item => (
                    <CartProduct
                        cartProduct={item}
                        key={item.id}
                    />
                ))}
            </div>
            {
                totalQty > 0 ? (
                    <>
                        <div className={`${isDarkTheme ? "bg-slate-800" : "text-slate-800 bg-white"} p-2 m-2 rounded-2xl flex justify-end font-bold`}>
                            <div>
                                <div>
                                    Total Qty : {totalQty}
                                </div>
                                <div>
                                    Total Amount : ₹ {totalAmount.toString().substring(0, 5)}
                                </div>
                            </div>
                        </div>
                        <div className={`${isDarkTheme ? "bg-slate-800 text-white" : "text-slate-800 bg-white"} flex justify-center`}>
                            <button
                                className={`${isDarkTheme ? "bg-white text-slate-800" : "bg-slate-800 text-white"} p-3 rounded-2xl font-semibold `}
                                onClick={handleClearCart}
                            >Clear</button>
                            <button
                                className={`${isDarkTheme ? "bg-white text-slate-800" : "bg-slate-800 text-white"} p-3 rounded-2xl  font-semibold`}
                                onClick={handleCheckout}
                            >Checkout</button>
                        </div>
                    </>
                )
                    : (
                        <div className={` ${isDarkTheme ? "bg-slate-800 text-white":"bg-white text-slate-800" } m-auto p-10`}>
                            <div className="flex justify-center">
                                <ShoppingCart className="w-10 h-10" />
                            </div>
                            <div className="font-bold">
                                Your Cart is Empty
                            </div>
                            <div className="flex justify-center">
                                <button 
                                    onClick={redirectToApiProducts}
                                className={` ${isDarkTheme ? "bg-white text-slate-800":"bg-slate-800 text-white" } p-3 rounded-2xl m-2`}>
                                    Start shopping
                                </button>
                            </div>
                        </div>
                    )
            }

        </div>
    )
}

export default Cart

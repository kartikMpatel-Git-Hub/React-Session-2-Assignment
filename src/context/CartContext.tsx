import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartContextType } from "./type/CartContextType";
import type { Cart, ProductDto } from "../types/types";

const CartContext = createContext<CartContextType | null>(null)

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        console.log("Error On Context");
        throw new Error("Something went wrong with ThemeContext")
    }
    return context

}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart[] | []>([])
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart") || "[]"))
    }, [])

    const addToCart = (product: ProductDto) => {
        const isExists = cart.findIndex(prod => prod.id === product.id)
        console.log(isExists);
        let updatedCart: Cart[] = []
        if (isExists !== -1) {
            updatedCart = cart.map((prod) => (
                prod.id === product.id
                    ? { ...prod, qty: prod.qty + 1 }
                    : prod
            ))
        }
        else {
            updatedCart = [...cart,{...product,qty : 1}]
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    const removeFromCart = (id: number) => {
        const updatedCart: Cart[] = cart.filter(p => p.id !== id)
        setCart(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

    const increaseQty = (id : number)=>{
        
        const updatedCart = cart.map((prod) => (
                prod.id === id
                    ? { ...prod, qty: prod.qty + 1 }
                    : prod
            ))
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    const decreaseQty = (id : number)=>{
        const updatedCart = cart.map((prod) => (
                prod.id === id
                    ? { ...prod, qty: prod.qty - 1 }
                    : prod
            ))

        const filteredEmptyOne = updatedCart.filter((prod)=>(prod.id !== id || prod.qty != 0))
        localStorage.setItem("cart", JSON.stringify(filteredEmptyOne))
        setCart(filteredEmptyOne)
    }

    const clearCart = ()=>{
        setCart([])
        localStorage.setItem("cart",JSON.stringify([]))
    }

    const cartContextValue: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart
    }

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    )

}
import { Delete, Minus, Plus, X } from "lucide-react"
import type { Cart } from "../types/types"
import { useCart } from "../context/CartContext"
import { useTheme } from "../context/ThemeContext"

function CartProduct({cartProduct}:{cartProduct:Cart}) {

    const {removeFromCart,increaseQty,decreaseQty} = useCart()
    const {isDarkTheme} = useTheme()

    const handleDeleteFromCart = (id:number)=>{
        if(!id)
            return
        try {
            removeFromCart(id)
        } catch (error) {
            console.log(error);
        }
    }

    const handleIncreaseQty = (id : number)=>{
        increaseQty(id)
    }
    const handleDecreaseQty = (id : number)=>{
        decreaseQty(id)
    }   

  return (
    <div className={`${isDarkTheme ? "bg-slate-800 text-white" : "bg-white text-slate-800"} m-3 flex w-240 rounded-2xl`}>
        <div className="bg-white m-2 rounded-2xl">
            <img    
                src={cartProduct.images}
                className="w-100" 
            />
        </div>
        <div className="p-3 w-screen">
            <div className="flex">
                <div className="py-3">
                    Title : {cartProduct.title}
                </div>
                <div className="p-3 m-auto flex gap-3">
                    <Plus 
                        onClick={()=>handleIncreaseQty(cartProduct.id)}
                        className="bg-gray-200 text-black rounded-xl"/>
                    <div className="">
                        {cartProduct.qty}
                    </div>
                    <Minus 
                        onClick={()=>handleDecreaseQty(cartProduct.id)}
                        className="bg-gray-200 text-black rounded-xl"/>
                    <X 
                        onClick={() => handleDeleteFromCart(cartProduct.id)}
                        className="bg-red-600 text-white rounded-xl"
                        />
                </div>
            </div>
            <div className="py-3">Category : {cartProduct.category}</div>
            <div className="py-3">price : ₹{cartProduct.price}</div>
            <div className="py-3 font-semibold"><span className="text-yellow-500">stock left </span>{cartProduct.stock}</div>
        </div>

    </div>
  )
}

export default CartProduct

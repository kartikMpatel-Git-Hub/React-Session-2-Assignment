import { useTheme } from "../context/ThemeContext"
import type { Product } from "../types/types"

// interface ProductCardProps {
//     product: Product
// }

const ProductCard = (product: {product : Product}) => {

    const {isDarkTheme} = useTheme()
    return (
        <div className={`${isDarkTheme ? "bg-slate-800 text-white": "text-black bg-white"} font-semibold rounded-2xl p-3`}>
            <div>
                <div className={``}>
                    name : {product.product.product}
                </div>
                <div className="flex">
                    Price : ₹{product.product.price.toString()}
                    {
                        Number(product.product.price) >= 5000 &&
                        <div className="text-sm bg-white text-blue-700 rounded-2xl p-1">
                            Premium
                        </div>
                    }
                </div>
                <div className="flex">
                    Qty : {product.product.qty.toString()}
                    {
                        Number(product.product.qty) < 5 && 
                            (
                                Number(product.product.qty) == 0 
                                    ? <div className="text-sm bg-white text-red-700 rounded-2xl p-1">Out of Stock</div> 
                                    : <div className="text-sm bg-orange-400 text-white rounded-2xl p-1">Limited Quantity</div>
                            )
                            
                    }
                </div>
                <div>
                    Category : {product.product.category}
                </div>
                <div>
                    Brand : {product.product.brand}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
import { useTheme } from "../context/ThemeContext"

interface ProductDto {
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    stock: number,
    images : string
}

function Product({ product }: { product: ProductDto }) {
    const { isDarkTheme } = useTheme()

    return (
        <div className={`${isDarkTheme ? "bg-slate-800 text-white" : "bg-white text-black"} p-3 w-72 rounded-2xl shadow-2xl`}>
            <div className={`${isDarkTheme ? "bg-white text-slate-800" : "bg-slate-800 text-white"} w-fit px-2  rounded-2xl`}>{product.id}</div>
            <div>
                <img 
                    src={product.images}
                    alt={product.title}
                    />
            </div>
            <div>Title : {product.title}</div>
            <div className="shadow-2xl shadow-black rounded-2xl">Description : {product.description}</div>
            <div className="flex">
                Category : <div className="bg-gray-500 text-white font-semibold w-fit rounded-2xl p-2">{product.category}</div>
            </div>
            <div className="font-semibold">
                price : ₹{product.price}
            </div>
            <div className="font-bold">
                Stock : {product.stock}
            </div>
        </div>
    )
}

export default Product

import { useEffect, useState } from "react"
import Product from "./Product"
import { CircleAlert, FileWarning, LoaderIcon, Search, ShoppingCart } from "lucide-react"
import type{ProductDto} from "../types/types"
import { useCart } from "../context/CartContext"



function ApiProducts() {
    const [products, setProducts] = useState<ProductDto[]>([])
    const [loadin, setLoading] = useState<boolean>(false)
    const [searchFilter, setSerachFilter] = useState<string>("")
    const [filteredData, setFilteredData] = useState<ProductDto[]>([])
    const [categories, setCategories] = useState([])
    const [categoryFilter,setCategoryFilter] = useState("")
    const {cart,addToCart,removeFromCart} = useCart()
    const fetchCategories = (products: ProductDto[]) => {
        const cate: any = [...new Set(products.map((p) => p.category.toString()))]
        setCategories(cate)
    }
    const fetchData = async () => {

        try {
            const response = await fetch("https://dummyjson.com/products")
            const data = await response.json()
            const products = data.products
            setProducts(products)
            setFilteredData(products)
            fetchCategories(products)
        } catch (error) {
            setProducts([])
        }
    }
    useEffect(() => {
        setLoading(true)
        try {
            fetchData()
        } catch (err) {
            console.log(err);
            setProducts([])
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, (500));
        }
    }, [])

    useEffect(() => {
        const data: ProductDto[] = 
        products.filter((prod) => {
            const searchResult = prod.title.toLowerCase().includes(searchFilter)
            const categoryResult = categoryFilter === "" || categoryFilter === prod.category
            return searchResult && categoryResult
        })
        setFilteredData(data)
    }, [searchFilter,categoryFilter])


    const handleAddToCart = (product : ProductDto)=>{
        try {
            // console.log(product);
            addToCart(product)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        loadin ? (
            <div className="m-auto flex">
                <LoaderIcon />
                Loading products...
            </div>) :
            (
                <div className="w-screen h-fit mt-20">
                    <div>
                        <div className="">
                            <div className="flex border-2">
                                <input
                                    type="text"
                                    className="w-full p-4 text-black"
                                    value={searchFilter}
                                    placeholder="Search Filter"
                                    onChange={(e) => setSerachFilter(e.target.value)}
                                />
                                <div className="p-5">
                                    <Search />
                                </div>
                            </div>
                            <div>
                                <select 
                                    className="text-black" 
                                    onChange={(e)=>setCategoryFilter(e.target.value)}
                                    value={categoryFilter}>
                                    <option value={""}>All Categories</option>
                                    {categories.map((cat,idx) => (
                                        <option value={cat} key={idx}>{cat}</option>
                                    )
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {
                            filteredData.length > 0 ?
                                (
                                    <div className="">

                                        <div className="flex flex-wrap gap-1 m-15 rounded-2xl bg-white/80 p-5">

                                            {
                                                filteredData.map((p) => (
                                                    <div className="">
                                                        <Product
                                                            product={p}
                                                        />
                                                        <button 
                                                            onClick={()=>handleAddToCart(p)}
                                                            className="bg-slate-800 p-2 rounded-2xl flex">
                                                            <ShoppingCart />Add To Cart
                                                        </button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                )
                                :
                                (
                                    <div className="m-auto flex">
                                        <CircleAlert />
                                        No Product Found
                                    </div>
                                )
                        }
                    </div>
                </div>

            )
    )
}

export default ApiProducts

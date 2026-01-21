import { Fragment, useState } from "react"
import ProductCard from "./ProductCard"
import AddProduct from "./AddProduct"
import type { Product } from "../types/types"
import EditProduct from "./EditProduct"

const Products = () => {

    const [openAddForm, setOpenAddForm] = useState(true)
    const [openEditForm, setOpenEditForm] = useState(false)
    const key = "products"
    const [products, setProducts] = useState<Product[]>(JSON.parse(localStorage.getItem(key) || "[]"))
    const [editProduct,setEditProduct] = useState<Product>({
        id : 0,
        product : "",
        price : 0,
        qty : 0,
        brand : "",
        category : ""
    })

    const [search, setSearch] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("")
    const [brandFilter, setBrandFilter] = useState("")
    

    const getBrands = () => [...new Set(products.map((p) => p.brand.toString()))]
    const getCategories = () => [...new Set(products.map((p) => p.category.toString()))]
    const brands = getBrands()
    const categories = getCategories()

    const filterProducts = products.filter((product) => {
        const searchMatch =
            product.product.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())
        const categoryMatch = categoryFilter === "" || categoryFilter === product.category
        const brandMatch = brandFilter === "" || brandFilter === product.brand
        return searchMatch && categoryMatch && brandMatch
    })
    // console.log(filterProducts);
    

    const clearFilter = () => {
        setSearch("")
        setBrandFilter("")
        setCategoryFilter("")
    }

    const handleOpenAddForm = () => {
        setOpenAddForm(true)
    }

    const handleCloseAddForm = () => {
        setOpenAddForm(false)
    }

    const handleDelete = (p:Product)=>{
        // console.log(p);
        const newProductList = products.filter((product)=>p.id !== product.id)
        setProducts(newProductList)
        localStorage.setItem(key,JSON.stringify(newProductList))
    }

    const handleEditProduct = (p:Product)=>{
        // console.log(p);
        setEditProduct({
            id : Number(p.id),
            product : p.product.toString(),
            price : Number(p.price),
            qty : Number(p.qty),
            brand : p.brand.toString(),
            category : p.category.toString()  
        })
        setOpenEditForm(true)
    }

    return (
        <div className="">
            <div>
                {openAddForm ?
                    <button
                        className="bg-slate-800 h-15 p-4 rounded-2xl text-white"
                        onClick={handleCloseAddForm}>Close Add Product Form</button>
                    :

                    <button
                        className="bg-slate-800 h-15 p-4 rounded-2xl text-white"
                        onClick={handleOpenAddForm}>Open Add Product Form</button>
                }
                <div
                    className={`${!openAddForm && "hidden"} `}
                >
                    <AddProduct
                        setOpenAddForm={setOpenAddForm}
                        setProducts={setProducts}
                    />
                </div>
                <div
                    className={`${!openEditForm && "hidden"} `}
                >
                    <EditProduct
                        product={editProduct}
                        setProduct={setEditProduct}
                        setProducts={setProducts}
                        setOpenEditForm={setOpenEditForm}
                    />
                </div>
                

            </div>
            <div>
                <div>
                    Serach By name
                    <input
                        type="text"
                        value={search}
                        className="border-1 border-black"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    Category
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value={""}>All Categories</option>
                        {categories.map((category) => (
                            <option value={category} key={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    Brand
                    <select
                        value={brandFilter}
                        onChange={(e) => setBrandFilter(e.target.value)}
                    >
                        <option value={""}>All Brands</option>
                        {brands.map((brand) => (
                            <option value={brand} key={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    Clear Filter
                    <button
                        onClick={clearFilter}
                        className="bg-slate-600 p-2 rounded-2xl"
                    >
                        Clear Filter
                    </button>
                </div>
            </div>
            <div className="">
                <h3 className="text-2xl">Total Products : {products.length}</h3>
                <div className="flex gap-5">
                    {
                        filterProducts.map((p: any, idx: number) => (
                            <div key={idx} className="border-2 border-black rounded-2xl">
                                <ProductCard product={p} key={idx} />
                                <div 
                                    onClick={() => handleDelete(p)}
                                    className="bg-red-800 text-white p-2 m-2 rounded-2xl">
                                    Delete
                                </div>
                                <div 
                                    className="bg-yellow-300 text-black p-2 m-2 rounded-2xl"
                                    onClick={() => handleEditProduct(p)}
                                    >
                                    Edit
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Products
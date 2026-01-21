import React, { useState, type ChangeEvent } from "react"
import type { Product } from "../types/types"

interface SetProductProps {
    setProducts : React.Dispatch<React.SetStateAction<Product[]>>
        setOpenAddForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddProduct = ({setProducts,setOpenAddForm}:SetProductProps) => {

    const [newProduct, setNewProduct] = useState({
        product: "",
        price: 0,
        qty: 0,
        category: "",
        brand: ""
    })
    const [errors, setErrors] = useState<String[]>([])
    const key = "products"
    const addProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors([])
        if (!isValidForm()) {
            // console.log(errors);
            return
        }
        saveProduct()
    }

    const saveProduct = () => {

        try {
            const product: Product = {
                id: Date.now(),
                product: newProduct.product,
                price: newProduct.price,
                qty: newProduct.qty,
                brand: newProduct.brand,
                category: newProduct.category
            }
            const storedItem = JSON.parse(localStorage.getItem(key) || "[]")
            const updatedProducts = [...storedItem, product]
            localStorage.setItem(key, JSON.stringify(updatedProducts))
            setProducts(updatedProducts)
            clearForm()
            setOpenAddForm(false)
        } catch (error) {
            // console.log(error);
            
            setErrors((prev) => [...prev, "Something Went Wrong while Adding Product"])
        }

    }

    const clearForm = () => {
        setNewProduct({
            product: "",
            price: 0,
            qty: 0,
            category: "",
            brand: ""
        })
    }

    const isValidForm = () => {
        if (newProduct.product.length == 0) {
            setErrors((prev) => [...prev, "Product Name Can Not Be Empty"])
        }

        if (newProduct.product.length <= 2 && newProduct.product.length > 0) {
            setErrors((prev) => [...prev, "Product Name Required Atlest 3 Characters"])
        }

        if (newProduct.price <= 0) {
            setErrors((prev) => [...prev, "Product Price Can't Be 0 or Negative"])
        }

        if (newProduct.category.length == 0) {
            setErrors((prev) => [...prev, "Category Can Not Be Empty"])
        }

        if (newProduct.category.length <= 2 && newProduct.category.length > 0) {
            setErrors((prev) => [...prev, "Category Required Atlest 3 Characters"])
        }

        if (newProduct.brand.length == 0) {
            setErrors((prev) => [...prev, "Brand Can Not Be Empty"])
        }

        if (newProduct.brand.length <= 2 && newProduct.brand.length > 0) {
            setErrors((prev) => [...prev, "Brand Required Atlest 3 Characters"])
        }
        return true
    }
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    return (
        <div className="">
            <form onSubmit={addProduct}>
                <div className="p-5">
                    <div className="p-3 flex gap-3">
                        <div>
                            Product
                        </div>
                        <input
                            value={newProduct.product}
                            type="text"
                            name="product"
                            onChange={handleValueChange}
                            className="border-1"
                            required
                        />
                    </div>
                    <div className="p-3 flex gap-3">
                        <div>
                            price
                        </div>
                        <input
                            value={newProduct.price}
                            type="number"
                            min={0}
                            name="price"
                            onChange={handleValueChange}
                            className="border-1"
                            required
                        />
                    </div>
                    <div className="p-3 flex gap-3">
                        <div>
                            quantity
                        </div>
                        <input
                            value={newProduct.qty}
                            type="number"
                            min={0}
                            name="qty"
                            onChange={handleValueChange}
                            className="border-1"
                            required
                        />
                    </div>
                    <div className="p-3 flex gap-3">
                        <div>
                            category
                        </div>
                        <input
                            value={newProduct.category}
                            type="text"
                            name="category"
                            onChange={handleValueChange}
                            className="border-1"
                            required
                        />
                    </div>
                    <div className="p-3 flex gap-3">
                        <div>
                            Brand
                        </div>
                        <input
                            value={newProduct.brand}
                            type="text"
                            name="brand"
                            onChange={handleValueChange}
                            className="border-1"
                            required
                        />
                    </div>
                    <div className="flex p-3 gap-3">
                        <input
                            type="submit"
                            className="p-3 bg-slate-800 text-white rounded-2xl"
                            value={"add Product"}
                        />
                        <input
                            type="reset"
                            className="p-3 bg-slate-800 text-white rounded-2xl"
                        />
                    </div>
                </div>
            </form>
            <div className="text-red-700">
                {
                    errors.map((error, idx) => (
                        <div key={idx}>
                            {error}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AddProduct
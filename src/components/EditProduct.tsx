import React, { useState, type ChangeEvent } from "react"
import type { Product } from "../types/types"

interface SetProductProps {
    product: Product,
    setProduct: React.Dispatch<React.SetStateAction<Product>>
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
    setOpenEditForm: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProduct = ({ product, setProduct, setProducts, setOpenEditForm }: SetProductProps) => {

    // console.log(product);

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
            const updatedProduct: Product = {
                id: product.id,
                product: product.product,
                price: product.price,
                qty: product.qty,
                brand: product.brand,
                category: product.category
            }
            const storedItem: Product[] = JSON.parse(localStorage.getItem(key) || "[]")
            const updatedProducts:Product[] = storedItem.map((item) => (
                item.id != product.id
                    ? item
                    : {
                        id : Number(product.id),
                        product: product.product,
                        price: product.price,
                        qty: product.qty,
                        brand: product.brand,
                        category: product.category
                    }
            ))
            // console.log(updatedProducts);
            localStorage.setItem(key, JSON.stringify(updatedProducts))
            setProducts(updatedProducts)
            setOpenEditForm(false)
            // closeForm()
        } catch (error) {
            // console.log(error);

            setErrors((prev) => [...prev, "Something Went Wrong while Adding Product"])
        }

    }

    const closeForm = () => {
        setOpenEditForm(false)
    }

    const isValidForm = () => {
        if (product.product.length == 0) {
            setErrors((prev) => [...prev, "Product Name Can Not Be Empty"])
        }

        if (product.product.length <= 2 && product.product.length > 0) {
            setErrors((prev) => [...prev, "Product Name Required Atlest 3 Characters"])
        }

        if (Number(product.price) <= 0) {
            setErrors((prev) => [...prev, "Product Price Can't Be 0 or Negative"])
        }

        if (product.category.length == 0) {
            setErrors((prev) => [...prev, "Category Can Not Be Empty"])
        }

        if (product.category.length <= 2 && product.category.length > 0) {
            setErrors((prev) => [...prev, "Category Required Atlest 3 Characters"])
        }

        if (product.brand.length == 0) {
            setErrors((prev) => [...prev, "Brand Can Not Be Empty"])
        }

        if (product.brand.length <= 2 && product.brand.length > 0) {
            setErrors((prev) => [...prev, "Brand Required Atlest 3 Characters"])
        }
        return true
    }
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setProduct({ ...product, [e.target.name]: e.target.value })
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
                            value={product.product.toString()}
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
                            value={Number(product.price)}
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
                            value={Number(product.qty)}
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
                            value={product.category.toString()}
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
                            value={product.brand.toString()}
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
                            value={"Update Product"}
                        />
                        <button
                            className="p-3 bg-slate-800 text-white rounded-2xl"
                            onClick={closeForm}
                        >
                            Cancle
                        </button>
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

export default EditProduct
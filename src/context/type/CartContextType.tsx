import type { Cart, Product, ProductDto } from "../../types/types";

export interface CartContextType{
    cart : Cart[];
    addToCart : (product : ProductDto) => void
    removeFromCart : (id : number) => void
    increaseQty : (id : number) => void
    decreaseQty : (id : number) => void
    clearCart : ()=>void
    // toggledTheme : ()=>void;
}
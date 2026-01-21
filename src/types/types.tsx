export interface Product{
    id : Number,
    product : String,
    price : Number,
    qty : Number,
    category : String,
    brand : String
}


export interface Cart{
    id: number,
    title: string,
    category: string,
    price: number,
    stock: number,
    images : string,
    qty : number
}

export interface ProductDto {
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    stock: number,
    images : string
}

const cartModel = require('../models/carts.model')

class Cart {
    
    async createCart(){
        try{
            let result = await cartModel.create({})
            return result
        }catch(error){
            console.error(error)
            return null
        }
    }

    async getCartById(id){
        try{
            let cart = await cartModel.findById(id).lean(true)
            return cart
        }catch(error){
            console.error(error)
            return null
        }
    }

    async addProductsInCartById(id_cart, id_product){
        try{
            let cart = await cartModel.findById(id_cart)
            let product = cart.products
            let productInsert = product.find( (product)=>product.product == id_product)
            if(productInsert){ // si el producto ya se encuentra en el carrito, aumenta en una unidad
                productInsert.quantity += 1;
            }else{
                cart.products.push({product: id_product})
            }
            let result = await cartModel.updateOne({_id: id_cart}, cart)
            return result
        }catch(error){
            console.error(error)
        }
    }

    async deleteProductInCart(id_cart, id_product){
        try{
            let cart = await cartModel.findById(id_cart)
            let product = cart.products
            let productsNew = product.filter( (prod)=> prod.product != id_product) // array filtrado

            let result = await cartModel.updateOne({_id: id_cart}, {$set: {products: productsNew}})  
            return result
        }catch(error){
            console.error(error)
        }
    }

    async modifyProductsInCart(id, productsNews){
        try{
            let cart = await cartModel.findById(id)
            let result = await cartModel.updateOne({_id: id}, {$set: {products: productsNews}})
            return result
        }catch(error){
            console.error(error)
        }
    }

    async modifyQuantityInProductInCart(id_cart, id_product, quantity){
        try{
            let cart = await cartModel.findById(id_cart)
            let product = cart.products
            let newProduct = product.findIndex( (prod) => prod.product == id_product)
            product[newProduct].quantity = quantity
            let result = await cartModel.updateOne({_id: id_cart}, cart)
            return result
        }catch(error){
            console.error(error)
        }
    }

    async deleteProductsInCart(id){
        try{
            let cart = await cartModel.findById(id)
            let product = cart.products
            product.splice(0, product.length)
            let result = await cartModel.updateOne({_id: id}, cart)
            return result
        }catch(error){
            console.error(error)
        }
    }
}

const cart = new Cart()
module.exports = cart
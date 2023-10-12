const cartsClass = require('../dao/clases/carts')

const createCart = () =>{
    return cartsClass.createCart()
}

const getCartById = (id) =>{
    return cartsClass.getCartById(id)
}

const addProductsInCartById = (id_cart, id_product) =>{
    return cartsClass.addProductsInCartById(id_cart, id_product)
}

const deleteProductInCart = (id_cart, id_product) =>{
    return cartsClass.deleteProductInCart(id_cart, id_product)
}

const modifyProductsInCart = (id, productsNews) =>{
    return cartsClass.modifyProductsInCart(id, productsNews)
}

const modifyQuantityInProductInCart = (id_cart, id_product, quantity) =>{
    return cartsClass.modifyQuantityInProductInCart(id_cart, id_product, quantity)
}

const deleteProductsInCart = (id) =>{
    return cartsClass.deleteProductsInCart(id)
}

module.exports = {
    createCart,
    getCartById,
    addProductsInCartById,
    deleteProductInCart,
    modifyProductsInCart,
    modifyQuantityInProductInCart,
    deleteProductsInCart
}
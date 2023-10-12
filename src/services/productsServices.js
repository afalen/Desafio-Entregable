const productsClass = require('../dao/clases/products')

const getProducts = (limit, page, sort, query) =>{
    return productsClass.getProducts(limit, page, sort, query)
}

const getProductsById = (id) =>{
    return productsClass.getProductsById(id)
}

const addProduct = (nombre, categoria, precio, stock, imagen) =>{
    return productsClass.addProduct(nombre, categoria, precio, stock, imagen)
}

const modifyProduct = (id, updates) =>{
    return productsClass.modifyProduct(id, updates)
}

const deleteProduct = (id) =>{
    return productsClass.deleteProduct(id)
}

module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    modifyProduct,
    deleteProduct
}
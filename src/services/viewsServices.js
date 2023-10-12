const viewsClass = require('../dao/clases/views')
const cartsClass = require('../dao/clases/carts')

const getPaginationProducts = (limit, page) =>{
    return viewsClass.getPaginationProducts(limit, page)
}

const getCartById = (id) =>{
    return cartsClass.getCartById(id)
}

const getProductsProfile = (first_name, last_name, email, age, role, cart) => {
    return viewsClass.getProductsProfile(first_name, last_name, email, age, role, cart)
}

module.exports = {
    getPaginationProducts,
    getCartById,
    getProductsProfile
}
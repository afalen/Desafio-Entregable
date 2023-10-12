const cartsService = require('../services/cartsServices')

const createCart = async(req, res)=>{
    let resultado = await cartsService.createCart({})
    res.send({result: 'success', payload: resultado})
} 

const getCartById = async(req, res)=>{
    const {cid} = req.params
    let resultado = await cartsService.getCartById(cid)
    res.send({result: 'success', payload: resultado})
}

const addProductsInCartById = async(req, res)=>{
    const {cid, pid} = req.params
    let resultado = await cartsService.addProductsInCartById(cid, pid)
    res.send({result: 'success', payload: resultado}) 
}

const deleteProductInCart = async(req, res)=>{
    const {cid, pid} = req.params
    let resultado = await cartsService.deleteProductInCart(cid, pid)
    res.send({result: 'success', payload: resultado}) 
}

const modifyProductsInCart = async(req, res)=>{
    const {cid} = req.params
    const newsProducts = req.body
    let resultado = await cartsService.modifyProductsInCart(cid, newsProducts)
    res.send({result: 'success', payload: resultado}) 
}

const modifyQuantityInProductInCart = async(req, res)=>{
    const {cid, pid} = req.params
    const newQuantity = req.body.quantity
    let resultado = await cartsService.modifyQuantityInProductInCart(cid, pid, newQuantity)
    res.send({result: 'success', payload: resultado}) 
}

const deleteProductsInCart = async(req, res)=>{
    const {cid} = req.params
    let resultado = await cartsService.deleteProductsInCart(cid)
    res.send({result: 'success', payload: resultado}) 
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
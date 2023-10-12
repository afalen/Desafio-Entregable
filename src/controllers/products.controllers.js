const productsService = require('../services/productsServices')

const getProducts = async(req, res)=>{
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1
    const sort = parseInt(req.query.sort)
    const query = req.query.query 
    let resultado = await productsService.getProducts(limit, page, sort, query)
    res.send({result: 'success', payload: resultado})
}

const getProductsById = async(req, res)=>{
    const {pid} = req.params
    let product = await productsService.getProductsById(pid)
    res.send({result: 'success', payload: product})
}

const addProduct = async(req, res)=>{
    let {nombre, categoria, precio, stock, imagen} = req.body
    if(!nombre || !categoria || !precio || !stock || !imagen){
        res.send({status: "error", error: "Faltan parámetros"})
    }

    let result = await productsService.addProduct(nombre, categoria, precio, stock, imagen)
    res.send({result: "success", payload: result})
}

const modifyProduct = async(req, res)=>{
    let {uid} = req.params
    let productToReplace = req.body
    if(!productToReplace.nombre || !productToReplace.categoria || !productToReplace.precio || !productToReplace.stock || !productToReplace.imagen){
        res.send({status:'error', error:'Faltan parámetros'})
    }

    let result = await productsService.modifyProduct(uid, productToReplace)
    res.send({result: 'success', payload: result})
}

const deleteProduct = async(req, res)=>{
    let {uid} = req.params
    let result = await productsService.deleteProduct(uid)
    res.send({result: "success", payload: result})
}


module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    modifyProduct,
    deleteProduct
}
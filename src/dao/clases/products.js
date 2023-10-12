const productModel = require('../models/products.model')

class Product{
    async getProducts(limit, page, sort, query){
        try{
            let products
            if(!query && !sort){
                products = await productModel.paginate({}, {limit: limit, page: page })
            }else if(!query){
                products = await productModel.paginate({}, {limit: limit, page: page, sort: {precio: sort} })
            }else if(isNaN(query)){
                products = await productModel.paginate({categoria: query}, {limit: limit, page: page, sort: {precio: sort} })
            }else if(!isNaN(query)){
                products = await productModel.paginate({stock: Number(query)}, {limit: limit, page: page, sort: {precio: sort} })
            }
            return products
        }catch(error){
            console.error(error)
            return null
        }
    }

    async getProductsById(id){
        try{
            let product = await productModel.findById(id)
            return product
        }catch(error){
            console.error(error)
            return null
        }
    }

    async addProduct(nombre, categoria, precio, stock, imagen){
        try{
            let result = await productModel.create({nombre, categoria, precio, stock, imagen})
            return result
        }catch(error){
            console.error(error)
            return null
        }
    }

    async modifyProduct(id, updates){
        try{
            let result = await productModel.updateOne({_id: id}, updates)
            return result
        }catch(error){
            console.error(error)
            return null
        }
    }

    async deleteProduct(id){
        try{
            let result = await productModel.deleteOne({_id: id})
            return result
        }catch(error){
            console.error(error)
            return null
        }
    }

}

const product = new Product()
module.exports = product
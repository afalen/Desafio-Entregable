const {Router} = require('express')
const router = Router()
const productsController = require('../controllers/products.controllers')

// Ruta para mostrar productos de acuerdo a las querys ingresadas
router.get('/', productsController.getProducts)

// Ruta para mostrar un producto especificado por su ID
router.get('/:pid', productsController.getProductsById);

// Ruta para agregar un nuevo producto
router.post('/', productsController.addProduct)

// Ruta para modificar/actualizar un producto por su ID
router.put('/:uid', productsController.modifyProduct)

// Ruta para eliminar un producto por su ID
router.delete('/:uid', productsController.deleteProduct)

module.exports = router
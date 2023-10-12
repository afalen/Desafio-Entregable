const {Router} = require('express')
const router = Router()
const cartsController = require('../controllers/carts.controllers')

// Ruta para agregar un nuevo carrito
router.post('/', cartsController.createCart);

// Ruta para mostrar los productos de un carrito especificado por su ID
router.get('/:cid', cartsController.getCartById);

// Ruta para agregar productos a un carrito especificado
router.post('/:cid/product/:pid', cartsController.addProductsInCartById);

// Ruta para eliminar un determinado producto de un carrito
router.delete('/:cid/products/:pid', cartsController.deleteProductInCart)

// Ruta para actualizar/reemplazar los productos de un carrito
router.put('/:cid', cartsController.modifyProductsInCart)

// Ruta para modificar los ejemplares de un producto determinado en un carrito
router.put('/:cid/products/:pid', cartsController.modifyQuantityInProductInCart)

// Ruta para eliminar todos los productos del carrito especificado
router.delete('/:cid', cartsController.deleteProductsInCart)

module.exports = router;
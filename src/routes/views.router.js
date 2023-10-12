const express = require('express')
const router = express.Router()
const viewsController = require('../controllers/views.controllers')

// Vista de productos
router.get('/products', viewsController.getPaginationProducts)

// Vista de un carrito especificado por su ID
router.get('/carts/:cid', viewsController.getCartById)

// Sessions

// Vista de profile del usuario
router.get("/profile", viewsController.getProductsProfile)

// Destruir la session
router.get("/logout", viewsController.logOut)

module.exports = router
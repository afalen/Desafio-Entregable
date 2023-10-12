const viewsService = require('../services/viewsServices')

const getPaginationProducts = async(req, res)=>{
    try {
        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1 

        const result = await viewsService.getPaginationProducts(limit, page)
        //console.log(result)
        res.render('products', result);
    } catch (error) {
        console.error('Error al recuperar productos:', error);
        res.status(500).send('Error al recuperar productos');
    }
}

const getCartById = async(req,res)=>{
    const {cid} = req.params
    let cart = await viewsService.getCartById(cid)
    res.render('carts', cart)
}

const getProductsProfile = async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/api/sessions/login")
    }

    const { first_name, last_name, email, age, role, cart } = req.session.user
    const result = await viewsService.getProductsProfile(first_name, last_name, email, age, role, cart)

    res.render("profile", result)
}

const logOut = async (req, res) => {
    req.session.destroy(err =>{
        if(!err) res.redirect("/api/sessions/login")
        else res.send({status: 'Logout ERROR', body: err})
    })
}

module.exports = {
    getPaginationProducts,
    getCartById,
    getProductsProfile,
    logOut
}
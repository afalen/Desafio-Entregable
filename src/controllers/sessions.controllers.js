const usersService = require('../services/sessionsServices')
const config = require('../config/config')

const renderLogin = async(req,res) =>{
    res.render("login")
}

const renderRegister = async (req, res) => {
    res.render("register")
}

const register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('Faltan datos.');
    }

    res.redirect('/api/sessions/login');
}

const failRegister = async (req, res) => {
    console.log("Falla en autenticacion del register")
    res.send("Error. Ya hay un usuario registrado con esos datos")
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).render("login", { error: "Valores erroneos" });

    const user = await usersService.getUser(email)

    if (!user) {
        if(email === config.adminEmail && password === config.adminPassword){
            req.session.user = {
                email: email,
                role: "admin"
            }
            res.redirect("/profile");
        }else{
            return res.status(400).render("login", { error: "Usuario no encontrado" });
        }
    }else{
        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            cart: user.cart,
            role: user.role
        };

        res.redirect("/profile"); 
    }
}

const failLogin = async(req,res)=>{
    console.log("Falla en autenticacion del login")
    res.send("No estás registrado o ingresaste un password incorrecto")
}

const githubCallback = async(req, res)=>{
    req.session.user = {role: "user", ...req.user._doc}
    res.redirect('/profile')
}

const current = (req, res)=>{
    //console.log(req.session)
    if (!req.session.user) {
        return res.json({status:"error", error:"no está logueado"})
    }
    
    const { first_name, last_name, email, age, role, cart } = req.session.user

    const result = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        role: role,
        cart: cart,
    }
    //console.log(result)
    res.json({status:"está logueado!", payload: result})
}

module.exports = {
    renderLogin,
    renderRegister,
    register,
    failRegister,
    login,
    failLogin,
    githubCallback,
    current
}
const express = require('express')
const router = express.Router()
const passport = require('passport')
const sessionsController = require('../controllers/sessions.controllers')

// Ruta que renderiza el login
router.get("/login", sessionsController.renderLogin)

// Ruta que renderiza el register
router.get("/register", sessionsController.renderRegister)

// Ruta para agregar un nuevo usuario
router.post('/register', passport.authenticate('register',{failureRedirect: '/api/sessions/failregister'}), sessionsController.register);

// Ruta para cuando se detecta un fallo en el registro
router.get("/failregister", sessionsController.failRegister)

// Ruta para logueo del usuario
router.post("/login", passport.authenticate('login',{failureRedirect:'/api/sessions/faillogin'}) , sessionsController.login);

// Ruta para cuando se detecta un fallo en el logueo
router.get('/faillogin', sessionsController.failLogin)

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req,res)=>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), sessionsController.githubCallback)

router.get('/current', sessionsController.current)

module.exports = router
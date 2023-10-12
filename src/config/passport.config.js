const passport = require('passport')
const local = require('passport-local')
const userModel = require('../dao/models/user.model')
const cartModel = require('../dao/models/carts.model')
const { createHash, isValidatePassword } = require('../utils')
const GitHubStrategy = require('passport-github2')
const config = require('./config')


const LocalStrategy = local.Strategy

const initializePassport = () =>{

    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField:'email'},async(req,username,password,done)=>{
        const { first_name,last_name,email,age} = req.body
        try{
            let user = await userModel.findOne({email:username})
            if(user){
                console.log("El usuario ya existe")
                return done(null,false)
            }
            let cartNew = await cartModel.create({})
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart: cartNew._id
            }
            let result = await userModel.create(newUser)
            return done(null,result)
        }catch(error){
            return done("Error al obtener usuario "+ error)
        }
    }))

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async(username, password, done)=>{
        try{
            if(username === config.adminEmail && password === config.adminPassword){
                const adminUser = { _id: 'admin', role: 'admin' };
                return done(null, adminUser);
            }
            
            const user = await userModel.findOne({email:username})
            if(!user){
                console.log("Usuario no encontrado")
                return done(null, false)
            }
            if(!isValidatePassword(user, password)) return done(null,false)
            return done(null, user)
        }catch(error){
            return done(error)
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: config.idClient,
        clientSecret: config.keySecretClient,
        callbackURL: config.callbackUrl
        }, async (accessToken, refreshToken, profile, done)=>{
        try{
            let user = await userModel.findOne({email: profile._json.email})
            if(!user){
                let cartNew = await cartModel.create({})
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password: '',
                    cart: cartNew._id,
                }
        
                let result = await userModel.create(newUser)
                done(null, result)
            }else{
                done(null, user)
            }
        }catch(error){
            return done(error)
        }
    }))

    passport.serializeUser((user, done)=>{
        if(user._id === 'admin'){
            done(null, user._id)
        }else{
            done(null, user._id)
        }
    })
    
    passport.deserializeUser(async (id, done)=>{
        if(id === 'admin'){
            const adminUser = { _id: 'admin', role: 'admin' };
            done(null, adminUser)
        }else{
            let user = await userModel.findById(id)
            done(null, user)
        }
    })

} 

module.exports = initializePassport
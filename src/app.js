const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const path = require('path')
const handlebars = require('express-handlebars')
const passport = require('passport')

const app = express()

// Config
const config = require('./config/config')
const initializePassport = require('./config/passport.config')

// Rutas
const viewsRouter = require('./routes/views.router')
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const sessionRouter = require('./routes/sessions.router')


app.listen(config.port, ()=>{
    console.log(`Server is running on port ${config.port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.use(express.static(path.join(__dirname, "/public")))

const enviroment = async()=>{
    await mongoose.connect(config.mongoUrl)

    console.log("Conectado a la base de datos")
}

enviroment()

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 1000
    }),
    secret: config.keySecret,
    resave: false,
    saveUninitialized: true
}))


initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    keySecret: process.env.KEY_SECRET,
    idClient: process.env.ID_CLIENT,
    keySecretClient: process.env.KEY_SECRET_CLIENT,
    callbackUrl: process.env.CALLBACK_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
}
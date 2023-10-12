const userModel = require('../models/user.model')

class User{
    async getUser(email){
        try{
            let user = await userModel.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1, cart: 1, role: 1})
            return user
        }catch(error){
            console.error(error)
            return null
        }
    }

}

const user = new User()
module.exports = user
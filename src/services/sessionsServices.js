const usersClass = require('../dao/clases/users')

const getUser = (email) =>{
    return usersClass.getUser(email)
}

module.exports = {
    getUser,
}
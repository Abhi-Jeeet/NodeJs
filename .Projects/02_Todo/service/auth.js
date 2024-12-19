const jwt = require("jsonwebtoken")
const secret = "Abhi@abhi#123$321@"

function setUser(user, expiresIn = 30){
    return jwt.sign({
        _id:user._id,
        email: user.email,
    }, secret,{expiresIn})
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secret)
    }
    catch (error){
        return null
    }
}


module.exports = {
    getUser,
    setUser,
}
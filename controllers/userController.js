const { where } = require("sequelize")
const User = require("../models/User")

const bcrypt = require("bcrypt")

const register = async (req,res,next)=>{
    const {username, password} = req.body
    console.log("h1 ", username, password)
    if(!username || !password){
        console.log("if here")
        const err = new Error("username or password are missing")
        err.status = 400
        return next(err)
    }
    const duplicateUser = await User.findAll({where : {userName : username}});
    if(duplicateUser.length>0){
        console.log("h2 " ,duplicateUser)
        const err = new Error("This user already exits")
        err.status = 400
        return next(err)
    }
    //console.log("BACK AFTER ERROR")
    const hashedPassword = await bcrypt.hash(password,10)
    const createdUser = User.create({userName : username, password : hashedPassword})
    return res.status(201).json("User Registered", createdUser)
}

module.exports = register
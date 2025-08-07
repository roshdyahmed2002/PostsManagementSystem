const Sequelize = require("sequelize")
const sequelize = require("../utils/database")

const User = sequelize.define("users",{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    userName : Sequelize.STRING,
    password : Sequelize.STRING 
})

module.exports = User;
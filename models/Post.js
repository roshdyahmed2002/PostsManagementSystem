const Sequelize = require("sequelize")
const sequelize = require("../utils/database");

const Post = sequelize.define("posts",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING
})

module.exports = Post
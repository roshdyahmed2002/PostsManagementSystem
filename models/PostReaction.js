const Sequelize = require("sequelize")
const sequelize = require("../utils/database")

const PostReaction = sequelize.define("postreactions",{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    quantity : Sequelize.INTEGER
})

module.exports = PostReaction;
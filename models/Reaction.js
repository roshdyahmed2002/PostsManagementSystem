const Sequelize = require("sequelize")
const sequelize = require("../utils/database")

const Reaction = sequelize.define("reactions",{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:Sequelize.STRING
})

module.exports = Reaction;
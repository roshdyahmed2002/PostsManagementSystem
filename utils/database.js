const Sequelize = require("sequelize")

const sequelize = new Sequelize("postingsystemsequelize","root","root",{dialect:"mysql", host:"localhost"});

module.exports = sequelize;
const Sequelize = require("sequelize")
const connection = new Sequelize("db_galeria_online","root","Lasanha2805g",{
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection
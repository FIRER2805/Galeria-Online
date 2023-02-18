const Sequelize = require("sequelize")
const connection = require("./connection")

const Comments = connection.define("comments",{
    idComments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idPost: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

Comments.sync({force: false}).then(()=>{console.log("tudo certo na tabela comments!")})

module.exports = Comments
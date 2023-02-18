const Sequelize = require("sequelize")
const connection = require("./connection")

const Posts = connection.define("posts",{
    idPost: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imagePath: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

Posts.sync({force: false}).then(()=>{console.log("tudo certo com a tabela posts")})

module.exports = Posts
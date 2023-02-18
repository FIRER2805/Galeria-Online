const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")
const connection = require("./database/connection")
const Posts = require("./database/Posts")
const Comments = require("./database/Comments")
const bodyParser = require("body-parser")

const porta = 8080
const uploadsFolder = "public/uploads"
const uploadsPath = "/uploads/"

let fileName = ""

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection.authenticate().then(()=>{
    console.log("conectado ao banco de dados com sucesso!")
}).catch(error=>{
    console.log(error)
})

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,uploadsFolder)
    },
    filename: (req, file, cb)=>{
        fileName = file.originalname + Date.now() + path.extname(file.originalname)
        cb(null, fileName)
    }
})

const upload = multer({storage})

app.get("/",(req, res)=>{
    Posts.findAll({
        order: [["idPost","desc"]]
    }).then(posts=>{
        res.render("index", {posts: posts})
    })
})

app.get("/post", (req, res) =>{
    res.render("post")
})

app.post("/upload",upload.single("file"),(req, res)=>{
    Posts.create({
        imagePath: uploadsPath + fileName
    }).then(()=>{
        res.redirect("/")
    })
})

app.get("/postPage/:post",(req, res)=>{
    const id = req.params.post
    Posts.findOne({
        where:{idPost: id}
    }).then(post=>{
        Comments.findAll({
            where:{idPost: id},
            order:[["idComments","desc"]]
        }).then(comments=>{
            res.render("postPage",{
                post: post,
                comments: comments
            })
        })
    })
})

app.post("/comment",(req, res)=>{
    let idPost = req.body.idPost
    let comment = req.body.comment
    Comments.create({
        comment: comment,
        idPost: idPost
    }).then(()=>{
        res.redirect("/postPage/" + idPost)
    })
})

app.listen(porta,(erro)=>{
    if(!erro)
    {
        console.log("Aplicação rodando na url: localhost:" + porta)
    }
    else
    {
        console.log("Erro ao iniciar o servidor")
    }
})
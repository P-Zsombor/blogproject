const express = require("express")
const dbHandler = require("./dbHandler")
require("dotenv").config()

const server = express()
server.use(express.json())
server.use(express.static("public"))

const PORT = process.env.PORT

const JWT = require("jsonwebtoken")

dbHandler.handler.sync({ alter: true })

function Auth(){
    return(req, res, next) => {
        const auth = req.headers.authorization
        if(auth.split(" ")[0] != "Bearer"){
            return res.json({"message":"Token is wrong or does not exist"})
        }
        else{
            const encToken = auth.split(" ")[1]
            try {
                const token = JWT.verify(encToken, process.env.SECRETKEY)
                req.username = token.username,
                req.password = token.password,
                req.admin = token.admin
                next()
            } catch (error) {
                res.json({"message":error})
            }
        }
    }
}

server.post("/register", async (req, res) => {
    const user = await dbHandler.tables.Users.findOne({
        where:{
            username: req.body.regUsername
        }
    })
    if(user){
        res.json({"message":"A user with this username already exists"})
    }
    else{
        await dbHandler.tables.Users.create({
            username: req.body.regUsername,
            password: req.body.regPassword
        })
        res.json({"message":"Successful registration"})
    }
})

server.post("/login", async (req, res) => {
    const user = await dbHandler.tables.Users.findOne({
        where:{
            username: req.body.logUsername,
            password: req.body.logPassword
        }
    })
    if(user){
        const token = JWT.sign({"username": user.username, "password": user.password, "admin": user.admin}, process.env.SECRETKEY, {expiresIn: "6h"})
        res.json({"token": token, "message":"Successful login"})
    }
    else{
        res.status(400).json({"message":"Wrong username or password"})
    }
})

server.post("/addpost", Auth(), async (req, res) => {
    await dbHandler.tables.Posts.create({
        uploader: req.username,
        content: req.body.postContent
    })
    res.json({"message":"Post created successfully"})
})

server.get("/getposts", async (req, res) => {
    res.json(await dbHandler.tables.Posts.findAll())
})

server.delete("/deletepost", Auth(), async (req, res) => {
    const post = await dbHandler.tables.Posts.findOne({
        where:{
            postId: req.body.postId
        }
    })
    if(post){
        await dbHandler.tables.Posts.destroy({
            where:{
                postId: req.body.postId
            }
        })
        res.json({"message":"Post deleted successfully"})
    }
    else{
        res.status(400).json({"message":"Post not found"})
    }
})

server.post("/addreport", Auth(), async (req, res) => {
    const post = await dbHandler.tables.Posts.findOne({
        where:{
            postId: req.body.postId
        }
    })
    if(post){
        dbHandler.tables.Reports.create({
            postId: req.body.postId,
            content: req.body.repContent
        })
        res.json({"message":"Report added successfully"})
    }
    else{
        res.status(400).json({"message":"Post not found"})
    }
})

server.delete("/deletereport", Auth(), async (req, res) =>{
    const report = await dbHandler.tables.Reports.findOne({
        where:{
            postId: req.body.postId
        }
    })
    if(report){
        dbHandler.tables.Reports.destroy({
            where:{
                postId: req.body.postId
            }
        })
        res.json({"message":"Reports successfully deleted"})
    }
    else{
        res.status(400).json({"message":"No reports for that post were found"})
    }
})


/*server.get("/users", async (res) => {
    res.json(await dbHandler.tables.Users.findAll())
})*/

server.listen(PORT, () => {console.log("The server is listening on port " + PORT)})

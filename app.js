const express = require("express")
const app = express()
const server = require("http").createServer(app)
const dotenv = require("dotenv")
dotenv.config()
const {APP_PORT} = process.env
const expressEjsLayouts = require("express-ejs-layouts")
const { AllRoutes } = require("./routers/router")
const { elasticClient } = require("./config/elastic.config")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(expressEjsLayouts)
app.set("views","views")
app.set("layout","./layouts/master")
app.use(AllRoutes)

app.use((req,res)=>{
    
        return res.status(404).json({
            stautsCode : 404,
            type:"NotFound",
            message : "NotFound" + req.url
        })
  
})
   
app.use((err,req,res,next)=>{

        return res.status(err.status || 500).json({
            stautsCode : err.status || 500,
            message : err.message || "Interal server error"
        })
})

server.listen(APP_PORT,()=>{
    console.log(`Server is running on http://localhost:${APP_PORT}`);
})

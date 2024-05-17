const { BlogRoutes } = require("./blog.routes")
const { IndicesRoutes } = require("./indices.routes")

const router = require("express").Router()

router.get("/",(req,res)=>{
    return res.render("pages/index.ejs")
})

router.use("/indices",IndicesRoutes)
router.use("/blogs",BlogRoutes)

module.exports = {
    AllRoutes : router
}
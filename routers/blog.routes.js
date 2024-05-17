const { createNewBlog, getAllBlogs, removeBlog, updateBlog2, findBlogMulti, multiFieldSearch, } = require("../controller/blog.controller")

const router = require("express").Router()


router.post("/create", createNewBlog)
router.get("/list/:value?", getAllBlogs)
router.delete("/delete/:id",removeBlog)
// router.patch("/edit/:id",updateBlog)
router.patch("/edit/:id",updateBlog2)
router.get("/find",findBlogMulti)
router.get("/multi",multiFieldSearch)

module.exports = {
    BlogRoutes : router
}

const { createNewIndice, getAllIndices, removeIndice } = require("../controller/indices.controller")

const router = require("express").Router()


router.post("/", createNewIndice)
router.get("/", getAllIndices)
router.delete("/:indexName",removeIndice)
module.exports = {
    IndicesRoutes : router
}
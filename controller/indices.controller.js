const createHttpError = require("http-errors");
const { elasticClient } = require("../config/elastic.config");

async function getAllIndices(req, res, next) {
  try {
    const allIndices = await elasticClient.indices.getAlias()
    return res.status(200).json({
        statusCode : 200,
        data:{
            indices:Object.keys(allIndices)
        }
    })
  } catch (error) {
    next(error);
  }
}

async function createNewIndice(req, res, next) {
  try {
    const { indexName } = req.body;
    if (!indexName) throw createHttpError.BadRequest("Index Name required");
    const result = await elasticClient.indices.create({
      index: indexName,
    });
    return res.status(201).json({
        statusCode: 201,
        data:{
            result
        }
    })
  } catch (error) {
    next(error);
  }
}
async function removeIndice(req, res, next) {
  try {
    const {indexName} = req.params
   
    const removeResult = await elasticClient.indices.delete({index:indexName})
    return res.status(200).json({
      statusCode: 200,
      data:{
        removeResult
      }
    })
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createNewIndice,
  getAllIndices,
  removeIndice,
};

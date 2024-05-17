const { json } = require("express");
const { elasticClient } = require("../config/elastic.config");
const indexBlog = "blog";

async function getAllBlogs(req, res, next) {
  try {
    const value = req.params.value;
    const blogs = await elasticClient.search({
      index: indexBlog,
      q: value,
    });

    return res.json(blogs.hits.hits);
  } catch (error) {
    next(error);
  }
}

async function createNewBlog(req, res, next) {
  try {
    const { title, author, text } = req.body;
    const result = await elasticClient.index({
      index: indexBlog,
      document: {
        title,
        author,
        text,
      },
    });
    return res.status(201).json({
      statusCode: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
}
async function removeBlog(req, res, next) {
  try {
    const { id } = req.params;
    const deleteResult = await elasticClient.deleteByQuery({
      index: indexBlog,
      query: {
        match: {
          _id: id,
        },
      },
    });
    return res.json(deleteResult);
  } catch (error) {
    next(error);
  }
}
async function updateBlog(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    Object.keys(data).map((key) => {
      if (!data[key]) delete data[key];
    });
    const blog =
      (
        await elasticClient.search({
          index: indexBlog,
          query: {
            match: {
              _id: id,
            },
          },
        })
      ).hits.hits[0] || {};
    const paylod = blog._source;
    const updateBlog = await elasticClient.index({
      index: indexBlog,
      id,
      body: { ...paylod, ...data },
    });
    return res.json(updateBlog);
  } catch (error) {
    next(error);
  }
}
async function updateBlog2(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    // Object.keys(data).map((key) => {
    //   if (!data[key]) delete data[key];
    // });
    const updateBlog = await elasticClient.update({
      index: indexBlog,
      id,
      doc: data,
    });
    return res.json(updateBlog);
  } catch (error) {
    next(error);
  }
}
async function findBlogMulti(req, res, next) {
  try {
    const {search} = req.query
    console.log(search);
    const result = await elasticClient.search({
        index : indexBlog,
        query:{
            bool:{
                should:[
                    {regexp:{title:`.*${search}.*`}},
                    {regexp:{author:`.*${search}.*`}},
                    {regexp:{text:`.*${search}.*`}},
                ]
            }
        }
    })
   
    return res.json(result.hits.hits)
  } catch (error) {
    next(error);
  }
}

async function multiFieldSearch(req,res,next){
    try{
        const {search} = req.query
        const result = await elasticClient.search({
            index: indexBlog,
            query:{
                multi_match:{
                    query: search,
                    fields:['title','text']
                }
            }
        })
        return res.json(result)
    }catch(error){
        next(error)
    }
}

module.exports = {
  createNewBlog,
  getAllBlogs,
  removeBlog,
  updateBlog,
  updateBlog2,
  findBlogMulti,
  multiFieldSearch
};

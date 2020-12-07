const express = require('express')
const router = express.Router()
const Model = require ('../models/post')

/**
 * @api {post} / Create a new blog post
 * @apiName CreatePost
 * @apiGroup Manage Blog Posts
 * @apiVersion 0.1.0
 
 * @apiSampleRequest /posts/
 * @apiSuccess 200 Success - Default Payload
 * @apiSuccessExample
 */

 router.post('/', async (req, res) => {
    const newModel = new Model(req.body);
    try {
        const savedModel = await newModel.save();
        res.status(201).json(savedModel)
    } catch (error) {
        res.status(400).json({ error: error })
    }

 });

/**
 * @api {get} /:id Blog post by id
 * @apiName GetPost
 * @apiGroup Manage Blog Posts
 * @apiVersion 0.1.0
 
 * @apiSampleRequest /posts/5fcd350fdfe163c8b2c5cd9b
 * @apiSuccess 200 Success - Default Payload
 * @apiSuccessExample
 */

 router.get('/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id).lean();
        if (data) {
            return res.status(200).json({ data });
        }
        else {
            return res.status(200).json({
                "inputs": {
                    "query": req.query,
                    "params": req.params,
                    "notfound": req.params.id,
                    "message": `No post exists with id ${req.params.username}`
                }
            });

        }
    }

    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/**
 * @api {get} /by/author/:id Blog post by id
 * @apiName GetPostByAuthor
 * @apiGroup Manage Blog Posts
 * @apiVersion 0.1.0
 
 * @apiSampleRequest /by/author/5fcce2097838c4acd66ac06e
 * @apiSuccess 200 Success - Default Payload
 * @apiSuccessExample
 */





 module.exports = router;
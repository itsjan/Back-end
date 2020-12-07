const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// GET /products
router.get('/', async (req, res) => {

    var filteredQuery = {}, acceptableFields = ['category'];

    // conditional query built based on URL query
    // concept from https://stackoverflow.com/questions/19693029/how-to-build-a-conditional-query-in-mongoose/19693726
    acceptableFields.forEach(function (field) {
        if ( req.query[field] ) filteredQuery[field] = req.query[field];
    });

    var query = Product.find(filteredQuery);

    try {
        const products = await query.exec();
        res.status(200).json({ "query": req.query, "data": products })
    } catch (error) {
        res.status(500).json({ "errors": { "message": error.message } })
    }
})


// GET products/:id
router.get('/:id', async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.status(200).json({ "data": products })
    } catch (error) {
        res.status(500).json({ "errors": { "message": error.message } })
    }
})


module.exports = router;

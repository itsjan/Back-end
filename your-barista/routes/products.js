const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// Get

router.get('/', async (req, res) => {

    var filteredQuery = {}, acceptableFields = ['category'];

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


// Get one

router.get('/:id', async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.status(200).json({ "data": products })
    } catch (error) {
        res.status(500).json({ "errors": { "message": error.message } })
    }
})


module.exports = router;

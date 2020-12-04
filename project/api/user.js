const express = require ('express');
const router = express.Router();
const Model = require('../models/user');

// Get All

router.get('/', async (req, res) => {
    try {
        const data = await Model.find().lean({ virtuals: true });
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})   
    }
})

// CREATE

router.post('/', async (req, res) => {
    console.log(req.body)
    
    const newModel = new Model(req.body);
    try {
        const savedModel = await newModel.save()
        res.status(201).json(savedModel)
    } catch (error) {
        res.status(400).json({error: error})        
    }
    

})

// FIND ONE
router.get('/:handle')


module.exports = router
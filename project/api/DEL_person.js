const express = require ('express');
const { collection } = require('../models/person');
const router = express.Router();
const Person = require('../models/person');


// Get All

router.get('/', async (req, res) => {
    try {
        const persons = await Person.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})   
    }
})

// CREATE
// https://stackoverflow.com/questions/27315849/mongoose-save-all-parameters-from-request-body
// You can pass the req.body to your Car like this
// var car = new Car(req.body);


router.post('/', async (req, res) => {
    console.log(req.body)
    
    const newPerson = new Person(req.body);
    try {
        const savedPerson = await newPerson.save()
        res.status(201).json(savedPerson)
    } catch (error) {
        res.status(400).json({error: error.message})        
    }
    

})



module.exports = router
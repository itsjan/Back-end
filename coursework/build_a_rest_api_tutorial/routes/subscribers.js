const express = require('express')
const { update } = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// Get all

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find() 
        res.json(subscribers)

    } catch (error) {
        res.status(500).json({ message : error.message})
    }

})

// Get one

router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
    
})



// Create

router.post('/', async (req, res) => {
    const newSubscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const savedSubscriber = await newSubscriber.save()
        res.status(201).json(savedSubscriber)
    } catch (error) {
        res.status(400).json({error: error.message})        
    }

})

// Update

router.patch('/:id', getSubscriber, async (req, res) => {

    console.log(res.subscriber)
    console.log(req.body)
    if (req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    } 

    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }

})

// Delete

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.status(200).json({message:'Subscriber deleted'})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

})

async function getSubscriber(req, res, next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if ( subscriber == null) {
            return res.status(404).json({message : 'Cannot find subscriber'})

        }

    } catch (error) {
        return res.status(500).json({ message: error.message})
        
    }
    res.subscriber = subscriber
    next()
}





module.exports = router
const express = require('express');
const router = express.Router();
const Membership = require('../models/membership');

// POST /membership
router.post('/', async(req, res) => {
    try {
        const newMemberhsip = new Membership(req.body);
        const savedMembership = await newMemberhsip.save();
        res.status(200).json({"data" : savedMembership});

    } catch (error) {
        res.status(500).json({ "errors": { "message": error.message } })
    }
})

// GET memberships/:id
router.get('/:id', async (req, res) => {
    try {
        const memberships = await Membership.findById(req.params.id);
        res.status(200).json({ "data": memberships })
    } catch (error) {
        res.status(500).json({ "errors": { "message": error.message } })
    }
})



module.exports = router;
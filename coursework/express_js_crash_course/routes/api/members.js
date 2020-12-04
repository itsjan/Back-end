const express = require('express');
const router = express.Router();

const members = require('../../data/members')


// Get Members

router.get('/', (req, res) => {
    res.json(members);
});

// Get single member

router.get('/:id', (req, res) => {
    // some() returns true/false
    const exists = members.some(m => m.id === parseInt(req.params.id))
    exists ?
        res.json(members.filter(member => member.id === parseInt(req.params.id))) :
        res.status(400).json({message: ` Member with ID#${req.params.id} does not exist in the database`}
        );
});


module.exports = router
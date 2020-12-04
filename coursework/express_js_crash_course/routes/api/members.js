const express = require('express');
const router = express.Router();
const uuid = require('uuid')

const members = require('../../data/members')


// Get Members

router.get('/', (req, res) => {
    res.json(members);
});

// Get single member

router.get('/:id', (req, res) => {
    // some() returns true/false
    const exists = members.some(m => m.id === req.params.id)
    if (exists) {
        res.json(members.filter(member => member.id === req.params.id)) ;
    } else {
        res.status(400).json({ message: ` Member with ID#${req.params.id} does not exist in the database` });
    }
});


// Create a member

router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ "message": "Please include a name and email" })
    }

    // using return above, to avoid using else below
    members.push(newMember); // push to the members array
    res.json(newMember);

})


// Update member

router.put('/:id', (req, res) => {
    // some() returns true/false
    const exists = members.some(m => m.id === req.params.id)

    if (exists) {
        const updMember = req.body;
        members.forEach(m => {
            if (m.id === req.params.id) {
                m.name = updMember.name ? updMember.name : m.name;
                m.email = updMember.email ? updMember.email : m.email;
                return res.status(202).json({"message" : "Member updated", "member":m})
                    ;
            }
        })

    } else {
        res.status(400).json({ message: ` Member with ID#${req.params.id} does not exist in the database` });
    }


});




module.exports = router
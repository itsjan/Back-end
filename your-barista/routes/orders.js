const express = require('express');
const router = express.Router();
const Order = require('../models/order')
const Membership = require('../models/membership')
const Redemption = require('../models/redemption').Redemption;//
const membership = require('../models/membership');

// POST /orders
router.post('/', async(req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json({"data" : savedOrder});
        
    } catch (error) {
        res.status(500).json({ "errors": { "message": error.message } })
        
    }    
})

// GET /:id
router.get('/:id', async (req, res) => {
    try {
        Order.findById(req.params.id)
        .then(o => {
            res.status(200).json(o);
        })
    } catch (error) {
        
    }
})

router.post('/:id/redemption', async (req, res) => {
    
    
    try {
        const order_id = req.params.id;
        const membership_id = req.body.membership_id;
        const qr_code_value = req.body.qr_code_value;
        console.log({order_id,membership_id,qr_code_value })

        if (!order_id || !membership_id || !qr_code_value) {
            return res.status(400).json({  "inputs": {
                    "query": req.query,
                    "params": req.params,
                    "body": req.body
                },
                "message" : `Required data is missing in the request body`,
             
                
            })
        }


        
        // Validate membership
        Membership.findOne({ "_id" : membership_id, qr_code_value})
            .populate({path:'redemptions'})
            .then ((membership) => {
                if (membership.can_redeem)
                {
                    const redemption = new Redemption();
                    redemption.order_id = order_id
                    redemption.save()
                        //.then((redemption) => {
                            membership.redemptions.push(redemption);
                            membership.save()

                            //console.log("pitää päivittää vielä tilaus")
                            console.log({redemption}); 
                        //})

                    Order.findById(order_id)
                        .then( order => {                        
                            console.log({order})
                            order.redemption = redemption;
                            order.redeemed_by_member_name  = membership.member_name;
                            order.redeemed_by_membership_id = membership_id;
                            
                            order.save();
                            console.log(order);
                        })

                    return res.status(200).json({"kohta":"SUCCESS"})

                } else { // member not allowed to redeem a drink at this time
                    return res.status(200).json({message : "Member is not allowed to redeem a drink"});
                }
            })
            
            
    } catch {
    }
});

module.exports = router;
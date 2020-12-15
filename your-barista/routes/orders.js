const express = require('express');
const router = express.Router();
const Order = require('../models/order')
const Membership = require('../models/membership')
const Redemption = require('../models/redemption').Redemption;//
const membership = require('../models/membership');

// POST /orders
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json({ "data": savedOrder });

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
    console.log("REDEMPTION");
    try {
        const order_id = req.params.id;
        //const membership_id = req.body.membership_id;
        const qr_code_value = req.body.qr_code_value;
        console.log({ order_id, qr_code_value })

        if (!order_id ||
            //membership_id ||
            !qr_code_value) {
            return res.status(400).json({
                "inputs": {
                    "query": req.query,
                    "params": req.params,
                    "body": req.body
                },
                "message": `Required data is missing in the request body`,


            })
        }

        //Validate order

        Order.findById(order_id)
            .then(order => {
                console.log({ message: "ORDER FOUND", order })

                if (order.is_redeemed) {
                    return res.status(409).json({ message: "Order is already redeemed and cannot be redeemed more times!" })
                } else {
                    Membership.findOne({ //"_id" : membership_id, 
                        qr_code_value
                    })
                        .populate({ path: 'redemptions' })
                        .then((membership) => {
                            console.log({ TEST: "ONKO TÄSSÄ ORDER", order })
                            if (membership.can_redeem) {
                                const redemption = new Redemption();
                                redemption.order_id = order_id
                                redemption.save()
                                //.then((redemption) => {
                                membership.redemptions.push(redemption);
                                membership.save()

                                console.log({ redemption });
                                //})

                                Order.findById(order_id)
                                    .then(order => {
                                        console.log({ order })

                                        if (order.redemptions) {
                                            return res.status(409).json({ message: "Order is already redeemed and cannot be redeemed more times." })
                                        }

                                        order.redemption = redemption;
                                        order.redeemed_by_member_name = membership.member_name;
                                        order.redeemed_by_membership_id = membership._id; //membership_id;

                                        order.save()
                                            .then(order => {
                                                return res.status(200).json({ message: "Order successfully redeemed", order })
                                            })                                   
                                    })

                            } else { // member not allowed to redeem a drink at this time
                                return res.status(403).json({ message: "Member is not allowed to redeem a drink at this time. Only 1 drink is allowed every 30 minutes, and up to 5 times per day. Please try again later.", membership });
                            }
                        })
                }

            })









    } catch (error) {
        return res.status(500).json({ message: "INTERNAL ERROR", error })
    }
});

module.exports = router;
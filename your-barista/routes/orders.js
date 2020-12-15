const express = require('express');
const router = express.Router();
const Order = require('../models/order')
const Membership = require('../models/membership')
const Redemption = require('../models/redemption').Redemption;//
const membership = require('../models/membership');

// Create a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json({ "data": savedOrder });

    } catch (error) {
        res.status(500).json({ "errors": { "message": error.message } })

    }
})

// Get order details
router.get('/:id', async (req, res) => {
    try {
        Order.findById(req.params.id)
            .then(o => {
                res.status(200).json(o);
            })
    } catch (error) {

    }
})

// Redeem drink order
router.get('/:id/redemption/:by_membership_qr_code', async (req, res) => {
    try {
        const order_id = req.params.id;
        const qr_code_value = req.params.by_membership_qr_code;

        Order.findById(order_id)
            .then(order => {
                if (order.is_redeemed) {
                    return res.status(409).json({ message: "Order is already redeemed and cannot be redeemed more times!" })
                }

                Membership.findOne({ qr_code_value })
                    .populate({ path: 'redemptions' })
                    .then((membership) => {
                        if (!membership.can_redeem) {
                            return res.status(403).json({
                                message: "Member is not allowed to redeem a drink at this time. Only 1 drink is allowed every 30 minutes, and up to 5 times per day. Please try again later.",
                                "member_name": membership["member_name"],
                                "valid_until": membership["valid_until"],
                                "is_valid": membership["is_valid"],
                                "number_of_redemptions_today": membership["number_of_redemptions_today"],
                                "minutes_since_last_redemption": membership["minutes_since_last_redemption"],
                                "can_redeem": membership["can_redeem"]
                            });
                        }

                        const redemption = new Redemption({ order_id });
                        redemption.save();
                        membership.redemptions.push(redemption);
                        membership.save()

                        Order.findById(order_id)
                            .then(order => {
                                if (order.redemptions) {
                                    return res.status(409).json({ message: "Order is already redeemed and cannot be redeemed more times." })
                                }

                                order.redemption = redemption;
                                order.redeemed_by_member_name = membership.member_name;
                                order.redeemed_by_membership_id = membership._id;
                                order.save()
                                    .then(order => {
                                        return res.status(200).json({ message: "Order successfully redeemed", order })
                                    })
                            });
                    });
            })
    } catch (error) {
        return res.status(500).json({ message: "INTERNAL ERROR", error })
    }
});

module.exports = router;
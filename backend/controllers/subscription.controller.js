const subscriptionController = {};
const User = require('../models/User');
const Plans = require('../models/Plans');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const client_url = process.env.CLIENT_URL;

subscriptionController.listPlans = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findById(uid);
        if (!user) {
            res.status(404).json({
                status: 'User not found'
            });
        }
        else {
            const plans = await Plans.find();
            res.status(200).json({
                plans: plans
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'Internal server error'
        });
    }
}

subscriptionController.upgradePlan = async (req, res) => {
    try {
        const { uid } = req.body;
        const user = await User.findById(uid);
        
        if (!user) {
            return res.status(404).json({
                status: 'User not found'
            });
        } else {
            if (!req.body.session_id && !req.body.plan_id) {
                const { plan } = req.body;
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    billing_address_collection: 'auto',
                    mode: "subscription",
                    customer_email: user.email,
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: plan.name
                                },
                                unit_amount: plan.price * 100,
                                recurring: {
                                    interval: 'month'
                                }
                            },
                            quantity: 1
                        }
                    ],
                    success_url: `${client_url}/subscription/${uid}?status=success&session_id={CHECKOUT_SESSION_ID}&plan_id=${plan._id}`,
                    cancel_url: `${client_url}/subscription/${uid}?status=cancelled`
                });
                if (!!session.url) {
                    res.status(200).json({
                        status: 'Session created',
                        sessionId: session.id,
                        url: session.url
                    });
                } else {
                    res.status(500).json({
                        status: 'Internal server error'
                    });
                }
            } else {
                const { session_id, plan_id } = req.body;
                const session = await stripe.checkout.sessions.retrieve(session_id);
                if (session.payment_status === 'paid') {
                    user.subscription.status = 'active';
                    user.subscription.plan_id = plan_id;
                    await user.save();
                    res.status(200).json({
                        status: 'Subscription created'
                    });
                } else {
                    res.status(500).json({
                        status: 'Internal server error'
                    });
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Internal server error'
        });
    }
};

module.exports = subscriptionController;
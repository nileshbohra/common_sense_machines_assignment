const router = require('express').Router();
const subscriptionController = require('../controllers/subscription.controller');

router.get('/:uid', subscriptionController.listPlans);
router.post('/:uid/upgrade', subscriptionController.upgradePlan);

module.exports = router;
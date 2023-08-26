const Plans = require('../../models/Plans');

const startupPlans = () => {
    Plans.find({}).then(async (plans) => {
        if (plans.length) return;

        const freePlan = new Plans({
            name: 'Free',
            stripeId: 'free',
            price: 0,
            description: 'Free plan',
            features: ['1 upload per hour', 'Unlimited downloads', 'Unlimited storage', 'Unlimited bandwidth']
        });

        const proPlan = new Plans({
            name: 'Pro',
            stripeId: 'pro',
            price: 5,
            description: 'Pro plan',
            features: ['Unlimited uploads', 'Unlimited downloads', 'Unlimited storage', 'Unlimited bandwidth']
        });

        await freePlan.save();
        await proPlan.save();

        console.log('Plans created');
    });
}

module.exports = startupPlans;
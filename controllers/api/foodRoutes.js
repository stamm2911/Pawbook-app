const router = require('express').Router();
const { Food, Users } = require('../../models');
//Get all Food
router.get('/', async (req, res) => {
    try {
        const dbFoodData = await Food.findAll({
            order: [['date', 'DESC']],
            where: {
                taken: false,
            },
            attributes: {
                exclude: ['user_id'],
            },
            include: [
                {
                    model: Users,
                    attributes: ['name'],
                },
            ],
        });
        res.status(200).json(dbFoodData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//Post type of Food donation
router.post('/', async (req, res) => {
    try {
        const foodDonation = await Food.create(req.body);
        res.status(200).json(foodDonation);
    } catch (err) {
        res.status(400).json(err);
    }
});
// UPDATE a new donation
router.put('/:id', async (req, res) => {
    try {
        const dbFoodData = await Food.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!dbFoodData[0]) {
            res.status(400).json({ message: 'No food donation with this id!' });
            return;
        };
        res.status(200).json(dbFoodData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;
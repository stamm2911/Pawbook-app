const router = require('express').Router();
const { Food, Users } = require('../../models');
//Get all Food
router.get('/', async (req, res) => {
    // try {
    //     const dbFoodData = await Food.findAll({
    //         order: [['date', 'DESC']],
    //         where: {
    //             taken: false,
    //         },
    //         attributes: {
    //             exclude: ['user_id'],
    //         },
    //         include: [
    //             {
    //                 model: Users,
    //                 attributes: ['name'],
    //             },
    //         ],
    //     });
    //     res.status(200).json(dbFoodData);
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json(err);
    // }
});
//Post type of Food donation
router.post('/', async (req, res) => {
    try {
        const body = req.body
        body.user_id = req.session.userId;
        console.log('bodywwww',body)
        const foodDonation = await Food.create(body);
        res.status(200).json(foodDonation);
    } catch (err) {
        res.status(405).json(err);
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
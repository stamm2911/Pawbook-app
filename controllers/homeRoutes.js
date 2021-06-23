const router = require('express').Router();
const { Adoption, Users, Lost_Animal } = require('../models');
const homeArray = [];

router.get('/', async (req, res) => {
  try {
    // adoptions array
    const dbAdoptionData = await Adoption.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: [
        'id',
        'location',
        'description',
        'adopted',
        'photo',
        ['updated_at', 'date'],
      ],
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });
    const AdoptionData = dbAdoptionData.map((adoption) =>
      adoption.get({ plain: true })
    );
    AdoptionData.forEach((adoption) => {
      homeArray.push(adoption);
    });

    //lost_animals array
    const dbLost_AnimalData = await Lost_Animal.findAll({
      order: [['date', 'DESC']],
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
    const Lost_AnimalData = dbLost_AnimalData.map((aniaml) =>
      aniaml.get({ plain: true })
    );
    Lost_AnimalData.forEach((aniaml) => {
      homeArray.push(aniaml);
    });

    // Sort homeArray by date
    homeArray.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    res.status(200).send(homeArray);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

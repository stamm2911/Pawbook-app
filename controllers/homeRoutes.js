const router = require('express').Router();
const { Adoption, Users, Lost_Animal, Food } = require('../models');
const homeArray = [];

router.get('/', async (req, res) => {
  try {
    // adoptions array
    const dbAdoptionData = await Adoption.findAll({
      order: [['updatedAt', 'DESC']],
      where: {
        adopted: false,
      },
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
      where: {
        found: false,
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

    // res.status(200).send(homeArray);
    res.render('signup-in');
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/adopt', async (req, res) => {
  try {
    const dbAdoptionData = await Adoption.findAll({
      order: [['updatedAt', 'DESC']],
      where: {
        adopted: false,
      },
      attributes: {
        exclude: ['user_id', 'createdAt']
      },  
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
    // res.status(200).json(AdoptionData);
    res.render('adopt',{AdoptionData});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.get('/lostanimal', async (req, res) => {
  try {
    const dbLost_AnimalData = await Lost_Animal.findAll({
      order: [['date', 'DESC']],
      where: {
        found: false,
      },
      attributes: {
        exclude: ['user_id']
      }, 
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });
    const Lost_AnimalData = dbLost_AnimalData.map((animal) =>
      animal.get({ plain: true })
    );
    // res.status(200).json(dbLost_AnimalData);
    res.render('lostAnimal', {Lost_AnimalData});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/food', async (req, res) => {
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
    const FoodData = dbFoodData.map((food) =>
    food.get({ plain: true })
    );
    // res.status(200).json(dbFoodData);
    res.render('food', {FoodData});
} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});

router.get('/profile', async (req, res) => {
  res.render('profile');
});

router.get('/signup', async (req, res) => {
  res.render('signUp');
});

router.get('/new', async (req, res) => {
  res.render('new');
});

router.get('/newfood', async (req, res) => {
  res.render('newFood');
});

router.get('/newadoption', async (req, res) => {
  res.render('newAdoption');
});

router.get('/newanimal', async (req, res) => {
  res.render('newAnimal');
});

module.exports = router;
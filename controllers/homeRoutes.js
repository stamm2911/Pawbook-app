const router = require('express').Router();
const { Adoption, Users, Lost_Animal, Food } = require('../models');
const homeArray = [];

// ------------------------------------------------------ GET LOGIN ---------------------------------------------
router.get('/login', async (req, res) => {
  res.render('signup-in');
});

// ------------------------------------------------------ SIGN UP ---------------------------------------------
router.get('/signup', async (req, res) => {
  res.render('signUp');
});

// ------------------------------------------------------ HOME ROUTE ---------------------------------------------
router.get('/', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.redirect('/adopt');
  }

  // ------------- HOME FEED NOT APPLIED FUNCTIONALITY -------------
  // try {
  //   // adoptions array
  //   const dbAdoptionData = await Adoption.findAll({
  //     order: [['updatedAt', 'DESC']],
  //     where: {
  //       adopted: false,
  //     },
  //     attributes: [
  //       'id',
  //       'location',
  //       'description',
  //       'adopted',
  //       'photo',
  //       ['updated_at', 'date'],
  //     ],
  //     include: [
  //       {
  //         model: Users,
  //         attributes: ['name'],
  //       },
  //     ],
  //   });
  //   const AdoptionData = dbAdoptionData.map((adoption) =>
  //     adoption.get({ plain: true })
  //   );
  //   AdoptionData.forEach((adoption) => {
  //     homeArray.push(adoption);
  //   });

  //   //lost_animals array
  //   const dbLost_AnimalData = await Lost_Animal.findAll({
  //     order: [['date', 'DESC']],
  //     where: {
  //       found: false,
  //     },
  //     attributes: {
  //       exclude: ['user_id'],
  //     },
  //     include: [
  //       {
  //         model: Users,
  //         attributes: ['name'],
  //       },
  //     ],
  //   });
  //   const Lost_AnimalData = dbLost_AnimalData.map((aniaml) =>
  //     aniaml.get({ plain: true })
  //   );
  //   Lost_AnimalData.forEach((aniaml) => {
  //     homeArray.push(aniaml);
  //   });

  //   // Sort homeArray by date
  //   homeArray.sort((a, b) => {
  //     return new Date(b.date) - new Date(a.date);
  //   });

  //   res.status(200).send(homeArray);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

// ------------------------------------------------------ ADOPT ---------------------------------------------
router.get('/adopt', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    try {
      const dbAdoptionData = await Adoption.findAll({
        order: [['updatedAt', 'DESC']],
        where: {
          adopted: false,
        },
        attributes: {
          exclude: ['user_id', 'createdAt'],
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
      res.render('adopt', { AdoptionData });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// ------------------------------------------------------ LOST_ANIMAL ----------------------------------------
router.get('/lostanimal', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    try {
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
      const Lost_AnimalData = dbLost_AnimalData.map((animal) =>
        animal.get({ plain: true })
      );
      // res.status(200).json(dbLost_AnimalData);
      res.render('lostAnimal', { Lost_AnimalData });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// ------------------------------------------------------ FOOD ---------------------------------------------
router.get('/food', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
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
      const FoodData = dbFoodData.map((food) => food.get({ plain: true }));
      // res.status(200).json(dbFoodData);
      res.render('food', { FoodData });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// ------------------------------------------------------ NEW ---------------------------------------------
router.get('/new', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.render('new');
  }
});

// ------------------------------------------------------ NEW FOOD ---------------------------------------------
router.get('/newfood', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.render('newFood');
  }
});

// ------------------------------------------------------ NEW ANIMAL PHOTO -------------------------------------------
router.get('/newanimalphoto', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.render('newAnimalPhoto');
  }
});

// ------------------------------------------------------ NEW ADOPTION -------------------------------------------
router.get('/newadoption', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.render('newAdoption');
  }
});

// ------------------------------------------------------ NEW ADOPTION PHOTO -------------------------------------------
router.get('/newadoptionphoto', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.render('newAdoptionPhoto');
  }
});

// ------------------------------------------------------ NEW ANIMAL --------------------------------------------
router.get('/newanimal', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.render('newAnimal');
  }
});

// ------------------------------------------------------ PROFILE --------------------------------------------
router.get('/profile/', async (req, res) => {
  try {
    const dbUserData = await Users.findByPk(req.session.userId);
    const UserData = dbUserData.get({ plain: true });
    console.log(UserData);
    if (!UserData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.render('profile', { UserData, userId: req.session.userId });
  } catch(err){
    res.status(400).json(err);
  }
});

module.exports = router;
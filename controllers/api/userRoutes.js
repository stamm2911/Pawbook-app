const router = require('express').Router();
const User = require('../../models/Users');

// ------------------------------------------------------ GET USER ---------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ------------------------------------------------------ NEW USER ---------------------------------------------
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      photo: req.body.photo,
      location: req.body.location,
      description: req.body.description,
      password: req.body.password,
    });

    const userData2 = await User.findOne({ where: { email: req.body.email } });
    const dbuserData2 = userData2.get({ plain: true });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbuserData2.id;
      console.log(req.session.loggedIn);
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// ------------------------------------------------------ POST LOGIN -----------------------------------------
router.post('/login', async (req, res) => {
  try {
    console.log('ssssssssss');
    console.log(req.body)
    const userData = await User.findOne({ where: { email: req.body.email } });
    const dbuserData = userData.get({ plain: true });
    console.log('data:',dbuserData);
    if (!userData) {
      res
        .status(403)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(404)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbuserData.id;
      console.log(req.session);
      console.log('id:'+dbuserData.id)
      res.status(220).send('lol');
    });
  } catch (err) {
    res.status(405).json(err);
  }
});

// ------------------------------------------------------ LOGOUT -----------------------------------------
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT update a user
// router.put('/:id', async (req, res) => {
//   try {
//     const userData = await User.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData[0]) {
//       res.status(404).json({ message: 'No user with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
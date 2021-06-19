const router = require('express').Router();
const { Lost_Animal } = require('../../models');

// GET all lost animals
router.get('/', async (req, res) => {
  try {
    const dbLost_AnimalData = await Lost_Animal.findAll({
      order: [['date', 'DESC']],
      // include: [
      //   {
      //     model: Painting,
      //     attributes: ['filename', 'description'],
      //   },
      // ],
    });
    res.status(200).json(dbLost_AnimalData);

    // const galleries = dbGal  leryData.map((gallery) =>
    //   gallery.get({ plain: true })
    // );

    // res.render('homepage', {
    //   galleries,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST a lost animal
router.post('/', async (req, res) => {
  try {
    const newLost_Animal = await Lost_Animal.create(req.body);
    res.status(200).json(newLost_Animal);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
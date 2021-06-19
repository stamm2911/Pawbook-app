const router = require('express').Router();
const { Adoption } = require('../../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbAdoptionData = await Adoption.findAll({
      order: [['updatedAt', 'DESC']],
      // include: [
      //   {
      //     model: Painting,
      //     attributes: ['filename', 'description'],
      //   },
      // ],
    });
    res.status(200).json(dbAdoptionData);

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

// POST an adoption
router.post('/', async (req, res) => {
  try {
    const newAdoption = await Adoption.create(req.body);
    res.status(200).json(newAdoption);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
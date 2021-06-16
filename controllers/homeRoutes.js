const router = require('express').Router();
const { Example } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all examples 
    const exampleData = await Example.findAll();

    // Serialize data so the template can read it
    const examples = exampleData.map((example) => example.get({ plain: true }));

    // Pass serialized data
    res.render('homepage', { 
      examples, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
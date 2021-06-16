const router = require('express').Router();
const { Example } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newExample = await Example.create({
      ...req.body
    });

    res.status(200).json(newExample);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

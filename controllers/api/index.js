const router = require('express').Router();
const adoptionRoutes = require('./adoptionRoutes');
const lost_animalRoutes = require('./lost_animalRoutes');
const foodRoutes = require('./foodRoutes');

router.use('/adoption',adoptionRoutes);
router.use('/lost_animal',lost_animalRoutes);
router.use('/food',foodRoutes);

module.exports = router;
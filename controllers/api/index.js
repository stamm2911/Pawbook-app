const router = require('express').Router();
const adoptionRoutes = require('./adoptionRoutes');
const lost_animalRoutes = require('./lost_animalRoutes');

router.use('/adoption', adoptionRoutes);
router.use('/lost_animal',lost_animalRoutes);

module.exports = router;

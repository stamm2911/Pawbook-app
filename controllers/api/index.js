const router = require('express').Router();
const exampleRoutes = require('./exampleRoutes');

router.use('/examples', exampleRoutes);

module.exports = router;

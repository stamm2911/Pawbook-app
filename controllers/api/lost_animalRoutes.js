const router = require('express').Router();
const { Lost_Animal, Users } = require('../../models');

// GET all lost animals
router.get('/', async (req, res) => {
  // try {
  //   const dbLost_AnimalData = await Lost_Animal.findAll({
  //     order: [['date', 'DESC']],
  //     where: {
  //       found: false,
  //     },
  //     attributes: {
  //       exclude: ['user_id']
  //     }, 
  //     include: [
  //       {
  //         model: Users,
  //         attributes: ['name'],
  //       },
  //     ],
  //   });
  //   res.status(200).json(dbLost_AnimalData);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
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

// UPDATE a lost animal
router.put('/:id', async (req, res) => {
  try{
    const dbLost_AnimalData = await Lost_Animal.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!dbLost_AnimalData[0]){
        res.status(400).json({message: 'No lost_animal with this id!'});
        return;
    };
    res.status(200).json(dbLost_AnimalData);
  } catch (err){  
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
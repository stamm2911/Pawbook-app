const router = require('express').Router();
const { Lost_Animal, Users } = require('../../models');
const uniqid = require('uniqid');
const fileUpload = require('express-fileupload');
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

// POST an adoption PHOTOOOOO
router.post('/photo', async (req, res) => {
  try {
    console.log('!!!!!!!!!!!!!');
    // console.log(req)
    console.log(req.files);
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(403).send('No file where uploaded');
    }
    console.log('here');
    // Name of the input is sampleFile
    const uniqPhotoId = uniqid() + '.jpg';
    sampleFile = req.files.sampleFile;
    uploadPath = './upload/' + uniqPhotoId;

    console.log(uniqPhotoId);
    console.log(sampleFile);
    console.log(uploadPath);
    console.log(req.session.userId);
    console.log('now');
    const AnimalPhoto = {
      photo: uniqPhotoId,
    }

    const dbanimalRecords = await Lost_Animal.findAll({
      order: [['id', 'DESC']]
    });
    const animalRecords = dbanimalRecords.map((adoption) =>
      adoption.get({ plain: true })
    );

    console.log(animalRecords[0]);
  
    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, async (err) => {
      if (err) return res.status(500).send(err);
      console.log('after');

      await Lost_Animal.update(AnimalPhoto, {
        where: {
          id: animalRecords[0].id,
        },
      });
      
      res.status(203).redirect('/');
    });
  } catch (err) {
    res.status(501).send(err);
  }
});

// POST a lost animal
router.post('/', async (req, res) => {
  try {
    console.log('-------------------------------------------------');
    console.log(req.body);
    const body = req.body;
    body.user_id = req.session.userId;
    body.photo = 'photo';
    console.log('bodywwww', body);
    const postAnimal = await Lost_Animal.create(body);
    res.status(200).json(postAnimal);
  } catch (err) {
    console.log(err);
    res.status(507).send(err);
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
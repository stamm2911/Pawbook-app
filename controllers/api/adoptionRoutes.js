const router = require('express').Router();
const uniqid = require('uniqid');
const fileUpload = require('express-fileupload');
const { Adoption, Users } = require('../../models');
const express = require('express');
// Default option fileUpload
const app = express();
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.static('upload'));

// GET all adoptions
router.get('/', async (req, res) => {
  try {
    const dbAdoptionData = await Adoption.findAll({
      order: [['updatedAt', 'DESC']],
      where: {
        adopted: false,
      },
      attributes: {
        exclude: ['user_id', 'createdAt'],
      },
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json(dbAdoptionData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST an adoption
router.post('/', (req, res) => {
  try {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(403).send('No file where uploaded');
    }

    // Name of the input is sampleFile
    const uniqPhotoId = uniqid() + '.jpg';
    sampleFile = req.files.sampleFile;
    uploadPath = './upload/' + uniqPhotoId;

    console.log(uniqPhotoId);
    console.log(sampleFile);
    console.log(uploadPath);

    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, (err) => {
      if (err) return res.status(500).send(err);
      console.log('after');
      
      
      // Store the data in a variable once the promise is resolved
      // const newAdoption = await Adoption.create(req.body);
      // res.status(200).json(newAdoption);
    });
    res.status(203);  
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE an adoption
router.put('/:id', async (req, res) => {
  try {
    const dbAdoptionData = await Adoption.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!dbAdoptionData[0]) {
      res.status(400).json({ message: 'No adoption with this id!' });
      return;
    }
    res.status(200).json(dbAdoptionData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;

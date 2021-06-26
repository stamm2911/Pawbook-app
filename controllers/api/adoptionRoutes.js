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

// POST an adoption PHOTOOOOO
router.post('/photo', async (req, res) => {
  try {
    console.log('**********************');
    // console.log(req)
    console.log(req.files);
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
    console.log(req.session.userId);

    const AdoptionPhoto = {
      photo: uniqPhotoId,
    }

    const dbadoptionRecords = await Adoption.findAll({
      order: [['id', 'DESC']]
    });
    const adoptionRecords = dbadoptionRecords.map((adoption) =>
      adoption.get({ plain: true })
    );

    console.log(adoptionRecords[0]);
  
    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, async (err) => {
      if (err) return res.status(500).send(err);
      console.log('after');

      await Adoption.update(AdoptionPhoto, {
        where: {
          id: adoptionRecords[0].id,
        },
      });
      
      res.status(203).redirect('/');
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// ************************************************
// POST an adoption INFOOOOOO
router.post('/', async (req, res) => {
  try {
    console.log('-------------------------------------------------');
    console.log(req.body);
    const body = req.body;
    body.user_id = req.session.userId;
    body.photo = 'photo';
    console.log('bodywwww', body);
    const postAdoption = await Adoption.create(body);
    res.status(200).json(postAdoption);
  } catch (err) {
    console.log(err);
    res.status(507).send(err);
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

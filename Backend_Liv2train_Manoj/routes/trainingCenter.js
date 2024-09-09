const express = require('express');
const TrainingCenter = require('../models/trainindCenter');
const router = express.Router();

// POST API to create a new training center
router.post('/', async (req, res) => {
  try {
    const trainingCenter = new TrainingCenter(req.body);
    const savedCenter = await trainingCenter.save();
    res.status(201).json(savedCenter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET API to list all training centers
router.get('/', async (req, res) => {
  try {
    const centers = await TrainingCenter.find();
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

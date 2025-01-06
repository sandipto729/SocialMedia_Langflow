const express = require('express');
const router = express.Router();

const getAstraData=require('./../controller/AstraDbController/datafetch');

router.get('/getAstraData',getAstraData);

module.exports = router;
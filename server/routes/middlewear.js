const express = require('express');
const router = express.Router();
const { handleClickCounts} = require('../middleware/middleware');

router.get('/:shortId',handleClickCounts);

module.exports= router;
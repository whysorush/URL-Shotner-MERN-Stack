const express = require('express');

const router = express.Router();
const { handleGenrateShortUrl, handleGetAnalyticsById ,handleGetAllAnalytics} = require('../controller/url')
// const { check, validationResult } = require('express-validator');

router.post('/',handleGenrateShortUrl);
router.get('/analytics',handleGetAllAnalytics)
router.get('/analytics/:shortId',handleGetAnalyticsById);

module.exports = router;  //exporting the router to use in app.js file.  //

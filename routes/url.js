const express = require('express')
const {handleGenerateShortUrl, handleGetUrl,handleGetAnalytics} = require('../controllers/url')

const router = express.Router()


router.post('/', handleGenerateShortUrl )
router.get('/:shortId', handleGetUrl)
router.get('/analytics/:shortId', handleGetAnalytics)
module.exports = router
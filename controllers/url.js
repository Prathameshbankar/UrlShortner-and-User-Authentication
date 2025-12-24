const URL = require('../models/urls')
const shortId = require('shortid')
async function handleGenerateShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({erro: 'url is required'})
    const shortID = shortId();
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : []
    })  
    
    return res.render('home', {id : shortID})
}

async function handleGetUrl(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitHistory : {timestamp : Date.now()}
    }}  )

    res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})  
    return res.json({totalclicks : result.visitHistory.length, analytics : result.visitHistory }  )
    
}
module.exports ={
    handleGenerateShortUrl,
    handleGetUrl,
    handleGetAnalytics
}
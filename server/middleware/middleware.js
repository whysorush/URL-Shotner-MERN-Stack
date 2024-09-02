
const URL = require('../models/url')

const handleClickCounts = async (req,res)=>{
    console.log('This is a middleware layer!', req.url);
    const shortId = req.params.shortId;
    console.log(shortId)
    // const entry = 
    let visitHistory = {shortId:req.params.shortId, timeStamp : Date.now()}
    await URL.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: visitHistory,
        },upsert:true,  
        $inc:{
            clicks:1
        }
    }).then(entry=>{
        return res.redirect(entry.redirectURL)
    })
}
module.exports = {
    handleClickCounts
}
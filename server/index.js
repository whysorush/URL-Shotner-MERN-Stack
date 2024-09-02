const express = require("express");
const app = express();
const port = 8001;
const urlRoute = require('./routes/url');
const { connectDb } = require('./connection');
const URL = require('./models/url')

connectDb("mongodb://127.0.0.1:27017/shortUrl").then(() => console.log("Mongo connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/healthCheck',async (req,res)=>{
    const data = await URL.find({});
    console.log(data)
    return res.end("Site Works");
})
app.get('/:shortId', async (req, res) => {
    console.log('This is a middleware layer!', req.url);
    const shortId = req.params.shortId;
    console.log(shortId)
    // const entry = 
    let visitHistory = {shortId:req.params.shortId, timeStamp : Date.now()}
    await URL.findOneAndUpdate({ shortId, }, {
        $push: {
            visitHistory: visitHistory,
        },upsert:true,  
        $inc:{
            clicks:1
        }
    }).then(entry=>{
        return res.redirect(entry.redirectURL)
    })
    
})
app.use("/url", urlRoute);


app.listen(port, () => console.log('Server started on ', port))
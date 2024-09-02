const express = require("express");
const app = express();
const cors = require('cors');
const port = 8001;
const urlRoute = require('./routes/url');
const middlewareRoute = require('./routes/middlewear');

const { connectDb } = require('./connection');
const URL = require('./models/url')

connectDb("mongodb://127.0.0.1:27017/shortUrl").then(() => {
    console.log("Mongo connected")
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get('/favicon.ico', (req, res) => res.status(204));

// app health Check API
app.get('/healthCheck',async (req,res)=>{
    const data = await URL.find({});
    console.log(data)
    return res.end("Site Works");
})

// Middleware to count of url clicks
app.use('/',middlewareRoute );

// Route for url handle apis
app.use("/url", urlRoute);


app.listen(port, () => console.log('Server started on ', port))
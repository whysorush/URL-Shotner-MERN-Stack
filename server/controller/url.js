const generate = require("nanoid-generate");
const URL = require("../models/url");

const englishRandomString = generate.english(10);
console.log(englishRandomString);
// model.id = nanoid()
async function handleGenrateShortUrl(req, res) {
  const shortID = await generate.english(8);
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.status(200).json({ id: shortID });
}

async function handleGetAnalyticsById(req, res) {
  const shortID = req.params.id;
  const analytics = await URL.findOne({ shortID });
  if (!analytics) return res.status(404).json({ error: "url not found" });
  return res.json({
    totalClicks: analytics.visitHistory.length,
    analytics: analytics.visitHistory,
  });
  // .select('visitHistory');
}
const handleGetAllAnalytics = async (req, res) => {
  const data = await URL.find({});
  return res.json(data);
  // console.log(data);
  // return res.end(`
  //   <html>
  //   <head></head>
  //   <body>
    
  //   <h1>Short URL</h1>
  //   <ol>
  //   ${data
  //     .map(
  //       (item) =>
  //         `<li>${item.shortId} - ${item.redirectURL} - ${item.visitHistory.length}</li>`
  //     )
  //     .join()}
  //   </ol>
  //   </body>
  //   `);
};
module.exports = {
  handleGetAllAnalytics,
  handleGenrateShortUrl,
  handleGetAnalyticsById,
};

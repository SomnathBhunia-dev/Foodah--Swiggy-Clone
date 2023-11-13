const express = require("express");
const cors = require("cors");
const axios = require("axios");

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


// middlewares
app.use(express.json({ extended: false }));


// Use cors middleware with default options
app.use(cors());

// route included
app.use("/payment", require("./routes/payment"));

const customHeaders = {
  'User-Agent': process.env.DESKTOP_USER_AGENT,
};


app.get("/api", async (req, res) => {
  try {

    const response = await axios.get(process.env.HOMEPAGE_URL, {
      headers: customHeaders,
    });
    const modifiedData = response.data;
    res.json(modifiedData);

  } catch (error) {
    res.status(500).send('Proxy Error: ' + error.message);
  }
});


// Custom endpoint to fetch restaurant data by ID
app.get('/api/restaurants/:id', async (req, res) => {

  const restaurantFetchLink = process.env.RESTURENT_FETCH_URL

  try {
      const restaurantId = req.params.id;

      const response = await axios.get(`${restaurantFetchLink}${restaurantId}`, {
          headers: customHeaders,
      });
      const modifiedData = response.data;
      res.json(modifiedData);

  } catch (error) {
      res.status(500).send('Error: ' + error.message);
  }
});
  
app.listen(port, () => console.log(`server started on port ${port}`));
// backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// Stock API endpoint
app.get("/api/stock/:symbol", async (req, res) => {
  const symbol = req.params.symbol; // Extracting the symbol from the request parameters

  try {
    console.log("HERE", symbol);

    const response = await axios.get(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`
    );
    console.log("response  :", response);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stock data" });
  }
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

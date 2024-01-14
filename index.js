const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// Connect to database
connectDB();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server works.");
});

// Define Routes
app.use("/", require("./routes/index"));
app.use("/api/v1/url", require("./routes/url"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

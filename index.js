require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const https = require("https"); // Added to make the GET call to the supabase db
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/status", (req, res) => {
  res.send("Server works.");
});

// Define Routes
app.use("/", require("./routes/index"));
app.use("/api/v1/url", require("./routes/url"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// --- Supabase keep-alive ping ---
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

const PING_INTERVAL_MS = 6 * 24 * 60 * 60 * 1000; // every 6 days

setInterval(async () => {
  try {
    const { error } = await supabase
      .from("builders")
      .select("id")
      .limit(1)
      .maybeSingle();
    if (error && error.code !== "PGRST116") {
      // PGRST116 = table not found, harmless if _ping doesn't exist
      console.warn("[supabase-ping] error:", error.message);
    } else {
      console.log("[supabase-ping] ok");
    }
  } catch (err) {
    console.warn("[supabase-ping] failed:", err.message);
  }
}, PING_INTERVAL_MS);

app.get("/supabase-status", async (req, res) => {
  try {
    const { error } = await supabase
      .from("builders")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      return res.status(500).json({ status: "error", message: error.message });
    }

    res.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

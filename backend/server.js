// ✅ Import required packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// ✅ CORS setup (allow frontend)
const corsOptions = {
  origin: ["http://localhost:5173"], // your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// ✅ MongoDB connection (local only)
const mongoURI = "mongodb://localhost:27017/inventumFest";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to inventumFest database"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Define schemas
const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  date: String,
  time: String,
  rounds: String,
  prize: String,
  fee: String,
});

const registrationSchema = new mongoose.Schema({
  event: String,
  name: String,
  rollNumber: String,
  year: String,
  branch: String,
  registeredAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
const Registration = mongoose.model("Registration", registrationSchema);

// ✅ Route to get all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Error fetching events" });
  }
});

// ✅ Route to handle registrations (save in MongoDB + CSV)
app.post("/api/register", async (req, res) => {
  try {
    const reg = new Registration(req.body);
    await reg.save();

    // Write registration details into a CSV file (one per event)
    const { event, name, rollNumber, year, branch } = req.body;
    const csvDir = path.join(__dirname, "registrations");
    const csvPath = path.join(csvDir, `${event.replace(/\s+/g, "_")}.csv`);

    if (!fs.existsSync(csvDir)) fs.mkdirSync(csvDir);
    const csvHeader = `"Name","Roll Number","Year","Branch","Registered At"\n`;
    const csvLine = `"${name}","${rollNumber}","${year}","${branch}","${new Date().toLocaleString()}"\n`;

    if (!fs.existsSync(csvPath)) fs.writeFileSync(csvPath, csvHeader);
    fs.appendFileSync(csvPath, csvLine);

    res.json({ message: "Registered successfully!" });
  } catch (err) {
    console.error("Error saving registration:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Default route (health check)
app.get("/", (req, res) => {
  res.send("Inventum Backend is running ✅");
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

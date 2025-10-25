const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Register for event
router.post("/", (req, res) => {
  const { eventName, name, department, year, roll } = req.body;

  if (!eventName || !name || !department || !year || !roll) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const csvDir = path.join(__dirname, "../data");
  if (!fs.existsSync(csvDir)) fs.mkdirSync(csvDir);

  const filePath = path.join(csvDir, `${eventName}.csv`);
  const isFileExists = fs.existsSync(filePath);

  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: "name", title: "Name" },
      { id: "department", title: "Department" },
      { id: "year", title: "Year" },
      { id: "roll", title: "Roll Number" },
    ],
    append: isFileExists,
  });

  csvWriter
    .writeRecords([{ name, department, year, roll }])
    .then(() => {
      console.log(`✅ Registered for ${eventName}`);
      res.json({ message: `Registration successful for ${eventName}` });
    })
    .catch(() => res.status(500).json({ message: "Error saving registration" }));
});

module.exports = router;

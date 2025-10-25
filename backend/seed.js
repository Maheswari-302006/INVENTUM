const mongoose = require("mongoose");

// ✅ Connect to local MongoDB
mongoose
  .connect("mongodb://localhost:27017/inventumFest")
  .then(() => console.log("✅ Connected to inventumFest database"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Define Event schema
const eventSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  date: String,
  time: String,
  fee: Number,
  prize: String,
});

const Event = mongoose.model("Event", eventSchema);

// ✅ List of events
const events = [
  {
    name: "Coding Contest",
    slug: "Coding_Contest",
    description: "Test your coding skills in multiple rounds",
    date: "25-10-2025",
    time: "10:00 AM",
    fee: 100,
    prize: "Cash Prize",
  },
  {
    name: "Dance Competition",
    slug: "Dance_Competition",
    description: "Show your best dance moves",
    date: "26-10-2025",
    time: "2:00 PM",
    fee: 50,
    prize: "Trophy",
  },
  {
    name: "Quiz Competition",
    slug: "Quiz_Competition",
    description: "Test your knowledge in general quizzes",
    date: "27-10-2025",
    time: "11:00 AM",
    fee: 30,
    prize: "Medals",
  },
  {
    name: "Art Contest",
    slug: "Art_Contest",
    description: "Showcase your creativity with art",
    date: "28-10-2025",
    time: "3:00 PM",
    fee: 20,
    prize: "Certificates",
  },
  {
    name: "Photography Challenge",
    slug: "Photography_Challenge",
    description: "Capture the best moments of the fest",
    date: "29-10-2025",
    time: "1:00 PM",
    fee: 40,
    prize: "Gift Vouchers",
  },
  {
    name: "Treasure Hunt",
    slug: "Treasure_Hunt",
    description: "Solve clues and find the treasure",
    date: "30-10-2025",
    time: "4:00 PM",
    fee: 25,
    prize: "Exciting Prizes",
  },
  {
    name: "Singing Competition",
    slug: "Singing_Competition",
    description: "Show your vocal talent",
    date: "31-10-2025",
    time: "5:00 PM",
    fee: 30,
    prize: "Trophy & Certificate",
  },
  {
    name: "Drama Skit",
    slug: "Drama_Skit",
    description: "Perform a short play on any theme",
    date: "01-11-2025",
    time: "6:00 PM",
    fee: 20,
    prize: "Certificates",
  },
];

// ✅ Insert events into MongoDB
Event.insertMany(events)
  .then(() => {
    console.log("✅ Events inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error inserting events:", err);
  });

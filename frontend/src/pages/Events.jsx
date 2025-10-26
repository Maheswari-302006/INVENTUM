import React, { useEffect, useState } from "react";
import "./Events.css";

// Import all event images
import codingImg from "../assets/images/events/codingcontest.jpg";
import danceImg from "../assets/images/events/dance.jpg";
import quizImg from "../assets/images/events/quizcompetition.jpg";
import artImg from "../assets/images/events/artattack.jpg";
import photographyImg from "../assets/images/events/photography.jpg";
import treasureImg from "../assets/images/events/treasurehunt.jpg";
import singingImg from "../assets/images/events/singing.jpg";
import dramaImg from "../assets/images/events/dramaskit.jpg";
import questImg from "../assets/images/events/codequest.jpg";
import challengeImg from "../assets/images/events/codingchallenge.jpg";
import roboraceImg from "../assets/images/events/roborace.jpg";
// Map event names to images
const imageMap = {
  "Coding Contest": codingImg,
  "Dance Competition": danceImg,
  "Quiz Competition": quizImg,
  "Art Contest": artImg,
  "Photography Challenge": photographyImg,
  "Treasure Hunt": treasureImg,
  "Singing Competition": singingImg,
  "Drama Skit": dramaImg,
  "Coding Quest":questImg,
  "Coding Challenge":challengeImg,

  "Robo Race":roboraceImg,

};

function Events() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    year: "",
    branch: "",
  });

  // Fetch events
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Open form
  const openRegistrationForm = (eventName) => {
    setSelectedEvent(eventName);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      name: "",
      rollNumber: "",
      year: "",
      branch: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: selectedEvent, ...formData }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Registered successfully!");
        closeForm();
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="events-page">
      <h2>Our Events</h2>
      <div className="events-container">
        {events.length > 0 ? (
          events.map((e) => (
            <div key={e._id} className="event-card">
              <img
                src={imageMap[e.name]}
                alt={e.name}
                className="event-img"
              />
              <h3>{e.name}</h3>
              <p>{e.description}</p>
              <p><b>Date:</b> {e.date}</p>
              <p><b>Time:</b> {e.time || "N/A"}</p>
              <p><b>Rounds:</b> {e.rounds || "N/A"}</p>
              <p><b>Prize:</b> {e.prize}</p>
              {e.fee && <p><b>Fee:</b> ₹{e.fee}</p>}
              <button onClick={() => openRegistrationForm(e.name)}>Register</button>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h3>Register for {selectedEvent}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="year"
                placeholder="Year (e.g. 2nd)"
                value={formData.year}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="branch"
                placeholder="Branch (e.g. CSE)"
                value={formData.branch}
                onChange={handleChange}
                required
              />
              <div className="form-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={closeForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;

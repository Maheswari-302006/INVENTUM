import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventDetails() {
  const { name } = useParams();
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({ name: "", department: "", year: "", roll: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then(res => {
        const found = res.data.find(e => e.name === name);
        setEvent(found);
      });
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/register", { eventName: name, ...form })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage("Error submitting registration."));
  };

  if (!event) return <h3>Loading...</h3>;

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <img src={event.image} alt={event.name} />
      <p>{event.description}</p>
      <p><b>Fee:</b> {event.fee}</p>
      <p><b>Date:</b> {event.date}</p>
      <p><b>Time:</b> {event.time}</p>
      <p><b>Rounds:</b> {event.rounds}</p>
      <p><b>Prize:</b> {event.prize}</p>

      <h3>Register Now</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Department" onChange={e => setForm({ ...form, department: e.target.value })} required />
        <input type="text" placeholder="Year" onChange={e => setForm({ ...form, year: e.target.value })} required />
        <input type="text" placeholder="Roll Number" onChange={e => setForm({ ...form, roll: e.target.value })} required />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default EventDetails;

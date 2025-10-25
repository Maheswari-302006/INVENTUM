import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Inventum</h1>
      <p>A celebration of creativity, innovation, and fun!</p>
      <Link to="/events" className="btn">View Events</Link>
    </div>
  );
}

export default Home;

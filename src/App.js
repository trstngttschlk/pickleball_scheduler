import { useState } from "react";
import "./App.css";

export default function App() {
  const [myMatches, setMyMatches] = useState([]);

  function handleAddMyMatches(match) {
    setMyMatches((matches) => [...matches, match]);
  }

  return (
    <div className="App">
      <CreateMatchForm onAddMyMatches={handleAddMyMatches} />
      <MyMatches myMatches={myMatches} />
    </div>
  );
}

function CreateMatchForm({ onAddMyMatches }) {
  const [matchDateTime, setMatchDateTime] = useState("");
  const [matchLocation, setMatchLocation] = useState("");

  const date = new Date();
  const today = date.toISOString().slice(0, 16); // ISO date until :mm

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");

    const newMatch = { matchDateTime, matchLocation, id: Date.now() };

    onAddMyMatches(newMatch);

    // reset form values
    setMatchDateTime("");
    setMatchLocation("");
  }

  return (
    <>
      <h1>schedule pickle game</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date & Time</label>
        <input
          type="datetime-local"
          id="dateTimePickerId"
          min={today}
          value={matchDateTime}
          onChange={(e) => setMatchDateTime(e.target.value)}
          placeholder="Choose Date & Time"
        />
        <br />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={matchLocation}
          onChange={(e) => setMatchLocation(e.target.value)}
        />
        <br />
        <button>Create Match</button>
      </form>
    </>
  );
}

function MyMatches({ myMatches }) {
  return (
    <>
      <h1>My Matches</h1>
      <ul>
        {myMatches.map((match, index) => (
          <li key={match.id}>
            <p>Match {index + 1}</p>
            <p>{match.matchDateTime}</p>
            <p>Location: {match.matchLocation}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

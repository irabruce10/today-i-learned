import { useState } from "react";
import "./style.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [item, setItem] = useState("");

  const [link, setLink] = useState("");

  const [category, setCategory] = useState("technology");

  function handleToggle(isOpen) {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("hey");
  }

  return (
    <>
      <NavBar isOpen={isOpen} onToggle={handleToggle} />

      {isOpen ? <ShareForm onAddItem={handleSubmit} /> : ""}
    </>
  );
}

function NavBar({ isOpen, onToggle }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>

      <button className="btn btn-large btn-open" onClick={onToggle}>
        Share a fact
      </button>
    </header>
  );
}

function ShareForm({ onAddItem }) {
  return (
    <form onSubmit={onAddItem}>
      <input placeholder="enter the topic" />
      <input />
      <select>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Finance">Finance</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}

export default App;

import { useState } from "react";
import "./style.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle(isOpen) {
    setIsOpen((isOpen) => !isOpen);
  }

  return <NavBar isOpen={isOpen} onToggle={handleToggle} />;
}

function NavBar() {
  return (
    <header class="header">
      <div class="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>

      <button class="btn btn-large btn-open">Share a fact</button>
    </header>
  );
}

function ShareForm() {
  return (
    <form>
      <input placeholder="enter the topic" />
      <input />
      <select>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Finance">Finance</option>
      </select>
    </form>
  );
}

export default App;

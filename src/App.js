import { useState } from "react";
import "./style.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [item, setItem] = useState("");

  const [link, setLink] = useState("");

  const [category, setCategory] = useState(1);

  const [newItem, setNewItem] = useState([]);

  function handleToggle(isOpen) {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setNewItem([
      ...newItem,
      {
        item,
        link,
        category,
      },
    ]);

    setItem("");
    console.log(link, item, category, newItem);
  }

  return (
    <>
      <NavBar isOpen={isOpen} onToggle={handleToggle} />

      {isOpen ? (
        <ShareForm
          onAddItem={handleSubmit}
          onItem={setItem}
          item={item}
          link={link}
          onLink={setLink}
          category={category}
          onCategory={setCategory}
        />
      ) : (
        ""
      )}
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

function ShareForm({
  onAddItem,
  item,
  onItem,
  link,
  onLink,
  category,
  onCategory,
}) {
  return (
    <form onSubmit={onAddItem}>
      <input
        value={item}
        onChange={(e) => onItem(e.target.value)}
        placeholder="enter the topic"
      />
      <input value={link} onChange={(e) => onLink(e.target.value)} />
      <select>
        <option onSelect={(e) => onCategory(e.target.value)} value="techno">
          Technology
        </option>
        <option onSelect={(e) => onCategory(e.target.value)} value={category}>
          Science
        </option>
        <option onSelect={(e) => onCategory(e.target.value)} value={category}>
          Finance
        </option>
      </select>
      <button>Add</button>
    </form>
  );
}

export default App;

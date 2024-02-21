import { useState } from "react";
import "./style.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [item, setItem] = useState("");

  const [link, setLink] = useState("");

  const [category, setCategory] = useState("");

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

      <main className="main">
        <CategoryFilter />
        <FactList />
      </main>
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
    <form onSubmit={onAddItem} className="fact-form">
      <input
        type="text"
        value={item}
        onChange={(e) => onItem(e.target.value)}
        placeholder="Share a fact with the world..."
      />
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={link}
        onChange={(e) => onLink(e.target.value)}
      />
      <select value={category} onChange={(e) => onCategory(e.target.value)}>
        <option value="">Choose category:</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finance">Finance</option>
      </select>
      <button className="btn btn-large">Add</button>
    </form>
  );
}

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button class="btn btn-all-categories">All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li className="category" key={cat.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
      category
    </aside>
  );
}

function FactList() {
  return <aside>fact</aside>;
}

function List() {
  return <></>;
}

export default App;

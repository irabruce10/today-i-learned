import { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase.js";

// const initialFact = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [item, setItem] = useState("");

  const [link, setLink] = useState("http://www.google.com");

  const [category, setCategory] = useState("");

  const [facts, setNewItem] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [currentCategory, setCurrentCategory] = useState("all");

  const [isUpLoading, setIsUpLoading] = useState(false);

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } = await query

          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setNewItem(facts);
        else alert("There was a problem getting Data");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  function Loader() {
    return <p className="message">Loading.....</p>;
  }

  function handleToggle(isOpen) {
    setIsOpen((isOpen) => !isOpen);
  }

  function isValidHttpUrl(string) {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (err) {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (item && isValidHttpUrl(link) && category && item.length <= 200) {
      // setNewItem([
      //   ...facts,
      //   {
      //     id: Math.floor(Math.random() * 100000),
      //     text: item,
      //     source: link,
      //     category: category,
      //     votesInteresting: 0,
      //     votesMindblowing: 0,
      //     votesFalse: 0,
      //     createdIn: new Date().getFullYear(),
      //   },
      // ]);

      setIsUpLoading(true);

      const { data: newItem, error } = await supabase
        .from("facts")
        .insert([{ text: item, source: link, category: category }])
        .select();

      setIsUpLoading(false);

      setNewItem((facts) => [newItem[0], ...facts]);

      setItem("");
      setLink("");
      setCategory("");

      setIsOpen(false);
    }
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
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? <Loader /> : <FactList newItem={facts} />}
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
        {isOpen ? "Close" : "Share a fact"}
      </button>
    </header>
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

function ShareForm({
  onAddItem,
  item,
  onItem,
  link,
  onLink,
  category,
  onCategory,
  isUpLoading,
}) {
  let itemLength = item.length;

  return (
    <form onSubmit={onAddItem} className="fact-form">
      <input
        type="text"
        value={item}
        onChange={(e) => onItem(e.target.value)}
        placeholder="Share a fact with the world..."
        disabled={isUpLoading}
      />
      <span>{200 - itemLength}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={link}
        onChange={(e) => onLink(e.target.value)}
        disabled={isUpLoading}
      />
      <select
        value={category}
        disabled={isUpLoading}
        onChange={(e) => onCategory(e.target.value)}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option value={cat.name} key={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUpLoading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li className="category" key={cat.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
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

function FactList({ newItem }) {
  if (newItem.length === 0) {
    return (
      <p className="message">
        {" "}
        No Facts for this category yet ! Create the first one
      </p>
    );
  }
  return (
    <section>
      <ul className="facts-list">
        {newItem.map((fact) => (
          <List fact={fact} key={fact.id} />
        ))}
      </ul>
      <p>There are {newItem.length} factsin the database.add your own</p>
    </section>
  );
}

function List({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source}>
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting} </button>
        <button>🤯 {fact.votesMindblowing} </button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;

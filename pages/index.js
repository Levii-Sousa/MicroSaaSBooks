import { useState } from "react";

const initialBooksData = [
  {
    id: 1,
    title: "Can't Hurt Me",
    author: "David Goggins",
    cover:
      "https://m.media-amazon.com/images/I/41sgicYWg8L._SY445_SX342_.jpg",
    status: "concluído",
  },
  {
    id: 2,
    title: "Como fazer amigos e influenciar pessoas",
    author: "Dale Carnegie",
    cover:
      "https://m.media-amazon.com/images/I/51ekLm860KL._SY445_SX342_.jpg",
    status: "lendo",
  },
];

export default function Home() {
  const [books, setBooks] = useState(initialBooksData);
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [darkMode, setDarkMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const filteredBooks =
    selectedStatus === "todos"
      ? books
      : books.filter((book) => book.status === selectedStatus);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const colors = {
    primary: "#594747",
    secondary: "#6743a5",
    accent: "#7345d6",
    dark: "#2e2e2e",
    light: "#eeffdb",
  };

  const handleAddBook = async () => {
    if (!newTitle.trim()) return;

    const query = encodeURIComponent(newTitle);
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`);
    const data = await res.json();

    if (data.items && data.items.length > 0) {
      const bookInfo = data.items[0].volumeInfo;
      const newBook = {
        id: Date.now(),
        title: bookInfo.title || newTitle,
        author: bookInfo.authors ? bookInfo.authors[0] : "Autor desconhecido",
        cover: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "",
        status: "leia",
      };
      setBooks([newBook, ...books]);
      setNewTitle("");
    }
  };

  return (
    <div
      style={{
        background: darkMode ? colors.dark : colors.light,
        minHeight: "100vh",
        padding: "2rem",
        color: darkMode ? colors.light : colors.primary,
        fontFamily: "Arial, sans-serif",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
            fontWeight: "bold",
            color: darkMode ? colors.accent : colors.secondary,
            letterSpacing: "1px",
          }}
        >
          📚 Meus Livros
        </h1>
        <button
          onClick={toggleDarkMode}
          style={{
            background: "none",
            border: `1px solid ${darkMode ? colors.light : colors.primary}`,
            color: darkMode ? colors.light : colors.primary,
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Modo Claro" : "Modo Escuro"}
        </button>
      </div>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <select
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: `1px solid ${darkMode ? colors.light : colors.primary}`,
            background: darkMode ? colors.dark : "#fff",
            color: darkMode ? colors.light : colors.primary,
          }}
        >
          <option value="todos">Todos</option>
          <option value="concluído">Concluído</option>
          <option value="lendo">Lendo</option>
          <option value="leia">Leia</option>
        </select>

        <input
          type="text"
          placeholder="Adicione um livro..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddBook()}
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: `1px solid ${darkMode ? colors.light : colors.primary}`,
            background: darkMode ? colors.dark : "#fff",
            color: darkMode ? colors.light : colors.primary,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{
              background: darkMode ? "#1e1e1e" : "#fff",
              borderRadius: "16px",
              padding: "1.5rem",
              width: "220px",
              textAlign: "center",
              boxShadow: darkMode
                ? "0 4px 12px rgba(0, 0, 0, 0.5)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              color: darkMode ? colors.light : colors.primary,
            }}
          >
            <img
              src={book.cover}
              alt={`Capa do livro ${book.title}`}
              style={{ width: "100%", height: "auto", borderRadius: "12px" }}
            />
            <h2 style={{ fontSize: "1.2rem", margin: "1rem 0 0.5rem" }}>{book.title}</h2>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{book.author}</p>
            <p
              style={{
                fontSize: "0.9rem",
                fontWeight: "bold",
                color:
                  book.status === "concluído"
                    ? darkMode
                      ? "#eeffdb"
                      : "#2e2e2e"
                    : book.status === "lendo"
                    ? darkMode
                      ? "#7345d6"
                      : "#6743a5"
                    : darkMode
                    ? "#a69cda"
                    : "#594747",
              }}
            >
              {book.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

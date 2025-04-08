// pages/index.js
export default function Home() {
  const books = [
    {
      id: 1,
      title: "Can't Hurt me",
      author: "David Goggins",
      cover: "https://m.media-amazon.com/images/I/41sgicYWg8L._SY445_SX342_.jpg",
    },
    {
      id: 2,
      title: "Como fazer amigos e influenciar pessoas",
      author: "Dale Carnegie",
      cover: "https://m.media-amazon.com/images/I/51ekLm860KL._SY445_SX342_.jpg",
    },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "2rem" }}>
      <h1
      style={{
        color: "#4DA6FF",
        fontSize: "2rem",
        textAlign: "center",
        marginBottom: "2rem",
      }}
      >
         Meus Livros
      </h1>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #eee",
              padding: "1rem",
              borderRadius: "8px",
              maxWidth: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={book.cover}
              alt={`Capa do livro ${book.title}`}
              style={{ width: "100%", height: "auto", borderRadius: "6px" }}
            />
            <h2 style={{ color: "#00755C", fontSize: "1.2rem" }}>{book.title}</h2>
            <p style={{ color: "#213435", fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

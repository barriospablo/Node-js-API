const http = require("http");

const notes = [
  { id: 1, content: "Soy el content", date: "2020", important: true },
  { id: 2, content: "Soy segundo content", date: "2021", important: false },
  { id: 3, content: "Soy tercer content", date: "2022", important: false },
];

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);

console.log(`Server running on port ${PORT}`);

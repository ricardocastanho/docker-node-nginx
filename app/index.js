import express from "express";
import mysql from "mysql";

const app = express();

const conn = mysql.createConnection({
  database: "local",
  host: "mysql",
  port: "3306",
  user: "root",
  password: "root",
});

let people = [];
const names = ["Ricardo", "Ale", "Wesley", "João", "Jerundio"];

app.get("/", (req, res) => {
  const name = names.at(Math.floor(Math.random() * names.length));

  conn.query("INSERT INTO people(name) VALUES (?)", name);
  conn.query("SELECT * FROM people", (err, res) => (people = res));

  res.send(`
    <p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p>

    <p>- Lista de nomes cadastrada no banco de dados.</p>
    
    <ul>
      ${people.map((person) => `<li>${person.name}</li>`).join("")}
    </ul>
  `);
});

app.listen("3000", () => {
  console.log("Listening at port 3000");
});

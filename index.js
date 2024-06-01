// index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(express.static('public'));

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, profile_description TEXT)");
  db.run("CREATE TABLE skills (id INTEGER PRIMARY KEY, user_id INTEGER, skill_name TEXT, experience_level TEXT)");
  db.run("CREATE TABLE sessions (id INTEGER PRIMARY KEY, mentor_id INTEGER, mentee_id INTEGER, skill_id INTEGER, session_date TEXT, feedback TEXT)");
});

app.post('/users', (req, res) => {
  const { name, email, profile_description } = req.body;
  db.run("INSERT INTO users (name, email, profile_description) VALUES (?, ?, ?)", [name, email, profile_description], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ message: 'Profile created successfully!' });
  });
});

app.post('/skills', (req, res) => {
  const { user_id, skill_name, experience_level } = req.body;
  db.run("INSERT INTO skills (user_id, skill_name, experience_level) VALUES (?, ?, ?)", [user_id, skill_name, experience_level], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ message: 'Skill added successfully!' });
  });
});

app.post('/sessions', (req, res) => {
  const { mentor_id, mentee_id, skill_id, session_date } = req.body;
  db.run("INSERT INTO sessions (mentor_id, mentee_id, skill_id, session_date) VALUES (?, ?, ?, ?)", [mentor_id, mentee_id, skill_id, session_date], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ message: 'Session scheduled successfully!' });
  });
});

app.put('/sessions/:id/feedback', (req, res) => {
  const { id } = req.params;
  const { feedback } = req.body;
  db.run("UPDATE sessions SET feedback = ? WHERE id = ?", [feedback, id], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(204).send();
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

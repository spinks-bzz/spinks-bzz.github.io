const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); // Add cookieParser import
const app = express();

const port = 3000;

/* Config */

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Update the static file path

app.use(cookieParser());

var data = [
  { Name: 'Saskia', Comment: 'Tolle Website 😃' },
  { Name: 'Nic', Comment: 'Hi 😮' }
];

/* Serve Main Files */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Server index.html as / 
});

app.get('/raw', (req, res) => {
  res.sendFile(path.join(__dirname, 'raw.html')); // Server index.html as / 
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css')); // Serve style.css file
});

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'script.js')); // Serve script.js file
});

app.get('/images/Main.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '/images/Main.jpg')); // Serve Main.jpg file
});

app.get('/disclaimer.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'disclaimer.txt')); // Serve Main.jpg file
});

app.get('/impressum.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'impressum.txt')); // Serve Main.jpg file
});

/* API */

app.get('/api/data', (req, res) => {
  res.send({ comments_data: data });
});

app.post('/api/comment', (req, res) => {
  data.push(req.body.data);
  res.send(data);
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

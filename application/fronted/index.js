require('dotenv').config();
const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const host = process.env.BACKEND_HOST;
const port = process.env.BACKEND_PORT;
fs.writeFile(__dirname + '/public/config.js', `const BACKEND_HOST = '${host}'; const BACKEND_PORT = '${port}';`, (err) => { if(err) console.log(err); });

const app_port = process.env.APP_PORT || 3000;
app.listen(app_port, () => console.log(`Server running on port ${app_port}.`));
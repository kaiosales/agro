const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;
const folder = process.env.FOLDER || '/dist/agro';

app.use(express.static(__dirname + folder));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));

process.on('SIGINT', function() {
    console.log( "\nApp shutting down" );
    process.exit(1);
});
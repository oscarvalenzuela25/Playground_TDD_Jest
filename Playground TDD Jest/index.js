const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Rutas
const routesPosts = require('./routes/posts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/posts', routesPosts);

app.get('/', (req, res) => {
	res.status(200).send(`Aplicacion hosteada en http://localhost:${port}`);
});

app.listen(port, () => {
	console.log(`Aplicacion hosteada en http://localhost:${port}`);
});
app.listen(port);

module.exports = app;

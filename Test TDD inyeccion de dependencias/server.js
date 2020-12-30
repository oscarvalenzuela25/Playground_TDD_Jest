// Comando yarn jest --watchAll jest queda escuchando los cambios
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
//const { users } = require('./endpoints');
const { posts } = require('./endpoints');
const { authenticate } = require('./middlewares');

const app = express();
// const portServer = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//const usersHandlers = users({ axios });
const postsHandlers = posts({ axios });

// app.get('/', usersHandlers.get);
// app.post('/', usersHandlers.post);
// app.put('/:id', usersHandlers.put);
// app.delete('/:id', usersHandlers.delete);

app.post('/', authenticate, postsHandlers.post);

// app.listen(portServer, () => {
// 	console.log(`Aplicacion iniciada en http://localhost:${portServer}`);
// });

module.exports = {
	app,
};

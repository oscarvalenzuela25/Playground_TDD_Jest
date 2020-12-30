const axios = require('axios');

exports.sumar = (a, b) => {
	if (typeof a === 'number' && typeof b === 'number') {
		return a + b;
	}
	return null;
};

exports.restar = (a, b) => {
	if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}
	return null;
};

exports.multiplicar = (a, b) => {
	if (typeof a === 'number' && typeof b === 'number') {
		return a * b;
	}
	return null;
};

exports.dividir = (a, b) => {
	if (typeof a === 'number' && typeof b === 'number') {
		if (b !== 0) {
			return a / b;
		}
		return 'no se puede divir por 0';
	}
	return null;
};

exports.isNull = () => null;

exports.isFalse = () => false;

exports.isTrue = () => true;

exports.isUndefined = () => undefined;

exports.regiones = [
	'Arica y Parinacota',
	'Tarapacá',
	'Antofagasta',
	'Atacama',
	'Coquimbo',
	'Valparaíso',
	'Metropolitana',
	'Libertador General Bernardo O’Higgins',
	'Maule',
	'Ñuble',
	'Biobío',
	'La Araucanía',
	'Los Ríos',
	'Los Lagos',
	'Aysén del General Carlos Ibáñez del Campo',
	'Magallanes y la Antártica Chilena',
];

exports.dias = [
	'Lunes',
	'Martes',
	'Miercoles',
	'Jueves',
	'Viernes',
	'Sabado',
	'Domingo',
];

exports.expReg = {
	responseOK: 'Response OK',
	responseFAIL: 'Response FAIL',
	email: 'test@test.com',
	telefono: '919784852',
};

exports.callback = callback =>
	setTimeout(() => callback('Hola mundo desde el callback'), 3000);

exports.getPosts = async url => {
	const data = await axios.get(url);
	return data;
};

exports.createPost = id => {
	const numberRandom = id || Math.random();
	const newObject = {
		id: numberRandom,
		title: `post ${numberRandom}`,
		author: 'Oscar Valenzuela',
	};

	return newObject;
};

exports.postPosts = async (url, object) => {
	try {
		if (!object.title || !object.author)
			throw Error('title or author empty');
		const data = await axios.post(url, object);
		return data;
	} catch (error) {
		return error;
	}
};

exports.putPosts = async (url, object) => {
	try {
		if (!object.title || !object.author)
			throw Error('title or author empty');

		const data = await axios.put(url, object);
		return data;
	} catch (error) {
		return error;
	}
};

exports.deletePosts = async url => {
	try {
		const data = await axios.delete(url);
		return data;
	} catch (error) {
		return error;
	}
};

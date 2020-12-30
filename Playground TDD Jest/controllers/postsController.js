const axios = require('axios');
const { urlBase, myId } = require('../configs');

const urlPosts = `${urlBase}/posts`;

exports.getPosts = async (req, res) => {
	try {
		const { id = null } = req.params;
		const url = id ? `${urlPosts}/${id}` : urlPosts;
		const response = await axios.get(url);
		const { data, status } = response;
		// 200
		res.status(status).send(data);
	} catch (error) {
		return res.status(404).send({ error: error.message });
	}
};

exports.postPosts = async (req, res) => {
	try {
		const { body } = req;
		const { userId } = body;
		if (userId !== myId) {
			return res.status(500).send({
				error: 'no puedes crear posts con otra id que no sea la tuya',
			});
		}
		const response = await axios.post(urlPosts, body);
		const { data, status } = response;
		// 201
		res.status(status).send(data);
	} catch (error) {
		return res.status(404).send({ error: error.message });
	}
};

exports.putPosts = async (req, res) => {
	try {
		const { userId } = req.body;
		const { id } = req.params;
		if (userId !== myId) {
			return res.status(500).send({
				error: 'no puedes crear posts con otra id que no sea la tuya',
			});
		}
		const response = await axios.put(`${urlPosts}/${id}`, req.body);
		const { data, status } = response;
		// 200
		res.status(status).send(data);
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
};

exports.deletePosts = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await axios.delete(`${urlPosts}/${id}`);
		const { data, status } = response;
		// 200
		res.status(status).send(data);
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
};

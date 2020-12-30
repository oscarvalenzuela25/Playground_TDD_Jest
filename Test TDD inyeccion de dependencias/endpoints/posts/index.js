module.exports = ({ axios }) => ({
	post: async (req, res) => {
		const { data: users } = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);
		const { userId } = req.body;
		const found = users.find(x => x.id === userId);
		if (found) {
			await axios.post(
				'https://jsonplaceholder.typicode.com/posts',
				req.body
			);
			return res.status(201).send({ id: userId });
		}
		res.sendStatus(400);
	},
});

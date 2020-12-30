const request = require('supertest');
const { app } = require('../../server');

// Prueba de integracion
describe('Server', () => {
	describe('Endpoints:', () => {
		describe('Posts POST', () => {
			it('creates a new post', async () => {
				const response = await request(app)
					.post('/')
					// .send sirve para enviar parametros
					.send({ userId: 5 })
					// .set sirve para agregar headers
					// en este caso se usa 1 como id de Admin
					.set('user_id', 1)
					.set('Content-Type', 'application/json');
				expect(response.statusCode).toEqual(201);
				expect(response.body.id).toEqual(5);
				expect(response.body).toHaveProperty('id');
			});
			it('does not creates a new post', async () => {
				const response = await request(app)
					.post('/')
					// Esta prueba falla porque no existe el userId 100
					.send({ userId: 100 })
					.set('user_id', 1)
					.set('Content-Type', 'application/json');
				expect(response.statusCode).toEqual(400);
			});
		});
	});
});

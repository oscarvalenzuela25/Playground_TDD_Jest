const request = require('supertest');
const app = require('../../index');

describe('Servidor', () => {
	describe('Endpoints Posts', () => {
		describe('GET', () => {
			it('debe devolver un status 200 sin parametros', async () => {
				const response = await request(app)
					.get('/posts/')
					.set('Content-Type', 'application/json');
				expect(response.status).toBe(200);
				expect(response.body.length).toBeGreaterThanOrEqual(1);
			});
			it('debe devolver un status 200 con la id 100', async () => {
				const response = await request(app)
					.get('/posts/100')
					.set('Content-Type', 'application/json');
				expect(response.status).toBe(200);
			});
			it('debe devolver un status 404 con una id erronea ', async () => {
				const response = await request(app).get('/posts/101');
				expect(response.status).toBe(404);
			});
		});
		describe('POST', () => {
			it('debe devolver un status 201 al crear un post nuevo con el mismo post', async () => {
				const newPost = {
					title: 'Nuevo post de testeo',
					body: 'Lorem ipsum y la wea',
					userId: 1,
				};
				const response = await request(app)
					.post('/posts/')
					.send(newPost)
					.set('Content-Type', 'application/json');
				expect(response.status).toBe(201);
				expect(response.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						title: 'Nuevo post de testeo',
						body: 'Lorem ipsum y la wea',
						userId: 1,
					})
				);
			});
			it('debe devolver un 500 si el userId no correspone a 1', async () => {
				const newPost = {
					title: 'Nuevo post de testeo',
					body: 'Lorem ipsum y la wea',
					userId: 2,
				};
				const response = await request(app)
					.post('/posts/')
					.send(newPost);
				expect(response.status).toBe(500);
			});
		});
		describe('PUT', () => {
			it('debe devolver un status 200 al actualizar un post y con el mismo post', async () => {
				const newPost = {
					title: 'Nuevo post de testeo 2',
					body: 'Lorem ipsum y la wea 2',
					userId: 1,
				};
				const response = await request(app)
					.put('/posts/1')
					.send(newPost)
					.set('Content-Type', 'application/json');
				expect(response.status).toBe(200);
				expect(response.body).toEqual({ ...newPost, id: 1 });
				expect(response.body).toEqual(
					expect.objectContaining({
						title: 'Nuevo post de testeo 2',
						body: 'Lorem ipsum y la wea 2',
						userId: 1,
						id: expect.any(Number),
					})
				);
			});
			it('debe devolver un status 500 al actualizar un post con un userId diferente a 1', async () => {
				const newPost = {
					title: 'Nuevo post de testeo 2',
					body: 'Lorem ipsum y la wea 2',
					userId: 2,
				};
				const response = await request(app)
					.put('/posts/1')
					.send(newPost);
				expect(response.status).toBe(500);
			});
			it('debe devolver un status 404 al actualizar sin un parametro definido ', async () => {
				const newPost = {
					title: 'Nuevo post de testeo 2',
					body: 'Lorem ipsum y la wea 2',
					userId: 1,
				};
				const response = await request(app)
					.put('/posts/')
					.send(newPost);
				expect(response.status).toBe(404);
			});
		});
		describe('DELETE', () => {
			it('debe devolver un status 200 al eliminar un post', async () => {
				const response = await request(app).delete('/posts/1');
				expect(response.status).toBe(200);
			});
			it('debe devolver un status 404 al eliminar un post sin parametro', async () => {
				const response = await request(app).delete('/posts/');
				expect(response.status).toBe(404);
			});
			it('debe devolver un objecto vacio al realizar el delete', async () => {
				const response = await request(app).delete('/posts/1');
				expect(response.status).toBe(200);
				expect(response.body).toEqual({});
			});
		});
	});
});

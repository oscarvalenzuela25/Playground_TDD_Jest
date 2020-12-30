const {
	sumar,
	restar,
	multiplicar,
	dividir,

	isNull,
	isUndefined,
	isFalse,
	isTrue,

	regiones,
	dias,

	expReg,

	callback,

	getPosts,
	postPosts,
	createPost,
	putPosts,
	deletePosts,
} = require('../functionsPlayground');

// Los describe son bloques que sirven para darle un nombre a una agrupacion de elementos
// Los test o it son bloques en donde vamos a hacer las pruebas

// Recuerda, toBe es para comparar datos primitivos (numeros, strings, booleanos )
// Recuerda, toEqual es para comprar datos mas explicitos (arrays, objetos)

// Matchs
// toBe
describe('Operaciones matematicas', () => {
	it('should add 2 numbers', () => {
		const [a, b] = [3, 5];
		const sum = sumar(a, b);
		expect(sum).toBe(8);
	});
	it('should add number and letter or empty and return null', () => {
		const [a, b] = [3, 'a'];
		const [c, d] = [3];
		const sum = sumar(a, b);
		const sum2 = sumar(c, d);
		expect(sum).toBeNull();
		expect(sum2).toBeNull();
	});
	it('should subtract 2 numbers', () => {
		const [a, b] = [3, 5];
		const sub = restar(a, b);
		expect(sub).toBe(-2);
	});
	it('should subtract number and letter or empty and return null', () => {
		const [a, b] = [3, 'a'];
		const [c, d] = [3];
		const sub = restar(a, b);
		const sub2 = restar(c, d);
		expect(sub).toBeNull();
		expect(sub2).toBeNull();
	});
	it('should multiply 2 numbers', () => {
		const [a, b] = [3, 5];
		const mult = multiplicar(a, b);
		expect(mult).toBe(15);
	});
	it('should multiply number and letter or empty and return null', () => {
		const [a, b] = [3, 'a'];
		const [c, d] = [3];
		const mult = multiplicar(a, b);
		const mult2 = multiplicar(c, d);
		expect(mult).toBeNull();
		expect(mult2).toBeNull();
	});
	it('should divide 2 numbers', () => {
		const [a, b] = [100, 5];
		const div = dividir(a, b);
		expect(div).toBe(20);
	});
	it('should multiply number and letter or empty and return null', () => {
		const [a, b] = [3, 'a'];
		const [c, d] = [3];
		const div = dividir(a, b);
		const div2 = dividir(c, d);
		expect(div).toBeNull();
		expect(div2).toBeNull();
	});
	it('should alert msg with denominator 0', () => {
		const [a, b] = [3, 0];
		const div = dividir(a, b);
		expect(div).toBe('no se puede divir por 0');
	});
});

//Matchs
// toBeLessThan, toBeLessThanOrEquals, toBeGreaterThan, toBeGreaterThanOrEqual
describe('Matchers numéricos', () => {
	it('Resultado menor que...', () => {
		expect(restar(5, 3)).toBeLessThan(3);
	});
	it('Resultado menor o igual que...', () => {
		expect(restar(5, 3)).toBeLessThanOrEqual(2);
	});
	it('Resultado mayor o igual que...', () => {
		expect(multiplicar(2, 5)).toBeGreaterThanOrEqual(10);
	});
	it('Resultado mayor que...', () => {
		expect(sumar(5, 5)).toBeGreaterThan(9);
	});
});

// Matchs
// toBeFalsy, toBeTruthy, toBeNull, toBeUndefined
describe('Matchers Boleans, Undefined and null', () => {
	it('should be false', () => {
		const constFalse = isFalse();
		expect(constFalse).toBeFalsy();
	});
	it('should be true', () => {
		const constTrue = isTrue();
		expect(constTrue).toBeTruthy();
	});
	it('should be null', () => {
		const constNull = isNull();
		expect(constNull).toBeNull();
	});
	it('should be undefined', () => {
		const constUndefined = isUndefined();
		expect(constUndefined).toBeUndefined();
	});
});

// Matchs
// toContain, toHaveLength
describe('Matchers Arrays', () => {
	it('should contain region "Los Lagos"', () => {
		// los match de strings son case sensitive
		expect(regiones).toContain('Los Lagos');
	});
	it('should not contain region "tacna"', () => {
		expect(regiones).not.toContain('tacna');
	});
	it('array "regiones" should contain 16 regions', () => {
		expect(regiones).toHaveLength(16);
	});
	it('should contain "Lunes" in array dias', () => {
		expect(dias).toContain('Lunes');
	});
});

// Matchs
// toMatch, toHaveLength
describe('Matchers Strings', () => {
	const exp = expReg;
	it('should verify if answer is correctly', () => {
		expect(exp.responseOK).toMatch(/OK/);
	});
	it('should verify if answer is wrong', () => {
		expect(exp.responseFAIL).toMatch(/FAIL/);
	});
	it('should verify if answer have a length', () => {
		expect(exp.responseFAIL).toHaveLength(13);
	});
	it('should verify if answer have a email valid', () => {
		expect(exp.email).toMatch(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/
		);
	});
	it('should verify if answer have a telephone number valid', () => {
		expect(exp.telefono).toMatch(/^[9|6|7][0-9]{8}$/);
	});
});

describe('Async - Callback', () => {
	// it('Callback', done => {
	// 	let callbackInternal = datos => {
	// 		expect(datos).toBe('Hola mundo desde el callback');
	// 		// done se agrega para que jest sepa que se acabo el test
	// 		done();
	// 	};
	// 	callback(callbackInternal);
	// });
});

describe('Test Api', () => {
	describe('Posts', () => {
		describe('GET', () => {
			it('should return status 200 with HTTP get and should contain at least 1 object', async () => {
				const url = 'http://localhost:4000/posts';
				const response = await getPosts(url);
				const { status, data } = response;
				expect(status).toBe(200);
				expect(data.length).toBeGreaterThanOrEqual(1);
			});
		});

		describe('POST', () => {
			it('should return status 201 with post', async () => {
				const url = 'http://localhost:4000/posts';
				const response = await postPosts(url, createPost());
				const { status } = response;
				expect(status).toBe(201);
			});
			it('should return status 404 with post empty', async () => {
				const url = 'http://localhost:4000/posts';
				const response = await postPosts(url, {});
				expect(response.message).toBe('title or author empty');
			});
			it('should return error with id duplicate', async () => {
				const url = 'http://localhost:4000/posts';
				const response = await postPosts(url, createPost(1));
				expect(response.message).toBe(
					'Request failed with status code 500'
				);
			});
		});

		describe('PUT', () => {
			it('should update author row with id 1', async () => {
				const url = 'http://localhost:4000/posts/1';
				const response = await putPosts(url, {
					title: 'Post de prueba',
					author: 'Oscar V',
				});
				const { status } = response;
				expect(status).toBe(200);
			});
			it('should show error with parameters empty', async () => {
				const url = 'http://localhost:4000/posts/1';
				const response = await putPosts(url, {});
				expect(response.message).toBe('title or author empty');
			});
		});

		describe('DELETE', () => {
			it('should delete post with id 1', async () => {
				const url = 'http://localhost:4000/posts';
				const response = await deletePosts(`${url}/1`);
				await postPosts(url, createPost(1));
				const { status } = response;
				expect(status).toBe(200);
			});
			it('should show error with id wrong', async () => {
				const url = 'http://localhost:4000/posts/999';
				const response = await deletePosts(url);
				expect(response.message).toBe(
					'Request failed with status code 404'
				);
			});
		});
	});
});
/*
afterEach(() => console.log('After each test'));
afterAll(() => console.log('After all test'));
beforeEach(() => console.log('Before each test'));
beforeAll(() => console.log('Before all test'));
*/

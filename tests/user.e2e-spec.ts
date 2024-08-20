/* eslint-disable no-undef */

import { boot } from '../src'
import request from 'supertest'
import { App } from '../src/app'

let application: App

beforeAll(async () => {
	const { app } = await boot
	application = app
})

describe('E2E USERS', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({
				email: 'ae1@dd.ru',
				password: 'dddd',
				name: 'Alex',
			})
		expect(res.status).toBe(422)
	})
	it('Register - success', async () => {
		const email = String(new Date().getTime()) + '@dd.ru'
		const res = await request(application.app)
			.post('/users/register')
			.send({
				email,
				password: 'dddd',
				name: 'Alex',
			})
		expect(res.body.email).toBe(email)
	})
	it('Login - success', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'ae1@dd.ru',
			password: 'dddd',
		})
		expect(res.status).toBe(200)
		expect(res.body.jwt).toBeDefined()
	})
	it('Login - error', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'ae1@dd.ru',
			password: 'dddd1',
		})
		expect(res.status).toBe(422)
	})
	it('Info - success', async () => {
		const login = await request(application.app).post('/users/login').send({
			email: 'ae1@dd.ru',
			password: 'dddd',
		})
		const res = await request(application.app)
			.get('/users/info')
			.set('authorization', 'Bearer ' + login.body.jwt)

		expect(res.status).toBe(200)
		expect(res.body.email).toBe('ae1@dd.ru')
	})

	it('Info - error', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set('authorization', 'Bearer 1')

		expect(res.status).toBe(401)
	})
})

afterAll(() => {
	application.close()
})

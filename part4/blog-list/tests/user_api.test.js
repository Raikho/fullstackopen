const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('POST user', () => {

	beforeEach(async () => {
		await User.deleteMany({})
		const passwordHash = await bcrypt.hash('secret', 10)
		const user = new User({ username: 'root', passwordHash })
		await user.save()
	})

	test('creates a new user', async () => {
		const startingUsers = await helper.fetchUsers()

		const newUser = {
			username: 'bob123',
			name: 'Bob Smith',
			password: 'bobpass123',
		}
		const createdUser = await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const endingUsers = await helper.fetchUsers()
		const usernames = endingUsers.map(u => u.username)

		expect(createdUser.body.password).not.toBeDefined()
		expect(createdUser.body.passwordHash).not.toBeDefined()
		expect(endingUsers).toHaveLength(startingUsers.length + 1)
		expect(usernames).toContain(newUser.username)
	})

	test('fails when username is already taken', async () => {
		const startingUsers = await helper.fetchUsers()

		const result = await api
			.post('/api/users')
			.send({
				username: 'root',
				password: 'rootpass123'
			})
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const endingUsers = await helper.fetchUsers()
		expect(endingUsers).toEqual(startingUsers)
		expect(result.body.error)
			.toContain('expected `username` to be unique')
	})
})

afterAll(async () => await mongoose.connection.close())
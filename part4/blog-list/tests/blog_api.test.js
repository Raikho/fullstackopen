const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const blogs = helper.initialBlogs

beforeEach(async () => {
	await Blog.deleteMany({})
	for (let blog of blogs)
		await new Blog(blog).save()
})

describe.skip('GET blogs', () => {
	test('are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('return all blogs', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(blogs.length)
	})

	test('returns one of the saved titles', async () => {
		const response = await api.get('/api/blogs')
		const contents = response.body.map(b => b.title)
		expect(contents).toContain('React patterns')
	})
})

test.skip('unique identifier property is named id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

describe('POST blog', () => {
	test('creates a new blog post', async () => {
		await api
			.post('/api/blogs')
			.send(helper.extraBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const contents = response.body.map(blog => blog.title)

		expect(response.body).toHaveLength(blogs.length + 1)
		expect(contents).toContain(helper.extraBlog.title)
	})
})

afterAll(async () => await mongoose.connection.close())
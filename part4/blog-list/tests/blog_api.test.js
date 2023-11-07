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

describe('GET blogs', () => {
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

describe('GET specific blog', () => {
	test('succeeds with status 200', async () => {
		const blogs = await helper.fetchBlogs()
		const blogToSearch = blogs[0]
		const resultBlog = await api
			.get(`/api/blogs/${blogToSearch.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(resultBlog.body).toEqual(blogToSearch)
	})

	test('fails with code 404 if no blog exists', async () => {
		const invalidId = await helper.invalidId()
		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(404)
	})
})

describe('unique id', () => {
	test('property is named id, not _id', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[0].id).toBeDefined()
	})
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

	test('without likes defaults to 0 likes', async () => {
		const response = await api
			.post('/api/blogs')
			.send(helper.noLikesBlog)
			.expect(201)
		expect(response.body.likes).toBe(0)
	})

	test('w/o title/url gives 400 bad request', async () => {
		await api
			.post('/api/blogs')
			.send(helper.noTitleBlog)
			.expect(400)
		await api
			.post('/api/blogs')
			.send(helper.noUrlBlog)
			.expect(400)
	})
})

describe('DELETE blog', () => {
	test('deletes a resource w/ code 204', async () => {
		const startBlogs = await helper.fetchBlogs()
		const blogToDelete =  startBlogs[0]
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)
		const endBlogs = await helper.fetchBlogs()

		expect(startBlogs.length - endBlogs.length).toBe(1)

		const titles = endBlogs.map(b => b.title)
		expect(titles).not.toContain(blogToDelete.title)
	})
})

afterAll(async () => await mongoose.connection.close())
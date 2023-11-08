const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog.js')
const User = require('../models/user.js')

let auth1
let auth2

beforeAll(async () => {
	await User.deleteMany({})
	await helper.addNewUser(helper.user1)
	await helper.addNewUser(helper.user2)
	auth1 = await helper.getAuth(helper.user1)
	auth2 = await helper.getAuth(helper.user2)
})

beforeAll(async () => {
	await Blog.deleteMany({})
	const users = await User.find({})
	const updatedBlogs = helper.initialBlogs.map((b, index) => {
		const user = (index <= 3) ? users[0] : users[1]
		return { ...b, user: user._id.toString() }
	})
	await Blog.insertMany(updatedBlogs)
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
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('returns one of the saved titles', async () => {
		const response = await api.get('/api/blogs')
		const contents = response.body.map(b => b.title)
		expect(contents).toContain(helper.initialBlogs[0].title)
	})

	test('returns user info (id & username)', async () => {
		const response = await api.get('/api/blogs')
		const userInfo = response.body[0].user
		expect(userInfo.id).toBeDefined()
		expect(userInfo.username).toBeDefined()
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
		expect(resultBlog.body.title).toEqual(blogToSearch.title)
	})

	test('fails with code 404 if no blog exists', async () => {
		const missingId = await helper.missingId()
		await api
			.get(`/api/blogs/${missingId}`)
			.expect(404)
	})

	test('fails with code 400 if id is invalid', async () => {
		const invalidId = '0'
		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400)
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
			.set({ Authorization: auth1 })
			.send(helper.extraBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const contents = response.body.map(blog => blog.title)

		expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
		expect(contents).toContain(helper.extraBlog.title)
	})

	test('without likes defaults to 0 likes', async () => {
		const response = await api
			.post('/api/blogs')
			.set({ Authorization: auth1 })
			.send(helper.noLikesBlog)
			.expect(201)
		expect(response.body.likes).toBe(0)
	})

	test('w/o title/url gives 400 bad request', async () => {
		const blogsAtStart = await helper.fetchBlogs()
		await api
			.post('/api/blogs')
			.set({ Authorization: auth1 })
			.send(helper.noTitleBlog)
			.expect(400)
		await api
			.post('/api/blogs')
			.set({ Authorization: auth1 })
			.send(helper.noUrlBlog)
			.expect(400)
		const blogsAtEnd = await helper.fetchBlogs()

		expect(blogsAtEnd.length).toBe(blogsAtStart.length)
	})

	test('adds user information', async () => {
		const response = await api
			.post('/api/blogs')
			.set({ Authorization: auth1 })
			.send(helper.extraBlog)
		expect(response.body.user).toBeDefined()
	})

	test('with wrong token fails with 401', async () => {
		await api
			.post('/api/blogs')
			.set({ Authorization: 'Bearer abc' })
			.send(helper.extraBlog)
			.expect(401)
	} )
})

describe('DELETE blog', () => {
	test('deletes a resource w/ code 204', async () => {
		const startBlogs = await helper.fetchBlogs()
		const blogToDelete =  startBlogs[0]
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set({ Authorization: auth1 })
			.expect(204)
		const endBlogs = await helper.fetchBlogs()

		expect(startBlogs.length - endBlogs.length).toBe(1)

		const titles = endBlogs.map(b => b.title)
		expect(titles).not.toContain(blogToDelete.title)
	})
	test('fails with 401 if user doesnt own blog', async () => {
		const startBlogs = await helper.fetchBlogs()
		const blogToDelete = startBlogs[0]
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set({ Authorization: auth2 })
			.expect(401)
	})
})

describe('PUT blog', () => {
	test('successfully increases the likes of a blog', async () => {
		const startBlogs = await helper.fetchBlogs()
		const { title, author, url, likes, id } = startBlogs[0]

		const updatedBlog = await api
			.put(`/api/blogs/${id}`)
			.send({ title, author, url, likes: likes + 1 })
			.expect(200)

		expect(updatedBlog.body.likes - likes).toBe(1)
	})
})

afterAll(async () => await mongoose.connection.close())
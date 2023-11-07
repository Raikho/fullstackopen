const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
	res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
	const blog = await Blog
		.findById(req.params.id)
		.populate('user', { username: 1, name: 1 })
	if (blog) res.json(blog)
	else res.status(404).end()
})

blogRouter.post('/', async (req, res) => {
	const { title, author, url, likes } = req.body
	const user = await User.findOne({}) // TODO
	const blog = new Blog({ title, author, url, likes, user: user.id })

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndDelete(req.params.id)
	res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
	const { title, author, url, likes } = req.body
	const updatedBlog = await Blog.findByIdAndUpdate(
		req.params.id,
		{ title, author, url, likes },
		{ new: true, runValidators: true, contect: 'query' }
	)
	res.json(updatedBlog)
})

module.exports = blogRouter

const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogRouter.get('/:id', (req, res, next) => {
	Blog
		.findById(req.params.id)
		.then(blog => {
			if (blog) res.json(blog)
			else res.status(404).end()
		})
		.catch(err => next(err))
})

blogRouter.post('/', async (req, res) => {
	const { title, author, url, likes } = req.body
	const blog = new Blog({ title, author, url, likes })

	const savedBlog = await blog.save()
	res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', (req, res, next) => {
	Blog
		.findByIdAndDelete(req.params.id)
		.then(() => res.status(204).end())
		.catch(err => next(err))
})

blogRouter.put('/:id', (req, res, next) => {
	const { title, author, url, likes } = req.body
	Blog
		.findByIdAndUpdate(
			req.params.id,
			{ title, author, url, likes },
			{ new: true, runValidators: true, contect: 'query' }
		)
		.then(updatedBlog => res.json(updatedBlog))
		.catch(err => next(err))
})

module.exports = blogRouter

const blogRouter = require('express').Router()
const Comment = require('../models/comment.js')
const Blog = require('../models/blog.js')

blogRouter.post('/:id/comments', async (req, res) => {
	const text = req.body.text
	const blog = await Blog.findById(req.params.id)

	const comment = new Comment({ text, blog: blog._id })
	const savedComment = await comment.save()

	blog.comments = blog.comments.concat(savedComment._id)
	await blog.save()

	res.status(201).json(savedComment)
})

blogRouter.delete('/:blog_id/comments/:id', async (req, res) => {
	const comment = await Comment.findById(req.params.id)

	await comment.deleteOne()
	res.status(204).end()
})

module.exports = blogRouter

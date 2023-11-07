const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
	},
	{
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
	},
	{
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
	},
	{
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
	}
]

const extraBlog = {
	title: 'Extra Blog',
	author: 'Extra Author',
	url: 'http://extra_blog.com',
	likes: 1,
}

const noLikesBlog = {
	title: 'No Likes Blog',
	author: 'No Likes Author',
	url: 'http://no_likes_blog.com',
}
const noTitleBlog = {
	author: 'No Likes Author',
	url: 'http://no_likes_blog.com',
	likes: 1,
}
const noUrlBlog = {
	title: 'No Url Blog',
	author: 'No Url Author',
	likes: 2,
}

const missingId = async () => {
	const blog = new Blog({
		title: 'invalid blog title',
		author: 'invalid blog author',
		url: 'http://invalid_blog.com',
		likes: 0,
	})
	await blog.save()
	await blog.deleteOne()
	return blog._id.toString()
}

const fetchBlogs = async () => {
	const blogs = await Blog.find({})
	return blogs.map(b => b.toJSON())
}

module.exports = {
	initialBlogs,
	extraBlog,
	noLikesBlog,
	noTitleBlog,
	noUrlBlog,
	missingId,
	fetchBlogs,
}

const Blog = require('../models/blog.js')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

const fetchUsers = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

const user1 = {
	username: 'user1',
	name: 'User 1',
	password: 'user1password',
}
const user2 = {
	username: 'user2',
	name: 'User 2',
	password: 'user2password',
}

const addNewUser = async (givenUser) => {
	const { username, name, password } = givenUser
	const passwordHash = await bcrypt.hash(password, 10)
	const user = new User({ username, name, passwordHash })
	await user.save()
}
const getAuth = async (givenUser) => {
	const { username } = givenUser
	const user = await User.findOne({ username })
	if(!user)
		return null
	const userForToken = { username, id: user._id }
	const token = jwt.sign(userForToken, process.env.SECRET)
	return 'Bearer '.concat(token)
}
module.exports = {
	initialBlogs,
	extraBlog,
	noLikesBlog,
	noTitleBlog,
	noUrlBlog,
	missingId,
	fetchBlogs,
	fetchUsers,
	user1,
	user2,
	addNewUser,
	getAuth,
}

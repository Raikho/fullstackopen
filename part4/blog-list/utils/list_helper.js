const dummy = (blogs) => {
	if (blogs)
		return 1
	else
		return 1
}

const totalLikes = blogs => {
	return (blogs.length === 0)
		? 0
		: blogs.reduce((prev, blog) => blog.likes + prev, 0)
}

const favoriteBlog = blogs => {
	if (blogs.length === 0)
		return {}

	const max = Math.max(...blogs.map(b => b.likes))
	const maxBlog = blogs.find(b => b.likes === max)
	const { author, likes, title } = maxBlog

	return { author, likes, title }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
}
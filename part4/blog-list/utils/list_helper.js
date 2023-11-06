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
	const { title, author, likes } = maxBlog

	return { title, author, likes }
}

const mostBlogs = blogs => {
	if (blogs.length === 0)
		return {}

	const frequencies = getBaseFrequencies(blogs)
	frequencies.forEach(f => {
		f.blogs = blogs.reduce((prev, blog) => {
			return (blog.author === f.author)
				? prev + 1
				: prev
		}, 0)
	})

	const maxBlogs = Math.max(...frequencies.map(f => f.blogs))
	return frequencies.find(f => f.blogs === maxBlogs)
}

const mostLikes = blogs => {
	if (blogs.length === 0)
		return {}

	const frequencies = getBaseFrequencies(blogs)
	frequencies.forEach(f => {
		f.likes = blogs.reduce((prev, blog) => {
			return (blog.author === f.author)
				? prev + blog.likes
				: prev
		}, 0)
	})

	const maxLikes = Math.max(...frequencies.map(f => f.likes))
	return frequencies.find(f => f.likes === maxLikes)
}

const getBaseFrequencies = arr => {
	const authors = arr.map(item => item.author)
	const frequencies = []

	authors.forEach(author => {
		if (!frequencies.find(f => f.author === author))
			frequencies.push({ author })
	})

	return frequencies
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
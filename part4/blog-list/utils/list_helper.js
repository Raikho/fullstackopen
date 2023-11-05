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

module.exports = {
	dummy,
	totalLikes
}
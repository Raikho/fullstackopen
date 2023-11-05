const listHelper = require('../utils/list_helper')

const rand = num => Math.floor(Math.random() * num)

const genBlog = ({ id, title, author, url, likes }) => {
	return {
		__id: id || `${rand(1000000)}`,
		title: title || `Random Title #${rand(1000)}`,
		author: author || `Random Author #${rand(1000)}`,
		url: url || `Random URL ${rand(1000)}`,
		likes: likes || rand(10),
		__v: 0,
	}
}
describe('total likes', () => {
	test('of empty list is zero', () => {
		expect(listHelper.totalLikes([])).toBe(0)
	})
	test('of one blog equals the likes of that', () => {
		const blog = genBlog({ likes: 10 })
		expect(listHelper.totalLikes([blog])).toBe(10)
	})
	test('of multiple blogs is summed correctly', () => {
		const blog1 = genBlog({ likes: 10 })
		const blog2 = genBlog({ likes: 20 })
		const blog3 = genBlog({ likes: 30 })
		expect(listHelper.totalLikes([blog1, blog2, blog3])).toBe(60)
	})
})
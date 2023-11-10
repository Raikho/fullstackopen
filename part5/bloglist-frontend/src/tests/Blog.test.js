import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const user1 =  { username: 'Author_Username' }
const user2 = { username: 'Author_Username_2' }
const blog = {
	title: 'The Book Title',
	author: 'Mr. Author',
	url: 'www.ReadThisBook.com',
	likes: 0,
	user: user1
}

let confirmSpy
beforeAll(() => {
	confirmSpy = jest.spyOn(window, 'confirm')
	confirmSpy.mockImplementation(jest.fn(() => true))
})
afterAll(() => confirmSpy.mockRestore())

describe('<Blog />', () => {
	beforeEach(() => {
		render(<Blog blog={blog} user={user1} />)
	})

	test('show only title and author initially', () => {
		const title = screen.getByText(blog.title)
		const author = screen.getByText(blog.author)
		const url = screen.getByText(blog.url)
		const likes = screen.getByText(`likes ${blog.likes}`)

		expect(title).toBeVisible()
		expect(author).toBeVisible()
		expect(url).not.toBeVisible()
		expect(likes).not.toBeVisible()
	})

	test('show everything after click show', async () => {
		const title = screen.getByText(blog.title)
		const author = screen.getByText(blog.author)
		const url = screen.getByText(blog.url)
		const likes = screen.getByText(`likes ${blog.likes}`)

		const user = userEvent.setup()
		const showButton = screen.getByText('view')
		await user.click(showButton)

		expect(title).toBeVisible()
		expect(author).toBeVisible()
		expect(url).toBeVisible()
		expect(likes).toBeVisible()
	})
})

describe('remove button', () => {
	test('calls event handler once, sending blog info', async() => {
		const mockHandler = jest.fn()
		render(<Blog blog={blog} user={user1} handleRemoveBlog={mockHandler} />)

		const user = userEvent.setup()
		const removeButton = screen.getByText('remove')

		await user.click(removeButton)

		expect(mockHandler.mock.calls).toHaveLength(1)
		expect(mockHandler.mock.calls[0][0]).toBe(blog)
	})

	test ('doesnt exist when user doesnt own blog', () => {
		render(<Blog blog={blog} user={user2} />)
		const removeButton = screen.queryByText('remove')
		expect(removeButton).toBeNull()
	})
})
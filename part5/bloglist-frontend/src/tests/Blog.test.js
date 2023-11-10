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


test('renders content', () => {
	render(<Blog blog={blog} user={user1} />)
	const element = screen.getByText('The Book Title')
	expect(element).toBeDefined()
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
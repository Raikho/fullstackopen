import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

const inputBlog = {
	title: 'Test Title',
	author: 'Mr Test Author',
	url: 'www.TestBlog.com',
}

describe('<BlogForm />', () => {
	let addBlog
	let container

	beforeEach(() => {
		addBlog = jest.fn()
		container = render(<BlogForm handleAddBlog={addBlog} />).container
	})

	test('renders', async () => {
		const element = screen.getByText('create new blog')
		expect(element).toBeDefined()
	})

	test('calls onSubmit and sends blog info', async () => {
		const user = userEvent.setup()
		const titleInput = container.querySelector('input[name="Title"]')
		const authorInput = container.querySelector('input[name="Author"]')
		const urlInput = container.querySelector('input[name="Url"]')
		const createButton = screen.getByText('create')

		await user.type(titleInput, inputBlog.title)
		await user.type(authorInput, inputBlog.author)
		await user.type(urlInput, inputBlog.url)
		await user.click(createButton)

		expect(addBlog.mock.calls).toHaveLength(1)
		expect(addBlog.mock.calls[0][0]).toEqual(inputBlog)
	})
})

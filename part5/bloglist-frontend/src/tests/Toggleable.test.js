import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from '../components/Toggleable'

const child = (<div className='child'>child</div>)

describe('<Toggleable />', () => {
	let container

	beforeEach(() => {
		container = render (
			<Toggleable showText='show' hideText='hide'>
				{child}
			</Toggleable>).container
	})

	test('renders its children', async () => {
		const childDiv = container.querySelector('.child')
		expect(childDiv).toBeDefined()
	})

	test('initially doesnt display children', async () => {
		const div = container.querySelector('.toggleableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('displays children after clicking show', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('show')
		await user.click(button)

		const div = container.querySelector('.toggleableContent')
		expect(div).not.toHaveStyle('display: none')
	})

	test('shown content can be hidden again', async () => {
		const user = userEvent.setup()
		const showButton = screen.getByText('show')
		const hideButton = screen.getByText('hide')
		await user.click(showButton)
		await user.click(hideButton)

		const div = container.querySelector('.toggleableContent')
		expect(div).toHaveStyle('display: none')
	})
})
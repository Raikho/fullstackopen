import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, refs) => {
	const { showText, hideText, children } = props
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: (visible) ? 'none' : 'block' }
	const showWhenVisible = { display: (visible) ? 'block' : 'none' }
	const toggleVisibility = () => setVisible(!visible)

	useImperativeHandle(refs, () => {return {toggleVisibility}})

	return (
		<span>
			<button style={hideWhenVisible} onClick={toggleVisibility} className='show-button'>
				{showText || 'show'}
			</button>
			<span style={showWhenVisible} className='toggleableContent'>
				<button onClick={toggleVisibility} className='hide-button'>{hideText || 'cancel'}</button>
				{children}
			</span>
		</span>
	)
})

Toggleable.propTypes = {
	showText: PropTypes.string.isRequired,
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
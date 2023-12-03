import { useSelector } from 'react-redux'

const Notification = () => {
	const { message, status } = useSelector(state => state.notification)

	if (status === 'hidden') return null
	if (status === 'success') return <div className='message success'>{message}</div>
	if (status === 'error') return <div className='message error'>Error: {message}</div>
	return <div>STATUS HAS AN ERROR!</div> // debug
}

export default Notification

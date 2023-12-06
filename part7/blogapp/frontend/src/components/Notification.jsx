import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
	const { message, status } = useSelector(state => state.notification)

	if (status === 'hidden') return null
	if (status === 'success') return <Alert className='message success'>{message}</Alert>
	if (status === 'error') return <Alert className='message error'>Error: {message}</Alert>
	return <div>STATUS HAS AN ERROR!</div> // debug
}

export default Notification

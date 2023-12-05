import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
	const { id } = useParams()
	const user = useSelector(state => state.userList.find(user => user.id === id))

	return (
		<>
			<h1>{user.name}</h1>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map(blog => (
					<li className='decorated' key={blog.id}>
						{blog.title}
					</li>
				))}
			</ul>
		</>
	)
}

export default User

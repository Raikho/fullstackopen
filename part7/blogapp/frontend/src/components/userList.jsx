import { useState, useEffect } from 'react'
import userService from '../services/users'

const UserList = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		userService.getAll().then(res => setUsers(res))
	}, [])

	return (
		<>
			<h1>Users</h1>
			<table>
				<tbody>
					<tr>
						<th>User</th>
						<th>Blogs created</th>
					</tr>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default UserList

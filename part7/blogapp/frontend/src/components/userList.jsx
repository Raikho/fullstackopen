import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsersList } from '../reducers/userListReducer'
import { Table } from 'react-bootstrap'

const UserList = () => {
	const dispatch = useDispatch()
	const userList = useSelector(state => state.userList)

	useEffect(() => {
		dispatch(initializeUsersList())
	}, [])

	return (
		<>
			<h1>Users</h1>
			<Table striped>
				<tbody>
					<tr>
						<th>User</th>
						<th>Blogs created</th>
					</tr>
					{userList.map(user => (
						<tr key={user.id}>
							<td>
								<Link to={`./${user.id}`}>{user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default UserList

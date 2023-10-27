const PersonDisplay = ({ persons }) => (
	<table>
		<tbody>
			{persons.map(person => (
				<tr key={person.name}>
					<td>{person.name}</td>
					<td>{person.number}</td>
				</tr>
			))}
		</tbody>
	</table>
)

export default PersonDisplay
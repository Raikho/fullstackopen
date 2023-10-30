const Display = ({ stats }) => {
	return (
		<>
			<h1>{stats.name}</h1>
			<div>capital {stats.capital}</div>
			<div>area {stats.area}</div>
			<br />
			<h3>languages:</h3>
			<ul>
				{stats.languages.map((language, index) => (
					<li key={index}>{language}</li>
				))}
			</ul>
			<img src={stats.flag} alt={stats.altFlag} />
		</>
	)
}

export default Display
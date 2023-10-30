const Display = ({ stats }) => {
	return (
		<>
			<h1>{stats.name}</h1>
			<div>capital {stats.capital}</div>
			<div>area {stats.area}</div>
			<br />
			<h3>languages</h3>
			{/* {stats.languages.map((language, index) => (
				<div key={index}>{language}</div>
			))} */}
			<img src={stats.flag} alt={stats.altFlag} />
		</>
	)
}

export default Display
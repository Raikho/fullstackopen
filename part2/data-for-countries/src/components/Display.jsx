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
			<h3>Weather in {stats.capital}</h3>
			<div>temperature {stats.temp} Celcius</div>
			<img src={stats.iconUrl} alt={'weather icon'} />
			<div>wind {stats.wind} m/s</div>
		</>
	)
}

export default Display
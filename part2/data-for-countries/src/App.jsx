import { useState, useEffect } from 'react'
import CountryService from './services/countries'
import Display from './components/Display'

function App() {
	const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
	const [countryList, setCountryList] = useState(null)
	const [stats, setStats] = useState(null)

	useEffect(() => {
		CountryService
			.getAll()
			.then(data => {
				setCountryList(data.map(country => country.name.common));
			})
	}, [])

	useEffect(() => {
		if (!countryList) return

		console.log('query: ', query); // debug
		const filteredList = countryList.filter(country => 
			country.toLowerCase().includes(query.toLowerCase())
		);
		console.log('filtered list: ', filteredList); // debug
		setCountries(filteredList)

		if (filteredList.length === 1) {
			const country = filteredList[0]
			if (countries.length === 1 && countries[0] === country)
				return
			CountryService
				.find(filteredList[0])
				.then(data => {
					console.log(`${filteredList[0]} data:`, data);
					setStats({
						name: data.name.common,
						capital: data.capital,
						area: data.area,
						// languages: Object.values(data.languages),
						flag: data.flags.png,
						altFlag: data.flags.alt
					})
				})
		}
	}, [query, countryList])

	useEffect(() => console.log(stats), [stats]) // debug


	const handleQuery = event => {
		setQuery(event.target.value);
	}

	const display = () => {
		if (countries.length > 10)
			if (query !== '')
				return <div>Too many countries found</div>
			else
				return null
		else if (countries.length == 0)
			return <div>No countries found</div>
		else if (countries.length == 1 && stats && stats.name === countries[0])
			return <Display stats={stats}/>
		else
			return countries.map((country, index) => (
				<div key={index}>{country}</div>
			))
	}

  return (
    <>
      <span>find countries</span>
      <input onChange={handleQuery} />
			{display()}
    </>
  )
}

export default App

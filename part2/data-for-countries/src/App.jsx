import { useState, useEffect } from 'react'
import CountryService from './services/countries'
import WeatherService from './services/weather'
import Display from './components/Display'

const isIncluded = (s1, s2) => s1.toLowerCase().includes(s2.toLowerCase())

function App() {
	const [country, setCountry] = useState(null)
	const [countryList, setCountryList] = useState(null)
	const [filter, setFilter] = useState('')
	const [filterList, setFilterList] = useState([])
	const [stats, setStats] = useState(null)


	useEffect(() => {
		console.log('gathering initial country list...') // debug
		CountryService
			.getAll()
			.then(data => {
				setCountryList(data.map(country => country.name.common));
				console.log('...gathered initial country list') // debug
			})
	}, [])

	useEffect(() => {
		if (!countryList) return
		console.log(`filtering countries with filter "${filter}"...`) // debug
		setFilterList(countryList.filter(country => isIncluded(country, filter)))
	}, [filter])

	useEffect(() => {
		if (filterList.length === 1)
			setCountry(filterList[0])
		else if (country)
			setCountry(null)
	}, [filterList])

	useEffect(() => {
		if (!country) return
		console.log(`gathering country stats of ${country}...`) // debug
		
		CountryService
			.find(country)
			.then(data => {
				setStats({
					name: data.name.common,
					capital: data.capital,
					area: data.area,
					languages: Object.values(data.languages),
					flag: data.flags.png,
					altFlag: data.flags.alt,
				})
			})
	}, [country])

	useEffect(() => {
		if (!stats) return

		WeatherService
			.get(stats.capital)
			.then(res => console.log('weather response', res)) // todo
	}, [stats])

	const display = () => {
		if (country && stats && stats.name === country)
			return <Display stats={stats}/>
		else if (filterList.length > 10)
			return (filter !== '') ? <div>Too many countries found</div> : null
		else if (filterList.length == 0)
			return <div>No countries found</div>
		else
			return filterList.map(country => (
				<div key={country}>
					<span>{country}</span>
					<button onClick={() => setCountry(country)}>show</button>
				</div>
			))
	}

  return (
    <>
      <span>find countries</span>
      <input onChange={e => setFilter(e.target.value)} />
			{display()}
    </>
  )
}

export default App

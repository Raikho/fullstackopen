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

		const gatherData = async () => {
			const data = await CountryService.getAll();
			setCountryList(data.map(country => country.name.common));
		}
		gatherData();
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

		const getData = async () => {
			const countryData = await CountryService.find(country);
			console.log('country data: ', countryData) // debug
			const weatherData = await WeatherService.get(countryData.capital);
			console.log('weather data: ', weatherData) // debug
			
			setStats({
				name: countryData.name.common,
				capital: countryData.capital,
				area: countryData.area,
				languages: Object.values(countryData.languages),
				flag: countryData.flags.png,
				altFlag: countryData.flags.alt,
				temp: weatherData.main.temp,
				wind: weatherData.wind.speed,
				iconUrl: WeatherService.getIconUrl(weatherData.weather[0].icon),
			})
		}
		getData()
		
	}, [country])

	const display = () => {
		if (country && stats && stats.name == country)
			return <Display stats={stats} />
		else if (filter === '')
			return null
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

import { useState, useEffect } from 'react'

function App() {
  const [countries, setCountries] = useState([])

	useEffect(() => {
		setCountries(['country1', 'country2'])
	}, [])


  return (
    <>
      <span>find countries</span>
      <input />
			{countries.map((country, index) => (
				<div key={index}>{country}</div>
			))}
    </>
  )
}

export default App

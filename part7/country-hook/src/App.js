import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (inputName) => {
  const [name, setName] = useState(null)
  const [found, setFound] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!inputName) return

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${inputName}`)
      .then(res => {
        setData({
          name: res.data.name.common,
          capital: res.data.capital[0],
          population: res.data.population,
          flag: res.data.flags.png,
        })
        setFound(true)
      })
      .catch(err => {
        console.log('ERROR: ', err)
        setFound(false)
      })
      .finally(() => setName(inputName))
  }, [inputName])

  return { name, found, data }
}

const Country = ({ country }) => {
  if (!country.name) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    console.log('fetching...') // debug
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PrefetchPageLinks } from 'react-router-dom'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry({ data: response.data, found: true })
      })
      .catch(() => setCountry({ data: null, found: false }))
  }, [name])

  return country
}

const Country = ({ country }) => {
  // const country = props.data
  console.log(country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }
  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={`${country.data.flags.png}`}
        height='100'
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  console.log(country)

  const fetch = e => {
    e.preventDefault()
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

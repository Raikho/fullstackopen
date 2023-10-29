import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonDisplay from './components/PersonDisplay'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
      .catch(err => {
        console.log(err)
        alert('error: phonebook database was not able to be retreived')
      })
  }, [])

  const handleChangeName = event => {
    console.log('name: ', event.target.value); //debug 
    setNewName(event.target.value);
  }
  const handleChangeNumber = event => {
    console.log('number: ', event.target.value); //debug
    setNewNumber(event.target.value); 
  }

  const handleChangeFilter = event => {
    console.log('filter: ', event.target.value); //debug
    setNewFilter(event.target.value);
  }

  const addPerson = event => {
    event.preventDefault();
    if (newName === '') return;

    if (persons.map(person => person.name).includes(newName))
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
        return editNumber()
      else
        return

    const personObject = {name: newName, number: newNumber};
    personService
      .create(personObject)
      .then(data => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
      })
      .catch(err => {
        console.log(err)
        alert(`${newName} was not able to be added to the database`)
      })
  }

  const editNumber = () => {
    const personObject = {name: newName, number: newNumber}
    const id = persons.find(person => person.name === newName).id
    
    personService
      .update(personObject, id)
      .then(data => {
        setPersons(persons.map(p => p.id === id ? data : p))
        setNewName('');
        setNewNumber('');
      })
      .catch(err => {
        console.log(err)
        alert(`${newName} was not found in the databse`)
      })
  }

  const deletePerson = id => {
    const name = persons.find(person => person.id === id).name
    if (!window.confirm(`Delete ${name}?`)) return

    personService
      .remove(id)
      .then(() => {
        const newPersons = [...persons].filter(person => person.id !== id)
        setPersons(newPersons)
      })
      .catch(err => {
        console.log(err)
        alert(`${name} was already deleted from the server`)
      })
  }

  const personsToShow = (newFilter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleChangeFilter={handleChangeFilter} 
        newFilter={newFilter} 
      />

      <h3>add a new</h3>
      <PersonForm 
        handleSubmit={addPerson}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <PersonDisplay 
        persons={personsToShow} 
        handleDelete={deletePerson}
      />
    </div>
  )
}

export default App

import axios from 'axios'
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
      return alert(`${newName} is already added to phonebook`);

    const personObject = {name: newName, number: newNumber};
    personService
      .create(personObject)
      .then(data => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
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
      <PersonDisplay persons={personsToShow} />
    </div>
  )
}

export default App

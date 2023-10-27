import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonDisplay from './components/PersonDisplay'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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

    const newPersons = [...persons];
    newPersons.push({ name: newName, number: newNumber })
    setPersons(newPersons);

    setNewName('');
    setNewNumber('');
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

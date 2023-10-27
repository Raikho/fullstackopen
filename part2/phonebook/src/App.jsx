import { useState } from 'react'

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
      <div>filter shown with 
        <input onChange={handleChangeFilter} value={newFilter}/>
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
        name: <input onChange={handleChangeName} value={newName}/>
        number: <input onChange={handleChangeNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <div key={person.name}>{`${person.name} ${person.number}`}</div>
      ))}
    </div>
  )
}

export default App

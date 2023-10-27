import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChangeName = event => {
    console.log('name: ', event.target.value); //debug 
    setNewName(event.target.value);
  }
  const handleChangeNumber = event => {
    console.log('number: ', event.target.value); //debug
    setNewNumber(event.target.value); 
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => (
        <div key={person.name}>{`${person.name} ${person.number}`}</div>
      ))}
    </div>
  )
}

export default App

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleChangeName = event => {
    console.log(event.target.value); //debug 
    setNewName(event.target.value);
  }

  const addNote = event => {
    event.preventDefault();
    if (newName === '' || persons.map(person => person.name).includes(newName))
      return;

    const newPersons = [...persons];
    newPersons.push({ name: newName })
    setPersons(newPersons);

    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input onChange={handleChangeName} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  )
}

export default App

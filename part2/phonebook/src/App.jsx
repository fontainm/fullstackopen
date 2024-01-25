import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newName);
    if (person) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('');
  }

  const handlePersonChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App
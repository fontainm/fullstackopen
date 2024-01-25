import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, change }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={change} />
    </div>
  )
}

const PersonForm = ({ submit, name, changeName, number, changeNumber }) => {
  return (
    <form onSubmit={submit}>
      <div>
        <div>
          name: <input value={name} onChange={changeName} />
        </div>
        <div>
          number: <input value={number} onChange={changeNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find((person) => person.name === newName)
    if (person) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    axios.post('http://localhost:3001/persons', newPerson).then((response) => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} change={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        submit={addPerson}
        name={newName}
        changeName={handleNameChange}
        number={newNumber}
        changeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App

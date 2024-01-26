import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')

  const handleInputChange = (event) => {
    event.preventDefault()
    setInput(event.target.value)
  }

  return (
    <div>
      find countries: <input value={input} onChange={handleInputChange} />
    </div>
  )
}

export default App

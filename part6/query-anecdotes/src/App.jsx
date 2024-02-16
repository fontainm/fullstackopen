import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  return action
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  const queryClient = useQueryClient()

  const updateNoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
    updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch(`Voted for '${anecdote.content}'`)
    setTimeout(() => {
      notificationDispatch('')
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm dispatch={notificationDispatch} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  hideNotification,
  showNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()
  const vote = (id) => {
    const anecdoteToChangeIndex = anecdotes.findIndex((a) => a.id === id)
    const anecdoteToChange = anecdotes[anecdoteToChangeIndex]
    dispatch(voteAnecdote(id, anecdoteToChange))
    const content = anecdoteToChange.content
    dispatch(showNotification(`Voted for '${content}'`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList

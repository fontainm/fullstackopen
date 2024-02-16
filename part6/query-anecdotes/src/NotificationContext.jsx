import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  return action
}

const CounterContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <CounterContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </CounterContext.Provider>
  )
}

export default CounterContext

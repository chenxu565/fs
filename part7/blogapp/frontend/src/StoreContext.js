import { createContext, useContext, useReducer } from 'react'

const initialState = {
  notice: { message: null, type: null },
}

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTICE':
      return { ...state, notice: action.payload }
    case 'CLEAR_NOTICE':
      return { ...state, notice: { message: null, type: null } }
    default:
      return state
  }
}

const StoreContext = createContext()

export const StoreContextProvider = (props) => {
  const [state, dispatch] = useReducer(storeReducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useStoreValue = () => {
  const context = useContext(StoreContext)
  return context.state
}

export const useStoreDispatch = () => {
  const context = useContext(StoreContext)
  return context.dispatch
}

export const useNotifyWith = () => {
  const dispatch = useStoreDispatch()
  return (message, type = 'success') => {
    dispatch({ type: 'SET_NOTICE', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTICE' })
    }, 3000)
  }
}

export default StoreContext

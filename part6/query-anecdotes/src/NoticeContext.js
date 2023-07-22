import { createContext, useReducer, useContext } from 'react'

const NoticeContext = createContext()

const noticeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTICE':
      return action.payload
    case 'CLEAR_NOTICE':
      return ''
    default:
      return state
  }
}

export const NoticeProvider = ({ children }) => {
  const [notice, noticeDispatch] = useReducer(noticeReducer, '')

  return (
    <NoticeContext.Provider value={[ notice, noticeDispatch ]}>
      {children}
    </NoticeContext.Provider>
  )
}

export const useNoticeValue = () => {
  const noticeAndDispatch = useContext(NoticeContext)
  return noticeAndDispatch[0]
}

export const useNoticeDispatch = () => {
  const noticeAndDispatch = useContext(NoticeContext)
  return noticeAndDispatch[1]
}

export default NoticeContext
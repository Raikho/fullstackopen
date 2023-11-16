import { createContext, useReducer, useContext } from 'react';

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

const NoteContext = createContext()

export const NoteContextProvider = (props) => {
  const [note, noteDispatch] = useReducer(noteReducer, '')

  return (
    <NoteContext.Provider value={[note, noteDispatch]}>
      {props.children}
    </NoteContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNoteValue = () => {
  const valueAndDispatch = useContext(NoteContext)
  return valueAndDispatch[0]
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNoteReducer = () => {
  const valueAndDispatch = useContext(NoteContext)
  return valueAndDispatch[1]
}

export default NoteContext
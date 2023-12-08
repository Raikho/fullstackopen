import { useContext } from 'react'
import { NoteContext } from '../App'

const Notification = () => {
  const { note, setNote } = useContext(NoteContext)

  if (note !== '') {
    console.log(note)
    setTimeout(() => setNote(''), 3000)
  }

  return <div style={{ color: 'red' }}>{note}</div>
}

export default Notification

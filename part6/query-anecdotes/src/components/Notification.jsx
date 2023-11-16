import { useNoteValue } from "../NoteContext"

const Notification = () => {
  const note = useNoteValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (note === '') return null

  return (
    <div style={style}>
      {note}
    </div>
  )
}

export default Notification

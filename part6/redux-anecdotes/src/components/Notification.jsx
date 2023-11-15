import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  const style = {
    border: 'solid',
    borderRadius: 4,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'lightgray',
  }
  
  if (notification === null)
    return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
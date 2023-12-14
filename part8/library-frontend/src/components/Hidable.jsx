import { NoteContext } from '../App'
import { useContext } from 'react'

const Hidable = props => {
  const { showOn, children } = props
  const { token } = useContext(NoteContext)

  if (token && showOn === 'loggedIn') {
    return <>{children}</>
  }

  if (!token && showOn === 'loggedOut') {
    return <>{children}</>
  }

  return null
}

export default Hidable

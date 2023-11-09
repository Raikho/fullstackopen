import { useState } from 'react'

const Toggleable = ({ showText, hideText, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = (visible) ? 'hidden' : ''
  const showWhenVisible = (visible) ? '' : 'hidden'
  const toggleVisibility = () => setVisible(!visible)

  return (
    <span>
      <button className={hideWhenVisible} onClick={toggleVisibility}>
        {showText || 'show'}
      </button>
      <span className={showWhenVisible}>
        <button onClick={toggleVisibility}>{hideText || 'cancel'}</button>
        {children}
      </span>
    </span>
  )
}

export default Toggleable
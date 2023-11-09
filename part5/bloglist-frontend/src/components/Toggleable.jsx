import { useState } from 'react'

const Toggleable = ({ showText, hideText, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = (visible) ? 'hidden' : ''
  const showWhenVisible = (visible) ? '' : 'hidden'
  const toggleVisibility = () => setVisible(!visible)

  return (
    <div>
      <button className={hideWhenVisible} onClick={toggleVisibility}>
        {showText || 'show'}
      </button>
      <div className={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{hideText || 'cancel'}</button>
      </div>
    </div>
  )
}

export default Toggleable
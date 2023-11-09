import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, refs) => {
  const { showText, hideText, children } = props
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = (visible) ? 'hidden' : ''
  const showWhenVisible = (visible) ? '' : 'hidden'
  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {return {toggleVisibility}})

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
})

export default Toggleable
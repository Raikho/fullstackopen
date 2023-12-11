const save = (tag, object) => {
  window.localStorage.setItem(tag, JSON.stringify(object))
}

const load = tag => {
  const json = window.localStorage.getItem(tag)
  if (!json) return null
  return JSON.parse(json)
}

const remove = tag => {
  window.localStorage.removeItem(tag)
}

const clear = () => {
  localStorage.clear()
}

const storage = { save, load, remove, clear }

export default storage

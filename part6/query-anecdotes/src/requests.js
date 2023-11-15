import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(res => res.data)
}

const create = object => {
  return axios
    .post(baseUrl, object)
    .then(res => res.data)
}

const replace = object => {
  return axios
    .put(`${baseUrl}/${object.id}`, object)
    .then(res => res.data)
}

export default { getAll, create, replace }
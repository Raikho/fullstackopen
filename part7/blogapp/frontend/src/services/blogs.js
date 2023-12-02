import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => token = `Bearer ${newToken}`

const create = async newObject => {
	const config = { headers: { Authorization: token } }
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = async updatedObject => {
	const config = { headers: { Authorization: token } }
	const url = `${baseUrl}/${updatedObject.id}`
	const response = await axios.put(url, updatedObject, config)
	return response.data
}

const remove = async id => {
	const config = { headers: { Authorization: token } }
	const url = `${baseUrl}/${id}`
	const response = await axios.delete(url, config)
	return response.data
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

export default { setToken, getAll, create, update, remove }
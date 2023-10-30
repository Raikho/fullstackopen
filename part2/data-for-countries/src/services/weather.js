import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const key = 'bba6f56f2dcd34db5581285bb884ee36'

const get = city => {
    const req = axios.get(`${baseUrl}?q=${city}&APPID=${key}`)
    return req.then(res => res.data)
}

export default { get }
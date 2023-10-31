import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const key = import.meta.env.VITE_WEATHER_KEY

const iconBaseUrl = 'https://openweathermap.org/img/wn/'

const get = city => {
    const req = axios.get(`${baseUrl}?q=${city}&APPID=${key}&units=metric`)
    return req.then(res => res.data)
}

const getIconUrl = code => {
    return `${iconBaseUrl}${code}@2x.png`
}

export default { get, getIconUrl }
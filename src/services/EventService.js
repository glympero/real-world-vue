import axios from 'axios'

const url = 'https://my-json-server.typicode.com/glympero/events-list'

const apiClient = axios.create({
  baseURL: url,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEventId(id) {
    return apiClient.get(`events/${id}`)
  },
}

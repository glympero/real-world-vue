import axios from 'axios'

// const url = 'https://my-json-server.typicode.com/glympero/events-list'
const url = 'https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router'

const apiClient = axios.create({
  baseURL: url,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },
  getEventId(id) {
    return apiClient.get(`events/${id}`)
  },
}

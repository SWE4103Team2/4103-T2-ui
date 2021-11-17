import axios from 'axios';

// Creates Axios Connection to API
const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { 'Access-Control-Allow-Origin': '*' }
})

export default api;
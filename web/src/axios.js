import axios from "axios"
import {Message} from "element-ui"
import router from "./router"

const http = axios.create({
  baseURL: 'http://localhost:3000/user'
})

http.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.elementToken
  return config
})

http.interceptors.response.use(res => {
  return res
}, err => {
  if(err.response) {
    if(err.response.status === 600) {
      router.push('/login')
    } else {
      Message.error(err.response.data)
    }
  } else {
    router.push('/404')
  }
})

export default http
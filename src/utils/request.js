import axios from 'axios'

// create axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api ase_url
  timeout: 15000 // expire time
})

// request catcher
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // custom token
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone catcher
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      console.log(res)
      return Promise.reject(new Error('error in connection'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service

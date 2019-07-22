export default function({ $axios, store }) {
  $axios.interceptors.request.use(request => {
    if(store.state.auth.token && !request.headers.common['Authorization']) {
    const token = store.state.auth.token
      request.headers.common['Authorization'] = `Bearer ${token}`
    }
    return request
  })
}

import Axios from "axios"
import { error } from "console"

let urls = {
    test: `${process.env.NEXT_PUBLIC_FRONTEND} || http://localhost:3000`,
    development: `${process.env.NEXT_PUBLIC_FRONTEND} || http://localhost:3000`,
    production: `${process.env.NEXT_PUBLIC_FRONTEND} || http://localhost:3000`,
}

const api=Axios.create({
    baseURL: urls[process.env.NODE_ENV || 'development'],
    headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
})

api.interceptors.request.use((config)=>{
    const tokenStorage = JSON.parse(localStorage.getItem('accessToken') as string)
    if(localStorage.getItem('accessToken')){
        config.headers['Authorization']='Bearer '+tokenStorage
    }
    return config
},
error => {
    Promise.reject(error)
}
)

export default api
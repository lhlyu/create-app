import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000
})

// 拦截请求
instance.interceptors.request.use(config => {
    return config
})

const handlerResponce = () => {
    if (window.location.hash !== '#/') {
        window.location.replace('/')
    }
    return {
        code: 1,
        msg: '',
        data: null
    }
}

// 拦截响应
instance.interceptors.response.use(response => {
    if (response.status !== 200 || !response.data) {
        return {
            code: 1,
            msg: '',
            data: null
        }
    }
    const result = response.data
    return result
})

export default instance

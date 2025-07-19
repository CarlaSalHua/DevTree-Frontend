import axios from "axios";

const devtreeAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

devtreeAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default devtreeAPI;
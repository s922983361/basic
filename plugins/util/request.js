/**
 * @desc  Customer Module Axios reuest * 
 * Just for third module which needed to use axios request 
 * @nuxt/axios module is used by default setting in nuxt so we need to extend another request usage 
 */
import axios from 'axios'
import { getToken } from './token'

const service = axios.create({
    baseURL: '/api/', // it'sauto to add prefix '/api/' in every request
    //withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

service.interceptors.request.use( config => {        
    // do something before request is sent
    config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; application/json';    
    config.headers.common['Authorization'] = getToken()
    return config    
}, error => {    
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
})

service.interceptors.response.use( response => {      
    if(response.data.success == false){        
        console.log("請求失敗");        
        return;      
    }          
    return response    
}, err => {      
    if (err && err.response) {         
        switch (err.response.status) {              
            case 400: err.message = '請求錯誤(400)'; break;              
            //case 401: return history.push('/admin/register'); break;
            case 401: err.message = '未經驗證(401)'; break;              
            case 403: err.message = '拒絕訪問(403)'; break;              
            case 404: err.message = '請求出錯(404)'; break;              
            case 408: err.message = '請求超時(408)'; break;              
            case 500: err.message = '服務器錯誤(500)'; break;              
            case 501: err.message = '服務器未實現(501)'; break;              
            case 502: err.message = '網路錯誤(502)'; break;              
            case 503: err.message = '服務不可用(503)'; break;              
            case 504: err.message = '網路超時(504)'; break;              
            case 505: err.message = 'HTTP版本不受支持(505)'; break;              
            default: err.message = `連接出錯(${err.response.status})!`;          
        }     
    } else {          
        err.message = '連接服務器失敗!'      
    }   
    console.log(err.message);      
    return Promise.reject(err);    
})

export default service
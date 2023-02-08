import axios from "axios";

const instance = axios.create({
    // baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
    baseURL: 'http://192.168.1.5/msaas/api/',
    // baseURL: 'https://msaasbackend.oaknetbusiness.com/api/',

    timeout: 30000,
});
export default instance

const responseBody = (response) => response.data;

export const requests={
    get:(url,headers)=>instance.get(url,headers).then(responseBody),
    delete:(url,headers)=>instance.delete(url,headers).then(responseBody),
    post:(url,body,headers)=>instance.post(url,body,headers).then(responseBody),
    put:(url,body,headers)=>instance.put(url,body,headers).then(responseBody)
}
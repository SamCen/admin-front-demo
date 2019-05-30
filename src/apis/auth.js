import axios from 'axios';

export default {
    /**
     * 登录
     * @param params
     * @returns {AxiosPromise<any>}
     */
    login(params){
        return axios.post('backend/auth/login', params);
    }
}

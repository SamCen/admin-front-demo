import axios from 'axios';

export default {
    /**
     * 用户列表
     * @param params
     * @returns {AxiosPromise<any>}
     */
    list(params){
        return axios.get('backend/user',{
            params:params,
        });
    },
}

import axios from 'axios';

export default {
    /**
     * 用户列表
     * @param params
     * @returns {AxiosPromise<any>}
     */
    index(params){
        return axios.get('backend/user',{
            params:params,
        });
    },

    /**
     * 用户详情
     * @param id
     * @returns {AxiosPromise<any>}
     */
    show(id){
        return axios.get(`backend/user/${id}`)
    }
}

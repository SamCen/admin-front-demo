import axios from 'axios';

export default {
    /**
     * 角色列表
     * @param params
     * @returns {AxiosPromise<any>}
     */
    index(params){
        return axios.get('backend/role',{
            params:params,
        });
    },

    /**
     * 角色详情
     * @param id
     * @returns {AxiosPromise<any>}
     */
    show(id){
        return axios.get(`backend/role/${id}`)
    }
}

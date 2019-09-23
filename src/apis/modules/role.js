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
     * 添加角色
     * @param params
     * @returns {AxiosPromise<any>}
     */
    create(params){
        return axios.post('backend/role',params);
    },

    /**
     * 角色详情
     * @param id
     * @param params
     * @returns {AxiosPromise<any>}
     */
    show(id,params){
        return axios.get(`backend/role/${id}`,{params})
    },

    /**
     * 更新角色权限
     * @param id
     * @param renew
     * @returns {AxiosPromise<any>}
     */
    updatePri(id,renew){
        return axios.put(`backend/updatePri/${id}`,{renew})
    },
}

import axios from 'axios';
import auth from '@/apis/modules/auth';
import user from '@/apis/modules/user';
import role from '@/apis/modules/role';
import privilege from '@/apis/modules/privilege';
import store from '@/store';


axios.defaults.baseURL = process.env.VUE_APP_URL;

axios.interceptors.request.use(config => {
    const access_token = store.state.auth.access_token;
    if (access_token) {
        config.headers.Accept = 'application/json';
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
/**
 * 导出API
 */
export default {
    auth,
    user,
    role,
    privilege,
}

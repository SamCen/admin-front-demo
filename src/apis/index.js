import axios from 'axios';
import auth from './auth';
import store from '../store';


axios.defaults.baseURL = 'http://api.admin.com/';

axios.interceptors.request.use(config => {
    const access_token = store.state.auth.access_token;

    if (access_token) {
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
}

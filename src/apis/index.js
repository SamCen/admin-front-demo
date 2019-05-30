import axios from 'axios';
import auth from './auth';



axios.defaults.baseURL = 'http://api.admin.com/';
/**
 * 导出API
 */
export default {
   auth,
}

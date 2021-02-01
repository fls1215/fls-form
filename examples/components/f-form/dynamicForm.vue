//axios.js
/**
 *
 * http配置
 *
 */
import axios from 'axios';
import router from './router';
import store from '../store';
import { message } from './../resetMessage';
import errorCode from '@/const/errorCode';
import mock from '@/api/mock/mock';

// 设置超时时间为60秒
axios.defaults.timeout  = 60000;
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// 重新请求标志位，避免无限循环请求
axios.defaults.isRetryRequest = false;

axios.defaults.validateStatus = function validateStatus(status) {
  return /^(2|3)\d{2}$/.test(status) || status === 401;
};

// 刷新token的状态 0-未刷新 1-正在刷新 2-刷新失败
let refreshingTokenStatus = 0;
// 设置请求默认前缀
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;



/**
 * 刷新token处理
 * @param config axios对象
 * @returns {Promise<*>}
 */
async function handleRefreshToken(config) {
  console.log("开始刷新token",config);
  let resultData = null;
  // 第一次发起的请求401才能请求token
  if (!config.isRetryRequest) {
    // 存在请求正在刷新token，定时查看刷新状态，等待刷新结束
    if (refreshingTokenStatus === 1) {
      // 添加promise和await保证定时器同步
      const refreshRequest = new Promise((resolve, reject) => {
        const timer = setInterval(() => {
          // 请求token成功，重新请求之前失败的请求
          if (refreshingTokenStatus === 0) {
            clearInterval(timer);
            // 重新设置token
            config.headers.Authorization = `Bearer ${store.getters.accessToken}`
            /*
             这边不需要baseURL是因为会重新请求url
             url中已经包含baseURL的部分了
             如果不修改成空字符串，会变成'api/api/xxxx'的情况
             */
            config.baseURL = '';
            // 重新请求
            axios(config).then(res => {
              resolve(res);
            }).catch(error => {
              reject(error);
            });
            // 请求token失败，清除定时器
          } else if (refreshingTokenStatus === 2) {
            clearInterval(timer);
          }
        }, 100);
      });
      await refreshRequest.then(res => {
        resultData = res;
      })
      // 不存在正在刷新token的请求，刷新token并重新请求
    }
    else {
      // 标识当前token状态为正在刷新
      refreshingTokenStatus = 1;
      // 标识该请求为失败后重新发起的请求
      config.isRetryRequest = true;
      await store.dispatch('RefreshToken')
        .then(() => {
          // 重新设置token
          config.headers.Authorization = `Bearer ${store.getters.accessToken}`
          /*
           这边不需要baseURL是因为会重新请求url
           url中已经包含baseURL的部分了
           如果不修改成空字符串，会变成'api/api/xxxx'的情况
           */
          config.baseURL = '';
          // 重新请求
          return axios(config);
        }).then((res) => {
          // 重置是否正在刷新Token标识
          refreshingTokenStatus = 0;
          resultData = res;
        }).catch((error) => {
          // 标识当前token状态为刷新失败
          refreshingTokenStatus = 2;
        });
    }
    // 重新请求过的请求如token还是无效，无法再次刷新token
  } else {
    toLogin();
  }
  return resultData;
}


/**
 * 错误处理，自动跳转登录页并提示
 */
function toLogin(){
  message.error('登录信息过期，请重新登录')

  // 刷新失败跳转登录页面
    pathStr ='/login';
  store.dispatch('FedLogOut').then(dd => {
    router.push({ path: pathStr });
  });
}


// HTTPrequest拦截
axios.interceptors.request.use((config) => {
  if (store.getters.accessToken) {
    if (!config.headers.Authorization) {
      // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      config.headers.Authorization = `Bearer ${store.getters.accessToken}`;
    }
  }

   config.headers['Priority-Host'] =process.env.VUE_APP_LOCA_ADDR;

  if (mock.enabled && process.env.NODE_ENV === 'development'){
    const proxy = mock.proxy;
    for (let i = 0; i < proxy.length; i++) {
      // 匹配到需要mock的接口，替换服务端地址为mock服务器地址
      if(proxy[i].url === config.url && proxy[i].method === config.method) {
        config.baseURL  = mock.apiPPrefix + mock.repositoryId;
        break;
      }
    }
  }
  console.log("发起访问请求：",config,' huangjing: ',process.env.NODE_ENV," basurl:",process.env.VUE_APP_BASE_URL);
  return config;
}, error => Promise.reject(error));


// HTTPresponse拦截
axios.interceptors.response.use(async (data) => {
  let resultData = data;
  const { msg, code } = data.data;
  const { status, config } = data;
  // token过期或被替换
  if(status === 200) {
    if(code > 0) {
      if (code === 403) { // token无效或过期
        resultData = handleRefreshToken(config);
      } else if (code === 406||code===401) { // 刷新token无效或过期
        toLogin();
        return false;
      }
      else {
        message.error(msg || errorCode.default);
      }
    }
  }else if(status == 401){
    resultData = handleRefreshToken(config);
  }
  // // token 过期无效去登录页面
  // if(status === 401) {
  //   resultData = handleRefreshToken(config);
  //
  // }
  return resultData;
}, (error) => {
  if (error && error.response) {
    const { status } = error.response;

    if (status) {
      message.error(errorCode[status] || errorCode.default);

    }
  }
  return Promise.reject(new Error(error));
});


export default axios;

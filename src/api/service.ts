import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import { getToken, verify } from "../util";

axios.interceptors.request.use((request: AxiosRequestConfig) => {
  request.baseURL = `${process.env.REACT_APP_ORIGIN}:${process.env.REACT_APP_PORT}`,
  request.timeout = 20000,
  request.headers = {
    ...request.headers,
    'authorization': `Bearer ${getToken()}`
  }
  return request;
})

// 响应拦截 验证token是否过期
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理数据
    return response;
  },
  async (err) => {
    if (err.response.status === 401) {
      await localStorage.removeItem('userInfo');
      await verify();
    }
  }
);

export const get = <T>(url: string, params?: any): Promise<T> => {
  return new Promise((resolve, rejects) => {
    axios({
      method: "get",
      url,
      params,
    }).then((res) => {
      resolve(res.data.data);
    }).catch((err) => {
      rejects(err);
    });
  });
};

export const post = <T>(url: string, data?: any, config = {}): Promise<T> => {
  return new Promise((resolve, rejects) => {
    axios({
      method: "post",
      url,
      data,
      ...config,
    })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        rejects(err.response.data);
      });
  });
};

export const deleteAction = <T>(url: string, data?: any, config = {}): Promise<T> => {
  return new Promise((resolve, rejects) => {
    axios({
      method: "delete",
      url,
      data,
      ...config,
    })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        rejects(err);
      });
  });
};
export const put = <T>(url: string, data?: any, config = {}): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url,
      data,
      ...config,
    })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Packages
import axios, { AxiosInstance } from 'axios';

// Services
/**
 * NOTE: This service is using revealing module design pattern.
 * Revealing module pattern is a design pattern, which let you organise your javascript code in modules,
 * and gives better code structure. It gives you power to create public/private variables/methods (using closure),
 * and avoids polluting global scope (If you know how to avoid that).
 *
 * @see: https://medium.com/@Rahulx1/revealing-module-pattern-tips-e3442d4e352#:~:text=Revealing%20module%20pattern%20is%20a,know%20how%20to%20avoid%20that).
 */

export const axiosApiService = (function () {
    const getServicePayload = (axiosInstance) => ({
        get: (url, options = {}) => axiosInstance.get(url, { ...options }),
        post: (url, data, options = {}) =>
            axiosInstance.post(url, data, { ...options }),
        put: (url, data, options = {}) =>
            axiosInstance.put(url, data, { ...options }),
        patch: (url, data, options = {}) =>
            axiosInstance.patch(url, data, { ...options }),
        delete: (url, options = {}) =>
            axiosInstance.delete(url, { ...options }),
    });

    const apiCoreServiceInstance = axios.create({
        baseURL: "http://localhost:5000/",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptors config
    const apiCoreServiceRequestInterceptor = (axiosConfig) => {
        const userToken = JSON.parse(localStorage.getItem('userToken') ?? '{}');
        console.log("token: ", userToken)
        
        if (userToken?.accessToken) {
            console.log("usertoken", userToken)
            axiosConfig.headers.common.Authorization = userToken.accessToken;
        }
        return axiosConfig;
    };
    const apiCoreServiceRequestErrorInterceptor = (error) =>
        Promise.reject(error);

    apiCoreServiceInstance.interceptors.request.use(
        apiCoreServiceRequestInterceptor,
        apiCoreServiceRequestErrorInterceptor,
    );

    // Response interceptors config
    const apiCoreServiceResponseInterceptor = (response) =>
        response.data;
    const apiCoreServiceResponseErrorInterceptor = (error) => {
        if (
            error &&
            error.response &&
            error.response.status === 403
        ) {
            // We can determine refresh token logic over to fetch the new token and set it in headers
        } else if (
            error &&
            error.response &&
            error.response.status === 401
        ) {
            // Any logic which needs to be implemented when user is unauthorized will be handled in this block
            // localStorage.removeItem('user');
            
        }
        // if hide toast is true then hide toast
        
            console.log(error);
            
        
        return Promise.reject(error);
    };

    apiCoreServiceInstance.interceptors.response.use(
        apiCoreServiceResponseInterceptor,
        apiCoreServiceResponseErrorInterceptor,
    );

    return {
        coreApi: getServicePayload(apiCoreServiceInstance),
    };
})();
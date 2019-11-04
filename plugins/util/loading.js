/**
 * @desc element-ui的loading函數
 * @to plugin/axios 請求及響應攔截使用,只在proccess.client 中有作用
 */

import { Loading } from 'element-ui'

let loadingCount = 0
let loading

const startLoading = () => {
    loading = Loading.service({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
    });
};
const endLoading = () => {  
    loading.close();
};


export const showLoading = () => {

    if (loadingCount === 0) {
        startLoading();
    }
    loadingCount += 1;
};

export const hideLoading = () => {
    try {
        if (loadingCount <= 0) {
            return;
        }
        loadingCount -= 1;
        
        if (loadingCount === 0) {
            endLoading();
        }
    }
    catch(err) {
        console.log(err)
    }    
};
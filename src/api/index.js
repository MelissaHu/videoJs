import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//请求拦截器
axios.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
})


//响应拦截器
axios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    return Promise.reject(error);
})


//封装axios的post请求
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

//封装axios的get请求
// export function fetchGet(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.get(url, {
//                 params: {
//                     serial: '34020000001320000100',
//                     channel: 1,
//                     length: 640,
//                     width: 360,
//                     midpointx: pointVal.midpointx,
//                     midpointy: pointVal.midpointy,
//                     lengthx: 640,
//                     lengthy: 360,
//                 }
//             })
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch((error) => {
//                 reject(error);
//             })
//     })
// }


// export default {
//     dragzoomin(url, params) {
//         return fetch(url, params)
//     }
// }

//点击移动效果
export function dClick(pointVal) {
    axios.get("http://10.168.4.181:10000/api/v1/dragzoomout/control", {
            params: {
                serial: '34020000001320000100',
                channel: 1,
                length: 940,
                width: 567,
                midpointx: pointVal.x,
                midpointy: pointVal.y,
                lengthx: 940,
                lengthy: 567,
            }
        })
        .then(function(response) {
            console.log("成功");

        })
        .catch(function(error) {
            console.log(error);
        });
}

//拉框缩小效果
export function dragzoomout(pointVal) {
    axios.all([
            axios.get("http://10.168.4.181:10000/api/v1/dragzoomout/control", {
                params: {
                    serial: '34020000001320000100',
                    channel: 1,
                    length: 940,
                    width: 567,
                    midpointx: pointVal.x,
                    midpointy: pointVal.y,
                    lengthx: pointVal.width,
                    lengthy: pointVal.height
                }
            }),
            axios.get("http://10.168.4.181:10000/api/v1/ptz/control", {
                params: {
                    serial: '34020000001320000100',
                    channel: 1,
                    command: 'stop'
                }
            })
        ])
        .then(function(response) {
            console.log("成功");

        })
        .catch(function(error) {
            console.log(error);
        });
}
//拉框放大效果
export function dragzoomin(pointVal) {
    axios.all([
            axios.get("http://10.168.4.181:10000/api/v1/dragzoomin/control", {
                params: {
                    serial: '34020000001320000100',
                    channel: 1,
                    length: 940,
                    width: 567,
                    midpointx: pointVal.x,
                    midpointy: pointVal.y,
                    lengthx: pointVal.width,
                    lengthy: pointVal.height
                }
            }),
            axios.get("http://10.168.4.181:10000/api/v1/ptz/control", {
                params: {
                    serial: '34020000001320000100',
                    channel: 1,
                    command: 'stop'
                }
            })
        ])
        .then(function(response) {
            console.log("成功");

        })
        .catch(function(error) {
            console.log(error);
        });
}

export default {
    checkType(type, val) {
        switch (type) {
            case 'dragzoomout':
                dragzoomout(val);
                break;
            case 'dragzoomin':
                dragzoomin(val);
                break;
            case 'dClick':
                dClick(val);
                break;
            default:
                console.log("没有传入type");

        }
    }
}
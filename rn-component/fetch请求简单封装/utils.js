let Util = {
    /*
     * fetch简单封装
     * url: 请求的URL
     * successCallback: 请求成功回调
     * failCallback: 请求失败回调
     * */
    get: (url, successCallback, failCallback, data = {}) => {
        url += "?";
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                url += i + '=' + data[i] + "&";
            }
        }
        url = url.substr(0, url.length - 1);//去掉末尾多余的?或&符号美化url
        fetch(url, {
            method: "GET"
        })
        .then(padding)
        .then((response)=>{reslove(response,successCallback)})
        .catch((err)=>{reject(err,failCallback)});
    },
    post: (url, successCallback, failCallback, data = {})=> {
        fetch(url,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            .then(padding)
            .then((response)=>{reslove(response,successCallback)})
            .catch((err)=>{reject(err,failCallback)});
    }
};

export default Util;
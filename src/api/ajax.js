function jsonp(url, ...args) {
    return new Promise((resolve, reject) => {
         // 一定要为回调函数设置不同的函数名，否则同时执行jsonp的时候传出的数据会冲突
        let callbackName = `jsonp_${new Date().getTime()}`;
        console.log(callbackName);
        window[callbackName] = function (data) {
            resolve(data);
        }
        let script = document.createElement('script');
        let query = args.join('&');
        script.src = args ? url + `?callback=${callbackName}&` + query : url + `?callback=${callbackName}`;
        script.onerror = () => reject('jsonp error');
        document.head.appendChild(script);
        document.head.removeChild(script);
    });
}

export function getWeather(province='上海', city='上海', county='') {
    return jsonp('https://wis.qq.com/weather/common', 'source=pc', 'weather_type=observe|tips|air|forecast_1h|forecast_24h', `province=${province}`, `city=${city}`, `county=${county}`);
}

// export function getToutiaoApi() {
//     return axios.get(`https://www.toutiao.com/stream/widget/local_weather/data/?city=上海`);
// }

export function searchCity(city='上海') {
    return jsonp('https://wis.qq.com/city/like', 'source=pc', `city=${city}`);
}

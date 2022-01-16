import { createStore } from 'vuex'

function getLocation(city) {
  if (!city.includes('市')) {
    return ['上海', '上海'];
  }
  else {
    city = city.split('市')[0];
    if (city.includes('自治区')) {
        return [city.slice(0, 2), city.slice(city.indexOf('自治区') + 3)];
      } else if (city.includes('省')) {
        return city.split('省');
      } else {
        return [city, city];
      }
  }
}

let [province, city] = getLocation(returnCitySN.cname);
console.log(province, city)

export default createStore({
  state: {
    location: {
      province: province,
      city: city,
      county: ''
    },
    weather: {},
    currentTime: new Date(),
    windDirection: ['无持续风向', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风', '北风'],
  },
  mutations: {
    updateWeather(state, payload) {
      state.weather = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})

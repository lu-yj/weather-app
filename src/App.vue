<template>
  <div id="app" @click="searching = false" :style="{backgroundImage: `linear-gradient(${weather2color()})`}">
    <header class="outerBackground" :style="{backgroundColor: `${weather2color().split(' 0%')[0]}`}">
      <div class="innerBackground">
        <div class="contentContainer">
          <div class="logo">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wangyuanjing"></use>
            </svg>
            <span>准吗天气</span>
          </div>
          <search-box :searching="searching" :location="location" @choose-city="changeCity" @click.stop="searching = true"></search-box>
        </div>
      </div>
    </header>
    <nav>{{city}}</nav>
    <section>
      <weather-overview :observe="weather.data.observe" :tips="weather.data.tips.observe" :air="weather.data.air"></weather-overview>
      <air-quality-map :yesterday="weather.data.forecast_24h['0'].time"></air-quality-map>
      <forecast-days :forecast_24h="weather.data.forecast_24h"></forecast-days>
      <forecast-hours :forecast_1h="weather.data.forecast_1h"></forecast-hours>
      <map-carousel></map-carousel>      
    </section>
    <transition name="footer">
      <footer v-show="isShow">
        <div class="contentContainer">
          <div class="copyright">© 2022 准吗天气</div>
          <a href="https://github.com/lu-yj/weather-app">GitHub 仓库地址</a>
        </div>
      </footer>
    </transition>
  </div>
</template>

<script>
import SearchBox from './components/SearchBox.vue'
import AirQualityMap from './components/AirQualityMap.vue'
import ForecastDays from './components/ForecastDays.vue'
import ForecastHours from './components/ForecastHours.vue'
import WeatherOverview from './components/WeatherOverview.vue'
import MapCarousel from './components/MapCarousel.vue'
import { getWeather } from './api/ajax'

export default {
  name: 'App',
  components: {
    SearchBox,
    WeatherOverview,
    AirQualityMap,
    ForecastDays,
    ForecastHours,
    MapCarousel
  },
  data() {
    return {
      weather: {
        data: {
          observe: ''
        }
      },
      preScrollTop: 0,
      isShow: false,
      searching: false,
      province: '上海',
      city: '上海',
      county: '',
      location: '',
      
    }
  },
  methods: {
    weather2color() {
      let weather = this.weather.data.observe.weather;
      let hour = new Date().getHours();
      if (hour < 6 || hour >= 18) {
        if (weather.includes('晴')) return 'rgb(40, 69, 110) 0%, rgb(20, 36, 68) 100%';
        else if (weather.includes('云') || weather.includes('阴')) return 'rgb(36, 77, 114) 0%, rgb(7, 33, 59) 100%';
        else if (weather.includes('雾') || weather.includes('霾')) return 'rgb(45, 65, 86) 0%, rgb(26, 28, 36) 100%';
        else if (weather.includes('雨')) return 'rgb(44, 70, 108) 0%, rgb(20, 36, 60) 100%';
        else if (weather.includes('雪')) return 'rgb(28, 44, 68) 0%, rgb(11, 26, 44) 100%';
        // else if (weather.includes('雷')) return 'rgb(55, 49, 77) 0%, rgb(20, 20, 44) 100%';
      } else {
        if (weather.includes('晴')) return 'rgb(36, 84, 148) 0%, rgb(28, 68, 132) 100%';
        else if (weather.includes('云') || weather.includes('阴')) return 'rgb(76, 92, 122) 0%, rgb(52, 68, 100) 100%';
        else if (weather.includes('雾') || weather.includes('霾')) return 'rgb(68, 68, 108) 0%, rgb(44, 44, 84) 100%';
        else if (weather.includes('雨')) return 'rgb(52, 92, 132) 0%, rgb(44, 76, 116) 100%';
        else if (weather.includes('雪')) return 'rgb(41, 87, 147) 0%, rgb(12, 60, 124) 100%';
        // else if (weather.includes('雷')) return '';
      }
    },
    handleScroll() {
      let curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let scroll = curScrollTop - this.preScrollTop;
      this.preScrollTop = curScrollTop;
      if (scroll > 0) return this.isShow = false;
      if (scroll < 0) return this.isShow = true;
    },
    async changeCity(city) {
      this.city = city;
      console.log('换城市了', city)
      this.weather = await getWeather(...city.split(', '));
      console.log(this.weather);
    },
    getLocation(citySN) {
      if (!citySN.includes('市')) {
        return ['上海', '上海'];
      }
      else {
        citySN = citySN.split('市')[0];
        if (citySN.includes('自治区')) {
            return [citySN.slice(0, 2), citySN.slice(citySN.indexOf('自治区') + 3)];
          } else if (citySN.includes('省')) {
            return citySN.split('省');
          } else {
            return [citySN, citySN];
          }
      }
    }
  },
  async created() {
    [this.province, this.city] = this.getLocation(returnCitySN.cname);
    this.location = this.province + ', ' + this.city;
    this.weather = await getWeather(this.province, this.city);
    console.log(this.weather, this.location);
    this.city = this.location;
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  }
}
</script>

<style lang="less">
*{
	margin: 0; 
	padding: 0;
	box-sizing: border-box;
  color: white;
	font-family: Segoe UI, Segoe WP, Arial, Sans-Serif;
  .icon{fill: white;}
}
</style>

<style lang="less" scoped>
// #app{
// }
header{
  position: fixed;
  width: 100%;
  height: 48px;
  z-index: 10;
  .innerBackground{
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: center;
    align-items: center;
    .contentContainer{
      width: 1236px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo{
        display: flex;
        align-items: center;
        .icon{
          width: 30px;
          height: 30px;
        }
        span{
          font-family: '微软雅黑';
          padding-left: 16px;
          font-style: italic;
          letter-spacing: 4px;
          font-size: 24px;
        }
      }
    }
  }
}
.footer-enter-active, .footer-leave-active {transition: bottom 200ms ease-in-out;}
.footer-enter-from, .footer-leave-to {bottom: -26px;}
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 26px;
  line-height: 26px;
  background-color: rgb(43, 43, 43);
  font-size: 13px;
  z-index: 10;
  display: flex;
  justify-content: center;
  .contentContainer{
    width: 1236px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
nav{
  padding-top: 60px;
  width: 1236px;
  margin: 0 auto;
  font-size: 18px;
  padding-bottom: 16px;

}
section{
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: 270px auto;
  gap: 12px;
  justify-content: center;
  grid-template-areas: 
    "wo wo aqm aqm"
    "fd fd fd fd"
    "fh fh fh fh"
    "mc mc mc mc";
  #weather-overview { grid-area: wo }
  #air-quality-map { grid-area: aqm }
  #forecast-days { grid-area: fd }
  #forecast-hours { grid-area: fh }
  #map-carousel { grid-area: mc }
}

@media screen and (max-width: 1300px) {
  header .innerBackground .contentContainer,nav,footer .contentContainer{width: 924px;}
  section {
    grid-template-columns: repeat(3, 300px);
    grid-template-areas: 
      "wo wo aqm"
      "fd fd fd"
      "fh fh fh"
      "mc mc mc";
  }
}
@media screen and (max-width: 1000px) {
  header .innerBackground .contentContainer,nav,footer .contentContainer{width: 612px;}
  section {
    grid-template-columns: 612px;
    grid-template-rows: 270px 270px auto;
    grid-template-areas: 
      "wo"
      "aqm"
      "fd"
      "fh"
      "mc";
  }
}
</style>

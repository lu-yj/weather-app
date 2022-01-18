<template>
  <div id="app" @click="searching = false" :style="{backgroundImage: `linear-gradient(rgb(68, 68, 108) 0%, rgb(44, 44, 84) 100%)`}">
    <header class="outerBackground">
      <div class="innerBackground">
        <div class="contentContainer">
          <div class="logo" @click.stop="searching = false">准吗天气</div>
          <search-box :searching="searching" :location="location" @choose-city="changeCity" @click.stop="searching = true"></search-box>
        </div>
      </div>
    </header>
    <nav class="location">{{location}}</nav>
    <section>
      <weather-overview :observe="weather.data.observe" :tips="weather.data.tips.observe" :air="weather.data.air"></weather-overview>
      <air-quality-map></air-quality-map>
      <forecast-days :forecast_24h="weather.data.forecast_24h"></forecast-days>
      <forecast-hours :forecast_1h="weather.data.forecast_1h"></forecast-hours>
      <map-carousel></map-carousel>      
    </section>
    <transition name="footer">
      <footer v-show="isShow">
        <div class="copyright">© 2022 准吗天气</div>
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
import { getWeather, searchCity } from './api/ajax'

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
      weather2color: {}
    }
  },
  methods: {
    handleScroll() {
      let curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let scroll = curScrollTop - this.preScrollTop;
      this.preScrollTop = curScrollTop;
      if (scroll > 0) return this.isShow = false;
      if (scroll < 0) return this.isShow = true;
    },
    async changeCity(city) {
      this.location = city;
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
}
</style>

<style lang="less" scoped>
#app{
  // background-image: linear-gradient(rgb(36, 84, 148) 0%, rgb(28, 68, 132) 100%); 'Sunny'
  // background-image: linear-gradient(rgb(40, 69, 110) 0%, rgb(20, 36, 68) 100%); 晴朗夜晚
  // background-image: linear-gradient(#28456E 0%, #142444 100%);
  background-image: linear-gradient(rgb(68, 68, 108) 0%, rgb(44, 44, 84) 100%);
  // background: linear-gradient(rgb(36, 77, 114) 0%, rgb(7, 33, 59) 100%); 多云夜晚
  // background-image: linear-gradient(rgb(45, 65, 86) 0%, rgb(26, 28, 36) 100%);
  // background-image: linear-gradient(#2D4156 0%, #1A1C24 100%); // 'Hazy%20Night'
  // background-image: linear-gradient(rgb(44, 70, 108) 0%, rgb(20, 36, 60) 100%); 雨夜
  // background: linear-gradient(#1C2C44 0%, #0B1A2C 100%); 晚雪
  // background: linear-gradient(#37314D 0%, #14142C 100%); 晚雷
  // background: linear-gradient(#44446C 0%, #2C2C54 100%); 早雾
}
header{
  position: fixed;
  width: 100%;
  height: 48px;
  background-color: #3E3E62;
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
    }
    .logo{
      font-family: '楷体';
      font-size: 36px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(43, 43, 43);
  font-size: 13px;
  z-index: 10;
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
  header .innerBackground .contentContainer,nav{width: 924px;}
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
  header .innerBackground .contentContainer nav{width: 612px;}
  section {
    grid-template-columns: repeat(2, 300px);
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

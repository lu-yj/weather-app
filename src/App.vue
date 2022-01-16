<template>
  <div id="app">
    <header>
      <search-bar></search-bar>
    </header>
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
import SearchBar from './components/SearchBar.vue'
import AirQualityMap from './components/AirQualityMap.vue'
import ForecastDays from './components/ForecastDays.vue'
import ForecastHours from './components/ForecastHours.vue'
import WeatherOverview from './components/WeatherOverview.vue'
import MapCarousel from './components/MapCarousel.vue'
import { getWeather } from './api/ajax'

export default {
  name: 'App',
  components: {
    SearchBar,
    WeatherOverview,
    AirQualityMap,
    ForecastDays,
    ForecastHours,
    MapCarousel
  },
  data() {
    return {
      weather: {},
      preScrollTop: 0,
      isShow: false,
    }
  },
  methods: {
    handleScroll() {
      let curScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let scroll = curScrollTop - this.preScrollTop;
      this.preScrollTop = curScrollTop;
      if (scroll > 0) return this.isShow = false;
      if (scroll < 0) return this.isShow = true;
    }
  },
  async created() {
    this.weather = await getWeather(this.$store.state.location.province, this.$store.state.location.city);
    console.log(this.weather);
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
  // background-image: linear-gradient(180deg, #28456E 0%, #142444 100%);
  // background-image: linear-gradient(rgb(68, 68, 108) 0%, rgb(44, 44, 84) 100%);
  background-image: linear-gradient(rgb(45, 65, 86) 0%, rgb(26, 28, 36) 100%);;
  // height:200vh;
}
header{
  position: fixed;
  width: 100vw;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.08);
}
.footer-enter-active, .footer-leave-active {
  transition: bottom 200ms ease-in-out;
}
.footer-enter-from, .footer-leave-to {
  bottom: -26px;
}
section{
  // margin-top: 100px;
  padding-top: 100px;
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
}

@media screen and (max-width: 1300px) {
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
#weather-overview { grid-area: wo }
#air-quality-map { grid-area: aqm }
#forecast-days { grid-area: fd }
#forecast-hours { grid-area: fh }
#map-carousel { grid-area: mc }
footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 26px;
  line-height: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(43, 43, 43);
  font-size: 13px;
}
</style>

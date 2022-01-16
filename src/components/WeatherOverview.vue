<template>
    <div id="weather-overview" :style="{backgroundImage: 'url(' + `https://assets.msn.cn/weathermapdata/1/static/background/v2.0/compactads3/${bgParam()}.png` + ')'}">
        <div class="updateTime">中央气象台 {{observe.update_time.slice(8, 10)}}:00 发布</div>
        <div class="summary">
            <img class="weatherCode" :src="`http://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/${isNight()}/${observe.weather_code}.png`" alt="">
            <div class="degree">{{observe.degree}}°</div>
            <div class="weatherShort">{{observe.weather_short}}</div>
        </div>
        <div class="tips">{{tips[1]}}</div>
        <div class="detail">
            <div v-for="item in detail">
                <div class="key">{{item[0]}}</div>
                <div class="value">
                    <svg v-if="item[0] === '空气质量指数'" width="14" height="14" viewBox="0 0 10 14">
                        <circle cx="5" cy="8" r="4" :style="{fill: aqiCompute(air.aqi)}"></circle>
                    </svg>
                    {{item[1]}}
                </div>
            </div>
            <!-- <div class="airQuality">空气质量指数{{air.aqi}}</div>
            <div class="wind">风向{{observe.wind_direction}} 风速{{observe.wind_power}}</div>
            <div class="humidity">湿度{{observe.humidity}}</div>
            <div class="pressure">气压{{observe.pressure}}</div> -->
        </div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            detail: [
                ['空气质量指数', this.air.aqi],
                ['风向', this.$store.state.windDirection[this.observe.wind_direction]],
                ['风速', this.observe.wind_power + ' 级'],
                ['湿度', this.observe.humidity + '%'],
                ['气压', this.observe.pressure + ' 百帕']
            ],
            bg: {
                'day': {
                    '晴': 'Sunny',
                    '多云': 'Cloudy%202',
                    '雨': 'Rain%202',
                    '雪': 'Snow%202',
                    '雾': 'Light%20fog',
                    '霾': 'Light%20fog'
                },
                'night': {
                    '晴': 'Clear%20Night',
                    '多云': 'Cloudy%201',
                    '雨': 'Rain%201',
                    '雪': 'Snow%201',
                    '雾': 'Hazy%20Night',
                    '霾': 'Hazy%20Night'                 
                }
            }
        }
    },
    props: ['observe', 'tips', 'air'],
    methods: {
        isNight() {
            let hour = this.$store.state.currentTime.getHours();
            return (hour < 6 || hour >= 18) ? 'night' : 'day';
        },
        bgParam() {
            let hour = this.$store.state.currentTime.getHours();
            let p1 = (hour < 6 || hour >= 18) ? 'night' : 'day';
            let p2 = this.observe.weather_short;
            return this.bg[p1][p2];
        },
        aqiCompute(aqi) {
            console.log(aqi)
            if (aqi <= 50) return 'green';
            else if (aqi <= 100) return 'yellow';
            else if (aqi <= 150) return 'orange';
            else if (aqi <= 200) return 'red';
            else if (aqi <= 300) return 'purple';
            else return 'brown';
        }
    },
    mounted() {
        console.log('weather overview', this.observe);
    },
}
</script>

<style lang="less" scoped>
#weather-overview{
    border-radius: 6px;
    .updateTime{
        height: 62px;
        font-size: 14px;
        line-height: 14px;
        padding-top: 16px;
        padding-left: 16px;
    }
    .summary{
        display: flex;
        align-items: center;
        padding-left: 16px;
        height: 76px;
        .degree{
            line-height: 76px;
            padding-left: 26px;
            font-size: 64px;
        }
        .weatherShort{
            font-size: 24px;
            font-weight: 600;
            padding-left: 26px;
        }
    }
    .tips{
        padding-left: 16px;
        font-size: 16px;
        height: 65px;
        line-height: 65px;
    }
    .detail{
        padding: 20px 16px 0 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 38px;
        .key{
            font-size: 12px;
            opacity: 0.8;
        }
        .value{
            font-size: 16px;
        }
    }
}
</style>
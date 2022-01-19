<template>
    <div id="weather-overview" :style="{backgroundImage: `url(https://assets.msn.cn/weathermapdata/1/static/background/v2.0/compactads3/${bgParam()}.png)`}">
        <div class="updateTime">中央气象台 {{observe.update_time.slice(8, 10)}}:00 发布</div>
        <div class="summary">
            <img class="weatherCode" :src="`http://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/${isNight()}/${observe.weather_code}.png`" alt="">
            <div class="degree">{{observe.degree}}°</div>
            <div class="weatherShort">{{observe.weather_short}}</div>
        </div>
        <div class="tips">{{tips ? tips[0] : ''}}</div>
        <div class="detail">
            <div>
                <div class="key">空气质量指数</div>
                <div class="value">
                    <svg width="14" height="14" viewBox="0 0 10 14">
                        <circle cx="5" cy="8" r="4" :style="{fill: aqiCompute(air.aqi)}"></circle>
                    </svg>
                    {{air.aqi}}
                </div>
            </div>
            <div>
                <div class="key">风向</div>
                <div class="value">{{windDirection[observe.wind_direction]}}</div>
            </div>
            <div>
                <div class="key">风速</div>
                <div class="value">{{observe.wind_power}} 级</div>
            </div>
            <div>
                <div class="key">湿度</div>
                <div class="value">{{observe.humidity}}%</div>
            </div>
            <div>
                <div class="key">气压</div>
                <div class="value">{{observe.pressure}} 百帕</div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            bg: {
                'day': {
                    '晴': 'Sunny',
                    '多云': 'Cloudy%202',
                    '雨': 'Rain%202',
                    '雪': 'Snow%202',
                    '雾': 'Light%20fog',
                    '霾': 'Light%20fog',
                    '雷': 'Thunderstorms%202'  
                },
                'night': {
                    '晴': 'Clear%20Night',
                    '多云': 'Cloudy%201',
                    '雨': 'Rain%201',
                    '雪': 'Snow%201',
                    '雾': 'Hazy%20Night',
                    '霾': 'Hazy%20Night',
                    '雷': 'Thunderstorms%201'                 
                }
            },
            windDirection: ['无持续风向', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风', '北风'],
        }
    },
    props: ['observe', 'tips', 'air'],
    methods: {
        isNight() {
            let hour = new Date().getHours();
            return (hour < 6 || hour >= 18) ? 'night' : 'day';
        },
        bgParam() {
            let hour = new Date().getHours();
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
<template>
    <div id="forecast-hours">
        <div class="title">最近 48 小时预报</div>
        <div class="selectBar">
            <div class="firstChoice" @click="displayTab = 'echart'">温度概况</div>
            <div class="secondChoice" @click="displayTab = 'swiper'">更多详情</div>
        </div>
        <keep-alive>
            <div id="echart" v-show="displayTab === 'echart'"></div>
        </keep-alive>
        <div class="swiper-outer hourSwiper" v-show="displayTab === 'swiper'">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, idx) in Object.values(forecast_1h)">
                        <div class="slideBody">
                            <div class="date" v-if="item.update_time.slice(8, 10) === '00' || idx === 0">{{item.update_time.slice(4, 6)}}月{{item.update_time.slice(6, 8)}}日</div>
                            <div class="slideBodyTop">
                                <img class="weatherCode" :src="`http://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/${item.weather_code}.png`">
                                <div class="degree">{{item.degree}}°</div>
                                <div class="weatherShort">{{item.weather_short}}</div>
                            </div>
                            <div class="slideBodyBottom">
                                <div class="wind">{{item.wind_direction}}</div>
                                <div class="wind">{{item.wind_power}} 级</div>
                            </div>
                        </div>
                        <div class="slideBottom">
                            <div class="time">{{item.update_time.slice(8, 10)}}:00</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination" v-if="false"></div>
            </div>
            <div class="swiper-button-prev swiper-button-white"></div>
            <div class="swiper-button-next swiper-button-white"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import Swiper from 'swiper';  
import 'swiper/css/swiper.css';

export default{
    data() {
        return {
            degree: [],
            time: [],
            midnightIndex: [],
            myChart: null,
            displayTab: 'echart'
        }
    },
    props: ['forecast_1h'],
    watch: {
        forecast_1h(oldVal, newVal) {
            console.log('在看', oldVal, newVal);
            if (document.getElementById('echart')) this.handleData(newVal);
            this.drawLine();
        },
        displayTab() {
            console.log('变了', this.displayTab);
            new Swiper('.hourSwiper .swiper-container', {
                observe: true,
                observeParents: true,
                slidesPerView: 5,
                spaceBetween: 5,
                pagination: {el: '.hourSwiper .swiper-pagination'},
                navigation: {
                    nextEl: ".hourSwiper .swiper-button-next",
                    prevEl: ".hourSwiper .swiper-button-prev",
                },
                breakpoints: {
                    1000: {slidesPerView: 8},
                    1300: {slidesPerView: 10},
                },
            });
        }
    },
    methods: {
        isNight() {
            let hour = new Date().getHours();
            return (hour < 6 || hour >= 18) ? 'night' : 'day';
        },
        handleData(data) {
            data = Object.values(data);
            this.degree = data.map((v) => v.degree);
            this.time = data.map((v, idx) => {
            if (v.update_time.slice(8, 10) === '00') this.midnightIndex.push(idx);
                return v.update_time});
        },
        drawLine() {
            // if (this.myChart != null && this.myChart!= "" && this.myChart!= undefined) {
            //     this.myChart.dispose();
            // }
            this.myChart = echarts.init(document.getElementById('echart'));
            this.myChart.setOption({
                grid: {
                    containLabel: true,
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 16
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    showContent: false,
                    formatter: '{b}<br />{a}: {c} °C'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        show: false,
                    },
                    axisLine:{
                        onZero: false,
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.12)',
                        }
                    },
                    axisLabel:{
                        color: 'rgba(255, 255, 255, 0.8)',
                        interval: 'auto',
                        formatter: function (value, index) {
                            if (index === 0) return '';
                            else return value.slice(8, 10) + ':00';
                        },
                        margin: 16,
                    },
                    data: this.time
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: ['20%', '20%'],
                    splitLine: {
                        show: false
                    },
                    axisLine:{
                        show: false
                    },
                    axisLabel:{
                        show: false,
                    },
                },
                series: [
                    {
                        name: '温度',
                        data: this.degree,
                        type: 'line',
                        smooth: true,
                        symbolSize: 0,
                        showAllSymbol: false,
                        lineStyle: {color: 'rgba(255, 255, 255, 0)'},
                        areaStyle: {
                            opacity: 0.6,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: 'rgba(255,215,0,0.4)'},
                                {offset: 1, color: 'rgba(32,178,170,0.08)'},
                            ]),
                            origin: 'start'
                        },
                        label: {
                            show: true,
                            formatter: function (params) {
                                if (params.dataIndex === 0) return '';
                                else return params.data + '°';
                            },
                            color: 'white',
                            fontSize: 14
                        },
                        markLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            symbol: ['none', 'none'],
                            label: {
                                color: 'rgba(255, 255, 255, 0.8)',
                                distance: -30,
                                padding: [0, 0, 0, 70],
                                formatter: params => this.time[params.value].slice(4, 6) + '月' + this.time[params.value].slice(6, 8) + '日'
                                },
                            data: [
                                { xAxis: this.midnightIndex[0] },
                                { xAxis: this.midnightIndex[1] }
                            ]
                        },
                    }
                ]
            })
            
        }
    },
    mounted() {
        this.handleData(this.forecast_1h);
        console.log(this.forecast_1h);
        new Swiper('.hourSwiper .swiper-container', {
            observer: true,
            observeParents: true,
            slidesPerView: 5,
            spaceBetween: 5,
            pagination: {el: '.hourSwiper .swiper-pagination'},
            navigation: {
                nextEl: ".hourSwiper .swiper-button-next",
                prevEl: ".hourSwiper .swiper-button-prev",
            },
            breakpoints: {
                1000: {slidesPerView: 8},
                1300: {slidesPerView: 10},
            },
        });
        this.drawLine();
    }
}
</script>

<style lang="less" scoped>
#forecast-hours{
    .title{
        height: 34px;
        font-size: 14px;
        font-weight: 600;
    }
    .selectBar{
        display: flex;
        height: 40px;
        line-height: 40px;
        background-color: rgba(255, 255, 255, 0.08);
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        .firstChoice, .secondChoice{
            width: 88px;
            padding-left: 10px;
            font-size: 12px;
            text-align: center;
        }
    }
    #echart,.hourSwiper{
        height: 245px;
        background-color: rgba(255, 255, 255, 0.08);
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
    .hourSwiper{
        position: relative;
        .swiper-container{
            height: 100%;
            .swiper-slide{
                position: relative;
                height: 100%;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                .slideBody{
                    // height: 100%;
                    background-image: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.03) 40%);
                    flex: 1;
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    padding-left: 24px;
                    .date{
                        font-size: 12px;
                        font-weight: 400;
                        opacity: 0.8;
                        position: absolute;
                        top: 10px;
                    }
                    .slideBodyTop{
                        padding-top: 32px;
                        .weatherCode{
                            width: 28px;
                            height: 28px;
                        }
                        .degree{
                            font-size: 16px;
                            padding-top: 6px;
                            height: 34px;
                            font-weight: 600;
                        }
                        .weatherShort{
                            font-size: 12px;
                            font-weight: 400;
                            opacity: 0.8;
                            padding-top: 6px;
                            height: 34px;
                        }
                    }
                    .slideBodyBottom{
                        padding-bottom: 10px;
                        font-size: 12px;
                    }
                }    
                .slideBottom{
                    .time{
                        font-size: 14px;
                        padding-top: 5px;
                        text-align: center;
                        opacity: 0.8;
                        height: 35px;
                        border-top: 2px solid rgba(255, 255, 255, 0.12);
                        // background-color: rgba(255, 255, 255, 0);
                        // backdrop-filter: blur(10px);
                    }
                }
            }
        }
        .swiper-button-prev, .swiper-button-next{
            background-color: rgba(255, 255, 255, 0.08);
            width: 24px;
            height: 24px;
            border-radius: 12px;
            position: absolute;
            top: 93px;
            margin: 0;
            ::after{
                font-size: 12px;
            }
        }
        .swiper-button-prev{left: -12px;}
        .swiper-button-next{right: -12px;}
        .swiper-button-prev::after, .swiper-button-next::after{font-size: 12px;}
    }
}
</style>
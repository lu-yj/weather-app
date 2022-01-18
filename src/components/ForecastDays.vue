<template>
    <div id="forecast-days">
        <div class="title">未来 7 天预报</div>
        <div class="swiper-outer daySwiper">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, idx) in forecast_24h">
                        <div class="date" v-if="idx == 0">昨天</div>
                        <div class="date" v-else-if ="idx == 1">今天</div>
                        <div class="date" v-else>{{item.time.slice(5)}}</div>
                        <div class="detail">
                            <img :src="`http://mat1.gtimg.com/pingjs/ext2020/weather/pc/icon/weather/day/${item.day_weather_code}.png`">
                            <div class="info">
                                <div class="firstLine">
                                    <div class="maxDegree">{{item.max_degree}}°</div>
                                    <div class="weatherShort">{{item.day_weather_short}}</div>
                                </div>
                                <div class="secondLine">
                                    <div class="minDegree">{{item.min_degree}}°</div>
                                    <div class="wind">{{item.day_wind_direction}} {{item.day_wind_power}} 级</div>
                                </div>
                            </div>
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
import Swiper from 'swiper';  
import 'swiper/css/swiper.css';

export default {
    components: {
        Swiper
    },
    props: ['forecast_24h'],
    mounted() {
        new Swiper('.daySwiper .swiper-container', {
            observe: true,
            slidesPerView: 2,
            spaceBetween: 12,
            pagination: {
                el: '.daySwiper .swiper-pagination',
            },
            navigation: {
                nextEl: ".daySwiper .swiper-button-next",
                prevEl: ".daySwiper .swiper-button-prev",
            },

            breakpoints: {
                1000: {
                    slidesPerView: 3,
                },
                1300: {
                    slidesPerView: 4,
                },
            },
        });
    },
}
</script>

<style lang="less" scoped>
#forecast-days{
    .title{
        height: 34px;
        font-size: 14px;
        font-weight: 600;
    }
    .daySwiper{
        position: relative;
        .swiper-container{
            .swiper-slide{
                width: 300px;
                padding: 12px 24px 18px;
                border-radius: 6px;
                background-color: rgba(255, 255, 255, 0.08);
                .date{
                    font-size: 14px;
                    font-weight: 400;
                    height: 24px;
                    opacity: 0.8;
                }
                .detail{
                    display: flex;
                    align-items: center;
                    height: 54px;
                    padding-left: 6px;
                    img{
                        width: 40px;
                        height: 40px;
                    }
                    .info{
                        width: 100%;
                        .firstLine{
                            padding-bottom: 6px;
                        }
                        .firstLine, .secondLine{
                            display: flex;
                            width: 100%;
                            padding-left: 14px;
                            justify-content: space-between;
                            font-size: 18px;
                            font-weight: 600px;
                            line-height: 24px;
                            .weatherShort, .wind{
                                font-size: 14px;
                                font-weight: 400;
                            }
                        }
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
            top: 42px;
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
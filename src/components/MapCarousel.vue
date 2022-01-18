<template>
    <div id="map-carousel" >
        <div class="title">气象图</div>
        <div class="swiper-outer mapSwiper">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in category">
                        <img class="map" :src="`https://assets.msn.com/weathermapdata/1/static/icons2/${item[1]}.gif`" alt="">
                        <div class="filter"></div>
                        <div class="description">
                            <div class="firstLine">{{item[2]}}</div>
                            <a class="secondLine" :href="`https://www.msn.cn/zh-cn/weather/maps/${item[0]}`">{{item[3]}}</a>
                        </div>
                    </div>
                    <div class="swiper-slide more">
                        <img class="miniMap" src="https://assets.msn.com/weathermapdata/1/static/icons2/106/image-20211206144938125.png" alt="">
                        <a class="content" href="https://www.msn.cn/zh-cn/weather/maps/temperature">查看更多内容</a>
                    </div>
                </div>
                <div class="swiper-pagination" v-if="false"></div>
            </div>
            <div class="swiper-button-prev swiper-button-black"></div>
            <div class="swiper-button-next swiper-button-black"></div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';  
import 'swiper/css/swiper.css';

export default {
    data() {
        return {
            category: [
                ['temperature', 'temp-new', '温度', '查看冷热天气的位置'],
                ['cloud', 'satellite', '卫星视图', '跟踪云覆盖范围'],
                ['wind', 'wind', '风速', '检查方向和强度'],
                ['precipitation', 'precipitation', '降水', '跟踪雨雪']
            ]
        }
    },
    mounted() {
        new Swiper('.mapSwiper .swiper-container', {
            observe: true,
            slidesPerView: 2.5,
            spaceBetween: 12,
            pagination: {
                el: '.mapSwiper .swiper-pagination',
            },
            navigation: {
                nextEl: ".mapSwiper .swiper-button-next",
                prevEl: ".mapSwiper .swiper-button-prev",
            },
            breakpoints: {
                1000: {
                    slidesPerView: 4,
                    
                },
                1300: {
                    slidesPerView: 5,
                },
            },
        });
    },
}
</script>

<style lang="less" scoped>
#map-carousel{
    margin-bottom: 100px;
    .title{
        height: 34px;
        font-size: 14px;
        font-weight: 600;
    }
    .mapSwiper{
        position: relative;
        .swiper-container{
            .swiper-slide{
                border-radius: 6px;
                width: 240px;
                height: 150px;                
                position: relative;
                overflow: hidden;
                .map{
                    height: 100%;
                }
                .filter{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background-repeat: no-repeat;
                        background-position: bottom;
                        background-size: 100% 79px;
                        background-image: linear-gradient(0, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%);
                    }
                .description{
                    position: absolute;
                    left: 15px;
                    bottom: 15px;
                    .firstLine{
                        font-size: 20px;
                        font-weight: 600;
                    }
                    .secondLine{
                        font-size: 12px;
                    }
                }
            }
            .more{
                background-color: rgba(0, 0, 0, 0.7);
                padding-left: 12px;
                display: flex;
                align-items: center;
                .miniMap{
                    width: 118px;
                    height: 80px;
                }
                .content{
                    padding-left: 10px;
                    font-size: 12px;
                }
            }
        }
        .swiper-button-black{
            background-color: white;
            width: 28px;
            height: 28px;
            border-radius: 14px;
            position: absolute;
            top: 63px;
            margin: 0;
        }
        .swiper-button-prev{left: -14px;}
        .swiper-button-next{right: -14px;}
        .swiper-button-black::after{font-size: 14px;}
    }
}
</style>
<template>
    <div id="map-carousel" >
        <div class="title">气象图</div>
        <div class="swiper-outer">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in category">
                        
                            <img :src="`https://assets.msn.com/weathermapdata/1/static/icons2/${item[1]}.gif`" alt="">
                            <div class="filter"></div>
                            <div class="description">
                                <a :href="`https://www.msn.cn/zh-cn/weather/maps/${item[0]}`">
                                    <div class="firstLine">{{item[2]}}</div>
                                    <div class="secondLine">{{item[3]}}</div>
                                </a>
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
        const mySwiper = new Swiper('.swiper-container', {
            observe: true,
            slidesPerView: 2.5,
            spaceBetween: 12,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
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
    .swiper-outer{
        position: relative;
        .swiper-container{
            .swiper-slide{
                border-radius: 6px;
                width: 240px;
                height: 150px;                
                position: relative;
                overflow: hidden;
                img{
                    // position: absolute;
                    // top: 0;
                    // left: 0;
                    
                    height: 100%;
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
            .filter{
                position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background-repeat: no-repeat;
                    background-position: bottom;
                    background-size: 100% 79px;
                    background-image: linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.28) 63.71%, rgba(0, 0, 0, 0) 100%);
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
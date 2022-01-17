<template>
    <div id="search-box">
        <input type="text" placeholder="搜索市、区、县等" v-model.trim="input">
        <div class="cityList" v-if="searching && input === ''">
            <div class="title">当前位置</div>
            <div class="location" @click.stop="$emit('chooseCity', item); updateHistory(item)">{{location.split(', ')[1]}}</div>
            <div class="history" v-if="searchHistory.toString()">
                <div class="title" @click.stop="clearHistory()">历史记录 清除</div>
                <div class="record">
                    <div v-for="item in searchHistory" @click.stop="$emit('chooseCity', item)">
                        <span class="choice">{{item.split(', ')[1]}}</span>
                    </div>
                </div>
            </div>
            <div class="title">热门城市</div>
            <div class="hotCity">
                <div v-for="item in hotCity" @click.stop="$emit('chooseCity', item); updateHistory(item)">
                    <span class="choice">{{item.split(', ')[1]}}</span>
                </div>
            </div>
        </div>
        <div class="matchList" v-else-if="searching && matchResult.toString()">
            <div class="matchItem" v-for="item in matchResult" @click.stop="$emit('chooseCity', item); updateHistory(item)">
                <span class="choice">{{item}}</span>
            </div>
        </div >
        <div class="matchList" v-else-if="searching && !matchResult.toString()">
            <div class="matchItem">抱歉，未找到相关位置</div>
        </div>
    </div>
</template>

<script>
import { searchCity } from "../api/ajax"

export default {
    data() {
        return {
            input: '',
            matchResult: '',
            searchHistory: [],
            hotCity: [
                '北京, 北京', '上海, 上海', '广东, 广州', '广东, 深圳',
                '重庆, 重庆', '四川, 成都', '浙江, 杭州', '湖北, 武汉',
                '江苏, 南京', '天津, 天津', '湖南, 长沙', '河南, 郑州',
                '山东, 济南', '安徽, 合肥', '陕西, 西安', '福建, 福州',
                '云南, 昆明', '吉林, 长春', '辽宁, 沈阳', '河北, 石家庄', 
                '黑龙江, 哈尔滨', '江西, 南昌', '广西, 南宁', '贵州, 贵阳', 
                '山西, 太原', '新疆, 乌鲁木齐', '甘肃, 兰州', '内蒙古, 呼和浩特', 
                '宁夏, 银川', '海南, 海口', '青海, 西宁', '西藏, 拉萨'
            ]
        }
    },
    props: ['searching', 'location'],
    emits: ['chooseCity'],
    watch: {
        async input() {
            if (this.input !== '') {
                let res = await searchCity(this.input);
                console.log(Object.values(res.data));
                this.matchResult = Object.values(res.data);
            }
        }
    },
    methods: {
        updateHistory(city) {
            city = city.split(' ,').slice(0, 2).join(' ,');
            if (!this.searchHistory.includes(city)) {
                this.searchHistory.push(city);
                if (this.searchHistory.length > 4) this.searchHistory.shift();
                localStorage.searchHistory = JSON.stringify(this.searchHistory);
            }   
        },
        clearHistory() {
            this.searchHistory = [];
            localStorage.removeItem('searchHistory');
        }
    },
    created() {
        this.searchHistory = localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : [];
    }
}
</script>

<style lang="less" scoped>
#search-box{
    width: 310px;
    height: 32px;
    input::placeholder{color: white;}
    input{
        width: 100%;
        height: 100%;
        line-height: 32px;
        padding-left: 16px;
        border-radius: 16px;
        background-color: rgba(255, 255, 255, 0.2);
        border: none;
        outline: none;
        font-size: 14px;
    }
    .choice{cursor: pointer;}
    .cityList, .matchList{
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(30px);
        border-radius: 6px;
        padding: 20px 20px 0;
        font-size: 14px;
        max-height: 400px;
        overflow-y: auto;
        .title{
            color: rgb(159, 159, 159);
            height: 24px;
            font-size: 12px;
        }
        .location, .matchItem{
            height: 40px;
        }
        .hotCity{
            display: grid;
            grid-template-columns: repeat(4, 60px);
            gap: 10px;
        }
    }
}
</style>
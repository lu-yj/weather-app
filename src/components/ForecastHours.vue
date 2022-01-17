<template>
    <div id="forecast-hours">
        <div class="title">最近 48 小时预报</div>
        <div class="selectBar">
            <div class="firstChoice">温度概况</div>
            <div class="secondChoice">更多详情</div>
        </div>
        <div id="echart"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default{
    data() {
        return {
            degree: [],
            time: [],
            midnightIndex: [],
            myChart: null
        }
    },
    props: ['forecast_1h'],
    watch: {
        forecast_1h(oldVal, newVal) {
            console.log('在看', oldVal, newVal);
            this.handleData(newVal);
            this.drawLine();
        }
    },
    methods: {
        handleData(data) {
            data = Object.values(data);
            this.degree = data.map((v) => v.degree);
            this.time = data.map((v, idx) => {
            if (v.update_time.slice(8, 10) === '00') this.midnightIndex.push(idx);
                return v.update_time});
        },
        drawLine() {
            if (this.myChart != null && this.myChart!= "" && this.myChart!= undefined) {
                this.myChart.dispose();
            }
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
            window.addEventListener('resize', function () {
                myChart.resize();
            });
        }
    },
    mounted() {
        this.handleData(this.forecast_1h);
        this.drawLine();
        console.log(this.forecast_1h)
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
    #echart{
        height: 245px;
        background-color: rgba(255, 255, 255, 0.08);
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
}
</style>
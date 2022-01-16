<template>
  <div id="air-quality-map">
    <div v-for="displayHour in ['08', '10', '12', '14', '16', '18', '20', '22']">
      <div class="patch" v-show="displayHour === displayTime.split(':')[0]">
        <img v-for="img in imgs" :src="`https://assets.msn.com/weathermapdata/1/airqualityheatmaprendered/cn/${img}_6_20220114${displayHour}00.jpg`" alt="">
      </div>
    </div>
    <div class="timestamp">{{displayTime}}</div>
    <img class="baseMap" src="https://dev.ditu.live.com/REST/v1/Imagery/Map/RoadOndemand/31.970,120.940/6?mapSize=768,512&key=AnTcaqBi2ypp0xI-OZNi4W_ik2KhjgpqioTAtXLC8GzkMBQRMlyxvxyTnd5b73im&c=zh-cn&maxAge=86400&shading=terrain&st=me|lv:0_vg|v:0_nh|lv:1_pp|lv:1_trs|v:1;lv:0;sc:FF6B6B6B;fc:FF6B6B6B;strokeWidthScale:0.2_cst|v:1;fc:FF000000;strokeWidthScale:0.5_pt|v:0&ml=fg" alt="">
    <div class="advice">
      <div class="div">查看全球空气质量</div>
      <a href="https://www.msn.cn/zh-cn/weather/maps/airquality" target="blank">打开地图</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: ['52_25',
             '53_25',
             '54_25',
             '52_26',
             '53_26',
             '54_26'
      ],
      displayTime: '08:00'
    }
  },
  methods: {
    changeTime() {
      setInterval(() => {
        if (this.displayTime.split(':')[0] >= 22) {
          this.displayTime = '08:00';
        } else {
          this.displayTime = (parseInt(this.displayTime) + 2) / 10 >= 1 ? (parseInt(this.displayTime) + 2) + ':00' : '0' + (parseInt(this.displayTime) + 2) + ':00';
        }
      }, 1000);
    }
  },
  mounted() {
    this.changeTime();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#air-quality-map{
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  .patch{
    display: flex;
    flex-wrap: wrap;
    width: 768px;
    position: absolute;
    top: -150px;
    left: -150px;
    // transform: translate(-121px, -78px);
  }
  .timestamp{
    position: absolute;
    top: 4px;
    right: 4px;
    text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.45);
  }
  .baseMap{
    // width: 768px;
    // height: 512px;
    position: absolute;
    top: -150px;
    left: -150px;
    // transform: translate(-300px, -100px);
  }

  .advice{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    height: 44px;
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    a{
      color: lightblue;
    }
  }
}
</style>

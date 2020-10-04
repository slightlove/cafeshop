<template>
    <div class="banner">
        <img src="../../assets/images/banner2.jpg" alt="Banner" class="d-none d-lg-block">
        <div class="container">
            <swiper class="swiper" :options="swiperConfig">
                <swiper-slide class="swiper-item" v-for="banner in bannerLists" :key="banner.id">
                    <h5>使用優惠碼<span>{{banner.coupon}}</span>折價{{banner.coupon_price}}%</h5>
                    <h2>{{banner.title}}<span>{{banner.slogan}}</span>
                    </h2>
                    <p>{{banner.description}}</p>
                    <a :href="banner.url" class="btn btn-lg rounded-0">Buy More</a>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<style lang="sass" scope>
@import 'swiper/swiper-bundle.css'
.banner
    background-image: url("../../assets/images/banner.png")
    background-repeat: no-repeat
    background-size: contain
    padding: 60px 0 30px
    height: calc(100vh - 138px)
    position: relative
    display: flex
    align-items: center
    img
        position: absolute
        top: 0
        right: 0
        width: 40vw
    .swiper
      width: 50%
      .swiper-item
        padding-left: 10%
        overflow: hidden
        h5
            font-size: 1rem
            color: #bdbdbd
            span
                color: #634832
                margin: 0 0.5rem
                font-weight: 700
        h2
            margin-bottom: 1.875rem
            span
                display: block
                font-weight: 100
        .btn
            background-color: #634832
            color: #fff
            box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)
</style>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Banner from '../../assets/data/banner.json'
export default {
  data () {
    return {
      bannerLists: Banner,
      swiperConfig: {
        autoplay: true
      }
    }
  },
  components: {
    Swiper, SwiperSlide
  }
}
</script>

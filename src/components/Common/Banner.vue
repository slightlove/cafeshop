<template>
    <div class="banner">
        <img src="../../assets/images/banner2.jpg" alt="Banner" class="d-none d-lg-block">
        <div class="container">
          <div class="swiper">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                  <div class="swiper-slide swiper-item" v-for="banner in bannerLists" :key="banner.id">
                    <h5>使用優惠碼<span>{{banner.coupon}}</span>折價{{banner.coupon_price}}%</h5>
                    <h2>{{banner.title}}<span>{{banner.slogan}}</span>
                    </h2>
                    <p>{{banner.description}}</p>
                  </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </div>
    </div>
</template>
<style lang="sass" scope>
@import 'swiper/swiper-bundle.css'
.banner
    background-image: url("../../assets/images/banner.png")
    background-repeat: no-repeat
    background-size: contain
    background-color: #fff
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
        z-index: 0
    .swiper
      width: 50%
      margin: auto
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
            box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)
      .swiper-pagination
        position: relative
        bottom: 0
        .swiper-pagination-bullet
          background-color: #a1887f
@media screen and (max-width: 768px)
  .banner
    padding: 30px 0
    height: auto
    color: #efefef
    &:after
      content: ''
      display: block
      position: absolute
      width: 100%
      height: 100%
      background-color: rgba(0, 0, 0, 0.25)
      backdrop-filter: blur(5px)

    img
      display: none
    .swiper
      width: 100%
      .swiper-item
        padding-left: 0
        h5
          span
            color: #a1887f
        h2
          font-size: 1.875rem
          margin-bottom: 1.5rem
          color: #fff
          span
            font-size: 1.5rem
        .btn
          font-size: 0.875rem

</style>
<script>
import Swiper from 'swiper/bundle'
import Banner from '../../assets/data/banner.json'
export default {
  data () {
    return {
      bannerLists: Banner,
      swiperConfig: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-new
    new Swiper('.swiper-container', this.swiperConfig)
  }
}
</script>

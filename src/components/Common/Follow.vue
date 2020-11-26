<template>
    <div class="row no-gutters follow-wrap">
        <div class="col-4 primary-bg pattern-bg">
            <div class="follow-wrap">
                <h3>Follow Us On —</h3>
                <Social />
            </div>
        </div>
        <div class="col-8">
            <div class="row no-gutters">
                <div class="col-4 p0"><a href="#" class="follow-item"><img src="../../assets/images/ig/1.jpg" alt="" class="img-fluid"></a></div>
                <div class="col-4 p0"><a href="#" class="follow-item"><img src="../../assets/images/ig/2.jpg" alt="" class="img-fluid"></a></div>
                <div class="col-4 p0"><a href="#" class="follow-item"><img src="../../assets/images/ig/3.jpg" alt="" class="img-fluid"></a></div>
                <div class="col-4 p0"><a href="#" class="follow-item"><img src="../../assets/images/ig/4.jpg" alt="" class="img-fluid"></a></div>
                <div class="col-4 p0"><a href="#" class="follow-item"><img src="../../assets/images/ig/5.jpg" alt="" class="img-fluid"></a></div>
                <div class="col-4 p0"><a href="#" class="follow-item"><img src="../../assets/images/ig/6.jpg" alt="" class="img-fluid"></a></div>
            </div>
        </div>
    </div>
</template>
<style lang="sass" scope>
.follow-wrap
  .primary-bg
    background-color: #634832
  .pattern-bg
    position: relative
    z-index: 1
    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-image: url('./../../assets/images/follow-bg.jpg')
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      z-index: -1
      filter: blur(5px) grayscale(80%)
  .follow-wrap
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    margin: auto
    h3
      color: #fff
      margin-bottom: 1rem
    .social
      a
        color: #fff
        transition: color 0.3s linear
        &:hover
          color: #634832
  .follow-item
    display: block
    overflow: hidden
    position: relative
    img
      transition: all 0.5s 0.1s ease-in
    &:after
      content: 'Watch Me'
      display: flex
      align-items: center
      justify-content: center
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      height: 100%
      color: #fff
      background-color: rgba(0, 0, 0, .55)
      transform-origin: left center
      transition: all 0.5s ease
      transform: scale(1, 1)
    &:hover
      img
        transform: scale(1.5) rotate(10deg)
      &:after
        transform: scale(0, 1)
</style>
<script>
import Social from '@/components/Common/Utils/Social'
export default {
  components: {
    Social
  }
}
</script>

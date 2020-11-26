<template>
    <button type="button" class="scrollTop" v-if="isShow" @click.prevent="onClickScroll">
        <font-awesome-icon icon="angle-up"></font-awesome-icon>
    </button>
</template>
<style lang="sass" scope>
.scrollTop
  position: fixed
  bottom: 10%
  right: 5%
  background-color: #38220F
  // border-radius: 50%
  color: #fff
  border: 2px solid rgba(255,255,255, .5)
  width: 30px
  height: 30px
  animation: heartbeat 0.5s 1s linear infinite
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)
  &:focus
    outline: none
@keyframes heartbeat
  0%, 100%
    transform: scale(1)
  50%
    transform: scale(1.1)
</style>
<script>
import { TimelineLite } from 'gsap'
export default {
  data () {
    return {
      isShow: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.init)
  },
  methods: {
    init () {
      const offsetY = window.scrollY
      if (offsetY > 100) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    onClickScroll () {
      const target = document.querySelector('html, body')
      const timeline = new TimelineLite()
      timeline.to(target, {duration: 1, scrollTop: 0, ease: 'power2'})
    }
  }
}
</script>

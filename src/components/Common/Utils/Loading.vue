<template>
  <div class="loader" v-if="isLoading">
    <vue-loaders name="line-scale-pulse-out-rapid" color="#F0F2F3" scale="1.2"></vue-loaders>
  </div>
</template>
<style lang="sass" scope>
.loader
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  background-color: rgba(99,72,50,1)
  z-index: 99
  overflow: hidden
</style>
<script>
export default {
  data () {
    return {
      isLoading: true
    }
  },
  mounted () {
    this.$bus.$on('updateLoading', status => {
      this.isLoading = status
    })
  }
}
</script>

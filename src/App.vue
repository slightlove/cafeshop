<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    // Header, Follow, Footer, Alert
  }
}
</script>

<style lang="sass">
@import '~bootstrap/scss/bootstrap'
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Poppins:wght@300;400;500;700;900&display=swap')
body
  font-size: 16px
  font-family: 'Poppins', 'Noto Sans TC', '微軟正黑體', Arial
  background-color: #fafafa
</style>

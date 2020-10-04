<template>
  <div id="app">
    <Header />
    <Banner />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Common/Header'
import Banner from './components/Common/Banner'
import Footer from './components/Common/Footer'
export default {
  name: 'App',
  components: {
    Header, Banner, Footer
  }
}
</script>

<style lang="sass">
@import '~bootstrap/scss/bootstrap'
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Poppins:wght@300;400;500;700;900&display=swap')
body
  font-size: 16px
  font-family: 'Poppins', 'Noto Sans TC', '微軟正黑體', Arial
</style>

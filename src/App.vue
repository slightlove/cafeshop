<template>
  <div id="app">
<<<<<<< HEAD
    <router-view></router-view>
=======
    <Header />
    <Banner />
    <router-view></router-view>
    <Footer />
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
  </div>
</template>

<script>
<<<<<<< HEAD

export default {
  name: 'App',
  components: {
    // Header, Follow, Footer, Alert
=======
import Header from './components/Common/Header'
import Banner from './components/Common/Banner'
import Footer from './components/Common/Footer'
export default {
  name: 'App',
  components: {
    Header, Banner, Footer
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
  }
}
</script>

<style lang="sass">
@import '~bootstrap/scss/bootstrap'
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Poppins:wght@300;400;500;700;900&display=swap')
body
  font-size: 16px
  font-family: 'Poppins', 'Noto Sans TC', '微軟正黑體', Arial
<<<<<<< HEAD
  background-color: #fafafa
=======
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
</style>

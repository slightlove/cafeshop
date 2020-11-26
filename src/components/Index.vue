<template>
    <div>
      <Header />
      <Banner />
      <Products />
      <Follow />
      <Footer />
      <Loader />
    </div>
</template>
<script>
import Header from '@/components/Common/Header'
import Follow from '@/components/Common/Follow'
import Footer from '@/components/Common/Footer'
import Banner from '@/components/Common/Banner'
import Products from '@/components/Pages/Products'
import Loader from '@/components/Common/Utils/Loading'
export default {
  name: 'Content',
  components: {
    Header, Banner, Products, Follow, Footer, Loader
  }
}
</script>

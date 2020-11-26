<template>
    <div>
      <Header />
      <router-view></router-view>
      <Follow />
      <Footer />
      <Alert />
      <Loader />
    </div>
</template>
<script>
import Header from '@/components/Common/Header'
import Follow from '@/components/Common/Follow'
import Footer from '@/components/Common/Footer'
import Alert from '@/components/Common/Utils/AlertMsg'
import Loader from '@/components/Common/Utils/Loading'
export default {
  name: 'Content',
  components: {
    Header, Follow, Footer, Alert, Loader
  }
}
</script>

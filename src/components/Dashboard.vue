  <template>
  <div class="container-fluid">
    <div class="row">
      <Sidebar />
      <Alert />
      <div class="col-10">
        <Loader />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Common/Sidebar'
import Alert from '@/components/Common/Utils/AlertMsg'
import Loader from '@/components/Common/Utils/Loading'
export default {
  data () {
    return {}
  },
  created () {
    const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)eCommenceToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common['Authorization'] = cookie
  },
  mounted () {
    const vm = this
    setTimeout(function () {
      vm.$bus.$emit('updateLoading', false)
    }, 1500)
  },
  components: { Sidebar, Alert, Loader }
}
</script>

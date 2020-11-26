<template>
    <nav class="main-menu">
      <li v-if="isLogin">
        <router-link to="/admin/" class="btn btn-outline-light">
          <font-awesome-icon icon="user-cog"></font-awesome-icon>
        </router-link>
      </li>
      <li>
        <router-link name="login" to="/login" v-if="!isLogin">
          <font-awesome-icon :icon='["fas", "sign-in-alt"]' class="mr-2"></font-awesome-icon>
          登入
        </router-link>
        <button type="button" class="btn btn-outline-light" v-else @click.prevent="doLogout">
          <font-awesome-icon :icon='["fas", "sign-out-alt"]' class="mr-2"></font-awesome-icon>
          登出
        </button>
      </li>
    </nav>
</template>
<style lang="sass" scoped>
.main-menu
  display: flex
  list-style: none
  align-items: center
  li
    &:not(:last-child)
      margin-right: 1rem
</style>
<script>
import menu from '@/assets/data/menu.json'
export default {
  data () {
    return {
      menuList: menu,
      isLogin: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      const vm = this
      const api = `${process.env.APIURL}/api/user/check`
      this.$http.post(api).then(res => {
        if (res.data.success) {
          vm.isLogin = true
        }
      })
    },
    doLogout () {
      const vm = this
      const api = `${process.env.APIURL}/logout`
      this.$http.post(api).then(res => {
        if (res.data.success) {
          vm.isLogin = false
        }
      })
    }
  }
}
</script>

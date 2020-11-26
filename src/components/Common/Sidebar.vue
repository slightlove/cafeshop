<template>
  <nav name="sidebar" class="col-2">
    <div class="sidebar-brand">
      <span class="sidebar-logo">
        <img src="@/assets/images/logo.png" alt="" />
      </span>
      <div class="sidebar-text">
        <h5>Cafe<font-awesome-icon icon="heart" class="text-danger mx-1"></font-awesome-icon>er</h5>
        <span>Manager System</span>
      </div>
    </div>
    <ul>
      <li v-for="item in navs" :key="item.id">
        <router-link :to="item.url">
          <font-awesome-icon :icon="item.icon" class="mr-2"></font-awesome-icon>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <div class="container">
      <hr />
      <button type="button" class="btn btn-light btn-block" @click.prevent="doLogout" v-if="!isLogout">
        <font-awesome-icon :icon='["fas", "sign-out-alt"]' class="mr-2"></font-awesome-icon>
        登出
        </button>
      <button type="button" class="btn btn-light btn-block" disabled v-else>
        <font-awesome-icon :icon='["fas", "spinner"]' class="fa-spin"></font-awesome-icon>
      </button>
    </div>
  </nav>
</template>
<style lang="sass" scope>
[name="sidebar"]
    position: relative
    height: auto
    min-height: 100vh
    padding: 0
    background-image: linear-gradient(30deg, #38220F, #634832)
    .sidebar-brand
        padding-top: 27px
        padding-left: 21px
        display: flex
        align-items: center
        .sidebar-logo
            width: 37px
        .sidebar-text
            margin-left: 10px
            h5
                font-size: 1.125rem
                margin-bottom: 0
                color: #ffffff
            span
                font-size: 0.875rem
                color: rgba(255,255,255,0.5)
    ul
        list-style: none
        margin-top: 25px
        padding-left: 0
        li
            height: 49px
            line-height: 49px
            a
                position: relative
                display: flex
                align-items: center
                width: 100%
                height: 100%
                color: rgba(255,255,255,0.56)
                transition: all .3s ease-in
                padding-left: 21px
                background-image: linear-gradient(to right, rgba(255,255,255,0), rgba(74, 144, 226, 0))
                &:before
                    position: absolute
                    left: 0
                    content: ''
                    display: inline-block
                    height: 100%
                    width: 2px
                    background-color: rgba(255,255,255,0)
                    transition: all .3s ease-in
                i
                    margin-right: 12px
                &:focus,
                &:hover,
                &.router-link-exact-active
                    color: rgba(255,255,255,1)
                    text-decoration: none
                    background-image: linear-gradient(to right, rgba(255,255,255,0.15), rgba(74, 144, 226, 0))
                    &:before
                        background-color: rgba(255,255,255,0.4)
</style>
<script>
export default {
  data () {
    return {
      isLogout: false,
      currentActiveLink: 0,
      navs: [
        {
          id: 0,
          name: '產品管理',
          url: '/admin/',
          icon: 'cart-plus'
        },
        {
          id: 1,
          name: '訂單清單',
          url: '/admin/orderlist',
          icon: 'list-alt'
        },
        {
          id: 2,
          name: '優惠券清單',
          url: '/admin/coupon',
          icon: 'ticket-alt'
        }
      ]
    }
  },
  methods: {
    doLogout () {
      const vm = this
      const api = `${process.env.APIURL}/logout`
      vm.isLogout = true
      this.$http.post(api).then(res => {
        if (res.data.success) {
          vm.$router.push('/login')
        } else {
          vm.isLogout = false
        }
      })
    }
  }
}
</script>

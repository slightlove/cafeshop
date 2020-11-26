<template>
  <header class="header">
    <div class="header-top">
      <div class="container">
          <div class="header-top-inner">
            <Social />
            <Menu />
          </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="container">
        <div class="header-bottom-inner">
          <h1 class="header-brand">
            <router-link to='/'>Cafe<font-awesome-icon icon="heart" class="text-danger mx-1"></font-awesome-icon>er</router-link>
          </h1>
          <router-link class="header-cart" to="/cart" v-if="cartList.length > 0">
            <div class="header-cart-icon">
              <font-awesome-icon :icon="['fas', 'shopping-bag']" />
            </div>
            <ul class="header-cart-info">
              <li class="header-info-number">{{cartList.length}} Products</li>
              <li class="header-info-price">{{total_price | currency}}</li>
            </ul>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="sass" scope>
.header
  .header-top
    background-color: #38220F
    padding: 0.5rem 0
    a
      color: #fff
      transition: 0.3s
      &:hover
        text-decoration: none
        color: #634832
    .header-top-inner
      display: flex
      justify-content: space-between
      align-items: center
    .header-links
      list-style: none
      display: flex
      margin-bottom: 0
      padding-left: 0
      li
        &:not(:last-child)
          margin-right: 1rem
  .header-bottom
    padding: 1rem 0
    background-color: #fff
    .header-bottom-inner
      display: flex
      justify-content: space-between
      align-items: center
    .header-brand
      transition: all 0.3s ease
      a
        color: #38220F
        &:hover
          text-decoration: none
    .header-cart
      display: flex
      align-items: center
      cursor: pointer
      color: #9e9e9e
      border: 1px solid #e0e0e0
      padding: 0.5rem 1rem
      border-radius: 0.5rem
      transition: all 0.3s ease
      &:hover
        text-decoration: none
      .header-cart-icon
        margin-right: 1rem
        font-size: 1.5rem
        transition: all 0.3s ease
      .header-cart-info
        display: flex
        flex-direction: column
        list-style: none
        padding-left: 0
        margin-bottom: 0
        transition: all 0.3s ease
        .header-info-number
          color: #212121
        .header-info-price
          color: #38220F
          font-size: 0.875rem
  &.can-sticky
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 99
    .header-bottom
      background-color: rgba(255, 255, 255, .65)
      .header-brand
        font-size: 1rem
      .header-cart
        border: none
        padding: 0
        transform: scale(0)
        .header-cart-icon
          margin-right: 0
        .header-cart-info
          display: none
</style>
<script>
import Social from '@/components/Common/Utils/Social'
import Menu from '@/components/Common/Utils/Menu'
export default {
  data () {
    return {
      cartList: [],
      total_price: 0
    }
  },
  components: {
    Social, Menu
  },
  mounted () {
    this.initHeader()
    this.getCart()
    window.addEventListener('scroll', this.initHeader)
  },
  methods: {
    initHeader () {
      const top = window.scrollY
      const header = document.querySelector('.header')
      if (top > 100) {
        header.classList.add('can-sticky')
      } else {
        header.classList.remove('can-sticky')
      }
    },
    getCart () {
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/cart`
      this.$http.get(api).then(res => {
        if (res.data.success) {
          vm.cartList = res.data.data.carts
          vm.total_price = res.data.data.final_total
        }
      })
    }
  },
  created () {
    const vm = this
    this.$bus.$on('updateCart', () => {
      vm.getCart()
    })
  }
}
</script>

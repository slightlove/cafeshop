<template>
<<<<<<< HEAD
  <header class="header">
    <div class="header-top">
      <div class="container">
          <div class="header-top-inner">
            <Social />
            <Menu />
=======
  <header class="header can-sticky">
    <div class="header-top">
      <div class="container">
          <div class="header-top-inner">
            <ul class="header-social">
              <li v-for="social in socialList" :key="social.id"><a :href="social.url"><font-awesome-icon :icon="social.iconName" /></a></li>
            </ul>
            <ul class="header-links">
              <li v-for="menu in menuList" :key="menu.id"><a :href="menu.url" :name="menu.name">{{menu.text}}</a></li>
            </ul>
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
          </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="container">
        <div class="header-bottom-inner">
<<<<<<< HEAD
          <h1 class="header-brand">
            <router-link to='/'>Cafe<font-awesome-icon icon="heart" class="text-danger mx-1"></font-awesome-icon>er</router-link>
          </h1>
          <router-link class="header-cart" to="/cart" v-if="cartList.length > 0">
=======
          <h1 class="header-brand"><a href="/">Cafe</a></h1>
          <a class="header-cart">
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
            <div class="header-cart-icon">
              <font-awesome-icon :icon="['fas', 'shopping-bag']" />
            </div>
            <ul class="header-cart-info">
<<<<<<< HEAD
              <li class="header-info-number">{{cartList.length}} Products</li>
              <li class="header-info-price">{{total_price | currency}}</li>
            </ul>
          </router-link>
=======
              <li class="header-info-number">9 Products</li>
              <li class="header-info-price">$12345</li>
            </ul>
          </a>
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="sass" scope>
<<<<<<< HEAD
.header
=======
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
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
<<<<<<< HEAD
      align-items: center
=======
    .header-social,
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
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
<<<<<<< HEAD
    background-color: #fff
=======
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
    .header-bottom-inner
      display: flex
      justify-content: space-between
      align-items: center
    .header-brand
<<<<<<< HEAD
      transition: all 0.3s ease
=======
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
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
<<<<<<< HEAD
      transition: all 0.3s ease
=======
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
      &:hover
        text-decoration: none
      .header-cart-icon
        margin-right: 1rem
        font-size: 1.5rem
<<<<<<< HEAD
        transition: all 0.3s ease
=======
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
      .header-cart-info
        display: flex
        flex-direction: column
        list-style: none
        padding-left: 0
        margin-bottom: 0
<<<<<<< HEAD
        transition: all 0.3s ease
=======
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
        .header-info-number
          color: #212121
        .header-info-price
          color: #38220F
<<<<<<< HEAD
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
=======
</style>
<script>
import socials from '../../assets/data/socialList.json'
import menu from '../../assets/data/menu.json'
export default {
  data () {
    return {
      socialList: socials,
      menuList: menu
    }
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
  }
}
</script>

<template>
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
          </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="container">
        <div class="header-bottom-inner">
          <h1 class="header-brand"><a href="/">Cafe</a></h1>
          <a class="header-cart">
            <div class="header-cart-icon">
              <font-awesome-icon :icon="['fas', 'shopping-bag']" />
            </div>
            <ul class="header-cart-info">
              <li class="header-info-number">9 Products</li>
              <li class="header-info-price">$12345</li>
            </ul>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="sass" scope>
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
    .header-social,
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
    .header-bottom-inner
      display: flex
      justify-content: space-between
      align-items: center
    .header-brand
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
      &:hover
        text-decoration: none
      .header-cart-icon
        margin-right: 1rem
        font-size: 1.5rem
      .header-cart-info
        display: flex
        flex-direction: column
        list-style: none
        padding-left: 0
        margin-bottom: 0
        .header-info-number
          color: #212121
        .header-info-price
          color: #38220F
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
  }
}
</script>

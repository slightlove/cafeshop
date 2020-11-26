<template>
    <div class="container">
      <nav class="category-wrap row">
        <li v-for="(type, index) in category" :key="index" class="col-2">
          <div class="category-item" :class="{'active': currentCategory == type}" @click.prevent="currentCategory = type">
            <font-awesome-icon icon="coffee"></font-awesome-icon>{{type}}
          </div>
        </li>
      </nav>
      <nav class="product-wrap row">
        <li v-for="product in filterProduct" :key="product.id" class="col-6">
          <div class="product-item">
            <div class="product-item-tag">
              {{product.category}}
            </div>
            <div class="product-item-img">
              <img :src="product.imageUrl" :alt="product.title" class="img-fluid">
            </div>
            <div class="product-item-info">
              <h5>{{product.title}}</h5>
              <p class="product-desc">{{product.description}}</p>
              <div class="product-item-bottom">
                <p v-if="product.price" class="product-price"><del class="mr-2">NT {{product.origin_price | currency}}</del>NT {{product.price | currency}}</p>
                <p v-else class="product-price">NT {{product.origin_price | currency}}</p>
                <router-link class="btn-view rounded-pill" :to="'/product/'+product.id">
                  <font-awesome-icon icon="eye"></font-awesome-icon>
                  <span>View Detail</span>
                </router-link>
              </div>
            </div>
          </div>
        </li>
      </nav>
    </div>
</template>
<style lang="sass" scope>
.category-wrap
  list-style: none
  display: flex
  justify-content: center
  align-items: center
  padding: 3.125rem 1.25rem
  .category-item
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding: 1.25rem
    cursor: pointer
    font-size: 0.875rem
    color: #212121
    border: 1px solid #F0F2F3
    transition: all 0.5s ease-out
    background-color: #fff
    svg
      margin-bottom: 1rem
      font-size: 2.5rem
      color: #838383
    &:hover
      background-color: #5d4037
      color: #fff
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)
      svg
        color: #fff
    &.active
      background-color: #38220F
      color: #fff
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)
      svg
        color: #fff
.product-wrap
  list-style: none
  .product-item
    position: relative
    display: flex
    padding: 1.25rem
    margin-bottom: 1.875rem
    background-color: #fff
    border: 1px solid #F0F2F3
    border-radius: 0.5rem
    transition: all 1s ease-out
    .product-item-tag
      position: absolute
      top: 0
      left: 0
      padding: 3px 12px
      background-color: #634832
      color: #fff
      font-size: 0.875rem
      border-bottom-right-radius: 1rem
    .product-item-img
      width: 80px
      margin-top: 1.5rem
    .product-item-info
      margin-left: 1rem
      width: 100%
      h5
        font-size: 1rem
        margin-bottom: 1rem
      .product-desc
        font-size: 0.875rem
        margin-bottom: 1rem
        color: #bdbdbd
      .product-item-bottom
        display: flex
        justify-content: space-between
        align-items: center
        .product-price
          display: flex
          align-items: center
          color: #634832
          margin-bottom: 0
          font-weight: 700
          del
            color: #212121
            color: #e0e0e0
            font-size: 0.875rem
            font-weight: normal
        .btn-view
          background-color: #fff
          color: #634832
          box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)
          position: relative
          transition: all 0.3s ease
          width: 2.5rem
          height: 2.5rem
          display: flex
          align-items: center
          justify-content: center
          span
            position: absolute
            top: 8px
            right: 1rem
            margin: auto
            color: #fff
            opacity: 0
            transform: translateY(20px)
          &:hover
            width: 150px
            justify-content: flex-start
            padding-left: 1rem
            background-color: #634832
            color: #fff
            span
              opacity: 1
              display: inline-block
              transform: translateY(0)
              transition: all 0.3s 0.2s cubic-bezier(0.33, 1, 0.68, 1)
</style>
<script>
export default {
  data () {
    return {
      category: [],
      currentCategory: '全部',
      productList: []
    }
  },
  created () {
    this.getProducts()
  },
  computed: {
    filterProduct () {
      return this.productList.filter(item => {
        if (item.is_enable === '1') {
          if (this.currentCategory === '全部') {
            return this.productList
          } else {
            return item.category === this.currentCategory
          }
        }
      })
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/products/all`
      this.$http.get(api).then(res => {
        const httpStatus = res.status
        if (httpStatus === 200) {
          const products = res.data.products
          // 處理類別
          let category = new Set()
          category.add('全部')
          products.forEach(item => {
            category.add(item.category)
          })
          vm.category = category
          // 存入商品
          vm.productList = products
          vm.$bus.$emit('updateLoading', false)
        }
      })
    }
  }
}
</script>

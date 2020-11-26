<template>
    <div class="container product-wrap">
        <div class="row">
          <div class="col-12 col-md-5 product-img">
            <img :src="product.imageUrl" :alt="product.description" class="img-fluid">
          </div>
          <div class="col-12 col-md-7 product-info">
            <h1>{{product.title}}</h1>
            <ul>
              <li v-if="product.price"><del>{{product.origin_price | currency}}</del><span class="text-success mx-2">{{product.price | currency}}</span></li>
              <li v-else>{{product.origin_price | currency}}</li>
            </ul>
            <p>{{product.description}}</p>
            <div class="form-group">
              <select class="form-control" id="amount" v-model="tempField.amount" required>
                <option value="">請選擇購買數量</option>
                <option v-for="num in 10" :key="num" :value="num">{{num}}</option>
              </select>
            </div>
            <div class="d-flex justify-content-end align-items-center">
              <a href="/" class="btn btn-secondary mr-2">返回</a>
              <button type="button" class="btn btn-outline-primary" @click.prevent="onAddtoCart" v-if="!onAddToCart"><font-awesome-icon icon="shopping-cart" class="mr-2"></font-awesome-icon>  加入購物車</button>
              <button type="button" class="btn btn-secondary" disabled v-else>
                <font-awesome-icon class="fa-spin" icon="spinner"></font-awesome-icon>
                加入購物車中
              </button>
            </div>
          </div>
        </div>
    </div>
</template>
<style lang="sass" scope>
.product-wrap
  padding: 2rem 0
  .product-img
    overflow: hidden
    img
      transition: all 0.3s ease
      transform: scale(1)
      &:hover
        transform: scale(1.1)
  .product-info
    h1
      font-size: 1.5rem
      letter-spacing: 0.125rem
      border-bottom: 1px solid #efefef
      padding-bottom: 1rem
    ul
      list-style: none
      padding-left: 0
      del
        font-size: 0.875rem
        color: #bdbdbd
      span
        font-size: 1.25rem
        font-weight: 600
</style>
<script>
export default {
  data () {
    return {
      id: '',
      product: {},
      onAddToCart: false,
      tempField: {
        amount: ''
      }
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.getProduct()
  },
  methods: {
    getProduct () {
      if (this.id === '') return
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/product/${this.id}`
      this.$http.get(api).then(res => {
        if (res.data.success) {
          vm.product = Object.assign({}, res.data.product)
        }
        this.$bus.$emit('updateLoading', false)
      })
    },
    onAddtoCart () {
      if (this.tempField.amount === '') return
      this.onAddToCart = true
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/cart`
      const formData = {
        product_id: this.id,
        qty: this.tempField.amount
      }
      this.$http.post(api, {data: formData}).then(res => {
        if (res.data.success) {
          vm.$bus.$emit('updateCart')
          vm.$bus.$emit('message:push', res.data.message, 'success')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.onAddToCart = false
      })
    }
  }
}
</script>

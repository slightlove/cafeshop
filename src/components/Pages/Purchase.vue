<template>
  <div class="container purchase-wrap">
    <p class="alert alert-danger text-center" v-if="!is_paid">尚未結帳</p>
    <p v-else class="alert alert-success text-center">結帳完成</p>
    <h2 class="purchase-title">購買資訊</h2>
    <table class="table table-striped table-bordered table-hover purchase-order">
      <thead>
        <tr>
          <th>產品名稱</th>
          <th>數量</th>
          <th>總計</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order" :key="item.id">
          <td>
            <img :src="item.product.imageUrl" alt="">
            {{item.product.title}}
          </td>
          <td>{{item.qty}}</td>
          <td>{{item.final_total | currency}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-right">運費：{{60 | currency}}</td>
        </tr>
        <tr class="bg-secondary text-white">
          <td colspan="4" class="text-right">總計：{{total_price | currency}}</td>
        </tr>
      </tfoot>
    </table>
    <h2 class="purchase-title">個人資料</h2>
    <table class="table table-striped table-bordered table-hover purchase-order">
      <thead>
        <tr>
          <th width="20%">標題</th>
          <th width="80%">資訊</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>姓名</td>
          <td>{{userInfo.name}}</td>
        </tr>
        <tr>
          <td>電子信箱</td>
          <td>{{userInfo.email}}</td>
        </tr>
        <tr>
          <td>手機號碼</td>
          <td>{{userInfo.tel}}</td>
        </tr>
        <tr>
          <td>居住地址</td>
          <td>{{userInfo.address}}</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-end my-2">
      <div v-if="!is_paid">
        <button type="button" class="btn btn-warning text-white" @click.prevent="paidOrder" v-if="!isPaidment">
          <font-awesome-icon icon="money-bill-wave-alt" class="mr-2"></font-awesome-icon> 確定結帳
        </button>
        <button type="button" class="btn btn-warning text-white" disabled v-else>
          <font-awesome-icon icon="spinner" class="fa-spin mr-2"></font-awesome-icon> 進行結帳中
        </button>
      </div>
      <router-link to="/" v-else class="btn btn-secondary">返回</router-link>
    </div>
  </div>
</template>
<style lang="sass" scope>
.purchase-wrap
  .purchase-title
    color: #45526e
    text-align: center
    font-size: 1.25rem
    margin: 1rem auto
    border-bottom: 1px dashed #d0d6e2
    padding-bottom: 1rem
  .purchase-order
    tbody
      td
        vertical-align: middle
        button
          width: 100%
          text-align: center
        img
          width: 50px
          margin-right: 1rem
</style>
<script>
export default {
  data () {
    return {
      id: '',
      userInfo: {},
      order: {},
      is_paid: false,
      total_price: 0,
      isPaidment: false
    }
  },
  created () {
    this.id = this.$router.history.current.params.id
    this.getOrder()
  },
  methods: {
    getOrder () {
      const vh = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/order/${this.id}`
      this.$http.get(api).then(res => {
        if (res.data.success) {
          const order = res.data.order
          vh.userInfo = Object.assign({}, order.user)
          vh.order = Object.assign({}, order.products)
          vh.total_price = order.total
          vh.is_paid = order.is_paid
        }
        vh.$bus.$emit('updateLoading', false)
      })
    },
    paidOrder () {
      const vh = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/pay/${this.id}`
      const formData = {
        order_id: this.id
      }
      vh.isPaidment = true
      this.$http.post(api, {data: formData}).then(res => {
        if (res.data.success) {
          vh.$bus.$emit('message:push', res.data.message, 'success')
          setTimeout(() => {
            vh.is_paid = true
            vh.$bus.$emit('updateCart')
          }, 2000)
        } else {
          vh.$bus.$emit('message:push', res.data.message, 'danger')
          vh.isPaidment = false
        }
      })
    }
  }
}
</script>

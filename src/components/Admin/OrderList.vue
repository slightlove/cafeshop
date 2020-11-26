<template>
  <div name="admin_order">
    <h1 class="admin_order-title">
      <font-awesome-icon icon="list-alt" class="mr-2"></font-awesome-icon>
      訂單管理
    </h1>
    <div class="container">
      <div class="alert alert-primary text-center my-2" v-if="orders.length === 0">
        目前無訂單
      </div>
      <table class="table table-hover table-striped my-3" v-else>
        <thead>
          <tr>
            <th>購買日期</th>
            <th>連絡信箱</th>
            <th>購買品項</th>
            <th>購買金額</th>
            <th>付款狀態</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="admin_order-list">
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.paid_date | moment("YYYY/MM/DD hh:ss a") }}</td>
            <td v-if="order.user">{{ order.user.email }}</td>
            <td v-else></td>
            <td>
              <ul>
                <li v-for="item in order.products" :key="item.id">
                  {{ item.product.title }} - {{ item.qty }}
                  {{ item.product.unit }}
                </li>
              </ul>
            </td>
            <td>{{ order.total | currency }}</td>
            <td v-if="order.is_paid" class="text-success">已付款</td>
            <td v-else class="text-danger">未付款</td>
            <td>
              <button type="button" class="btn" @click.prevent="openModifyModal(order)">
                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal" tabindex="-1" id="modifyModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-warning text-white">
            <h5 class="modal-title">
              <font-awesome-icon icon="pencil-alt" class="mr-2"></font-awesome-icon>
              修改訂單
            </h5>
          </div>
          <div class="modal-body">
            <div class="card p-3" v-if="tempOrder.user">
              <h5>聯絡人資料</h5>
              <div class="form-row">
                <div class="form-group col-12 col-md-6">
                  <label for="name">姓名</label>
                  <input type="text" class="form-control" id="name" disabled v-model="tempOrder.user.name">
                </div>
                <div class="form-group col-12 col-md-6">
                  <label for="tel">電話</label>
                  <input type="tel" class="form-control" id="tel" disabled v-model="tempOrder.user.tel">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-12 col-md-6">
                  <label for="email">郵件信箱</label>
                  <input type="email" class="form-control" id="email" disabled v-model="tempOrder.user.email">
                </div>
                <div class="form-group col-12 col-md-6">
                  <label for="address">地址</label>
                  <input type="text" class="form-control" id="address" disabled v-model="tempOrder.user.address">
                </div>
              </div>
            </div>
            <div class="card my-2 p-3 modifyModal_orderlist">
              <h5>訂單資訊</h5>
              <ul>
                <li><span>訂單成立時間：</span>{{tempOrder.create_at | moment('YYYY/MM/DD hh:ss a')}}</li>
                <li><span>交易完成時間：</span>{{tempOrder.paid_date | moment('YYYY/MM/DD hh:ss a')}}</li>
                <li><span>商品數量：</span>{{tempOrder.num}}</li>
                <li><span>總金額：</span>{{tempOrder.total | currency}}</li>
                <li><span>備註：</span>{{tempOrder.message}}</li>
              </ul>
            </div>
            <div class="custom-control custom-switch ml-auto">
              <input type="checkbox" class="custom-control-input" id="ispaid" v-model="tempOrder.is_paid">
              <label class="custom-control-label" for="ispaid">付款是否完成</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" @click.prevent="modifyOrder">修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="sass" scope>
div[name="admin_order"]
  margin: 1rem auto
  .admin_order-title
    color: #634832
    font-size: 2rem
    border-bottom: 1px dotted #634832
    padding-bottom: 1rem
  .admin_order-list
    ul
      list-style: none
      padding-left: 0
  #modifyModal
    .modal-body
      h5
        font-size: 1rem
        color: #bdbdbd
      .modifyModal_orderlist
        ul
          list-style: none
          padding-left: 0
          li
            padding-left: 1rem
            span
              margin-left: -1rem
              display: block
              color: #616161
              font-size: 0.875rem
</style>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      orders: [],
      tempOrder: {}
    }
  },
  mounted () {
    this.$bus.$emit('updateLoading', true)
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/orders`
      this.$http.get(api).then(res => {
        if (res.data.success) {
          vm.orders = res.data.orders
          vm.$bus.$emit('updateLoading', false)
        }
      })
    },
    modifyOrder () {
      const vm = this
      const id = this.tempOrder.id
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/order/${id}`
      const formData = {
        is_paid: this.tempOrder.is_paid
      }
      this.$http.put(api, {data: formData}).then(res => {
        if (res.data.success) {
          vm.$bus.$emit('message:push', res.data.message, 'success')
          setTimeout(function () {
            $('#modifyModal').modal('hide')
            vm.getOrderList()
          }, 1500)
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    },
    openModifyModal (item) {
      this.tempOrder = Object.assign({}, item)
      $('#modifyModal').modal('show')
    }
  }
}
</script>

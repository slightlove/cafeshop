<template>
  <ValidationObserver @submit.prevent="sendCart" tag="form" v-slot="{invalid}">
    <div class="container my-5">
      <div class="row">
        <div class="col-12 col-md-8">
          <button type="button" class="btn btn-outline-warning btn-block" data-toggle="collapse" data-target="#cart-list" aria-expanded="false" aria-controls="cart-list">購物清單</button>
          <div class="collapse my-3" id="cart-list">
            <table class="table table-striped table-bordered table-hover" v-if="cartList.length !== 0">
              <thead>
                <tr>
                  <th>產品名稱</th>
                  <th>單品金額</th>
                  <th>數量</th>
                  <th>總計</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartList" :key="item.id">
                  <td>
                    <img :src="item.product.imageUrl" alt="">
                    {{item.product.title}}
                  </td>
                  <td><span v-if="item.product.price">{{item.product.price | currency}}</span><span
                      v-else>{{item.product.origin_price | currency}}</span></td>
                  <td>{{item.qty}}</td>
                  <td>{{item.final_total | currency}}</td>
                  <td><button type="button" class="btn text-danger" @click.prevent="removeItem(item.id)">
                      <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                    </button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card mt-3">
            <div class="card-header">
              <font-awesome-icon icon="user-circle" class="mr-2"></font-awesome-icon> 訂購人資訊
            </div>
            <div class="card-body">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <validation-provider rules="required" v-slot="{errors}">
                    <label for="name">訂購人姓名</label>
                    <input type="text" class="form-control" maxlength="6" name="name" id="name" placeholder="請輸入姓名" v-model="orderInfo.name" :class="{'is-invalid': errors[0]}">
                    <span v-if="errors[0]" class="text-danger my-2"><font-awesome-icon icon="exclamation-circle" class="mr-1"></font-awesome-icon> 請輸入姓名</span>
                  </validation-provider>
                </div>
                <div class="form-group col-md-6">
                  <validation-provider rules="required" v-slot="{errors}">
                    <label for="email">電子信箱</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="請輸入電子郵件" v-model="orderInfo.email" :class="{'is-invalid': errors[0]}">
                    <span v-if="errors[0]" class="text-danger my-2"><font-awesome-icon icon="exclamation-circle" class="mr-1"></font-awesome-icon> 請輸入電子信箱</span>
                  </validation-provider>
                </div>
              </div>
              <div class="form-group">
                <validation-provider rules="mobile" v-slot="{errors}">
                    <label for="mobile">手機號碼</label>
                    <input type="tel" class="form-control" id="mobile" name="mobile" placeholder="請輸入手機號碼" maxlength="10" v-model="orderInfo.tel" :class="{'is-invalid': errors[0]}">
                    <span v-if="errors[0]" class="text-danger my-2"><font-awesome-icon icon="exclamation-circle" class="mr-1"></font-awesome-icon> 請輸入手機號碼</span>
                  </validation-provider>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="city">城市</label>
                  <select class="form-control" id="city" v-model="orderInfo.place.city" @change="getArea(orderInfo.place.city)">
                    <option value="">請選擇城市</option>
                    <option :value="city" v-for="(city, idx) in addrInfo.city" :key="idx">{{city}}</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label for="area">縣市區</label>
                  <select class="form-control" id="area" v-model="orderInfo.place.area">
                    <option value="">請選擇縣市區</option>
                    <option :value="area" v-for="(area, idx) in addrInfo.area" :key="idx">{{area}}</option>
                  </select>
                </div>
                <div class="form-group col-md-12">
                  <validation-provider rules="required" v-slot="{errors}">
                    <label for="address">居住地址</label>
                    <input type="text" class="form-control" id="address" placeholder="請輸入居住地址" v-model="orderInfo.place.addr">
                    <span v-if="errors[0]" class="text-danger my-2"><font-awesome-icon icon="exclamation-circle" class="mr-1"></font-awesome-icon> 請輸入居住地址</span>
                  </validation-provider>
                </div>
                <div class="form-group col-md-12">
                  <label for="memo">備註</label>
                  <textarea class="form-control" id="memo" rows="5" v-model="orderInfo.memo" placeholder="備註"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-header bg-light">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="輸入優惠券" aria-label="Using Coupon"
                  aria-describedby="button-addon2" :disabled="isUsingCoupon" v-model="coupon">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click.prevent="useCoupon"
                    v-if="!isUsingCoupon">
                    <font-awesome-icon icon="money-bill-wave-alt" class="mr-2"></font-awesome-icon> 使用優惠券
                  </button>
                  <button class="btn btn-secondary" disabled v-else>
                    已使用優惠券
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <span>商品小計算：</span>
                <span class="text-warning">
                  {{total_price | currency}}
                </span>
              </div>
                <button type="submit" class="btn btn-warning btn-lg btn-block my-2 text-white" :disabled="invalid" v-if="!status.onCreateOrder">確認購買</button>
                <button type="submit" disabled class="btn btn-warning btn-lg btn-block my-2 text-white" v-else>
                  <font-awesome-icon class="fa-spin mr-2" icon="spinner"></font-awesome-icon>
                  新增訂單中
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>
<style lang="sass" scope>
  .table
    tbody
      td
        vertical-align: middle
        button
          width: 100%
          text-align: center
        img
          width: 50px
          margin-right: 1rem
      a[name="paidment"]
        &.isDisabled
          pointer-events: none
</style>
<script>
import adrJson from '@/assets/data/address.json'
export default {
  data () {
    return {
      cartList: [],
      total_price: 0,
      coupon: '',
      isUsingCoupon: false,
      orderInfo: {
        name: '',
        email: '',
        tel: '',
        memo: '',
        place: {
          city: '',
          area: '',
          addr: ''
        }
      },
      status: {
        onCreateOrder: false
      },
      addrInfo: {
        city: [],
        area: []
      }
    }
  },
  methods: {
    getCart () {
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/cart`
      this.$http.get(api).then(res => {
        if (res.data.success) {
          vm.cartList = res.data.data.carts
          vm.total_price = res.data.data.final_total
        }
        vm.$bus.$emit('updateLoading', false)
      })
    },
    removeItem (id) {
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/cart/${id}`
      this.$http.delete(api).then(res => {
        if (res.data.success) {
          vm.getCart()
          vm.$bus.$emit('updateCart')
        }
      })
    },
    useCoupon () {
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/coupon`
      const rowData = {
        code: this.coupon
      }
      this.$http.post(api, {
        data: rowData
      }).then(res => {
        if (res.data.success) {
          vm.getCart()
          vm.$bus.$emit('updateCart')
          vm.total_price = res.data.final_total
          vm.isUsingCoupon = true
          vm.$bus.$emit('message:push', res.data.message, 'success')
        } else {
          vm.isUsingCoupon = false
          vm.coupon = ''
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    },
    sendCart () {
      const vh = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/order`
      const formData = {
        user: {
          name: this.orderInfo.name,
          email: this.orderInfo.email,
          tel: this.orderInfo.tel,
          address: this.orderInfo.place.city + this.orderInfo.place.area + this.orderInfo.place.addr
        },
        message: this.orderInfo.memo
      }
      vh.status.onCreateOrder = true
      if (this.cartList.length === 0) {
        this.$bus.$emit('message:push', '您的購物車是空的喔！', 'danger')
        vh.status.onCreateOrder = false
        return
      }
      this.$http.post(api, {data: formData}).then(res => {
        if (res.data.success) {
          vh.$bus.$emit('message:push', res.data.message, 'success')
          setTimeout(() => {
            vh.$router.push(`/purchase/${res.data.orderId}`)
          }, 1000)
        } else {
          vh.$bus.$emit('message:push', res.data.message, 'danger')
          vh.status.onCreateOrder = false
        }
      })
    },
    getCity () {
      const vh = this
      if (adrJson.length !== 0) {
        adrJson.filter(item => {
          vh.addrInfo.city.push(item.CityName)
        })
      }
    },
    getArea (city) {
      const vh = this
      if (city) {
        adrJson.filter(item => {
          if (item.CityName === city) {
            item.AreaList.forEach(area => {
              vh.addrInfo.area.push(area.AreaName)
            })
          }
        })
      } else {
        this.addrInfo.area = []
        this.orderInfo.place.area = ''
      }
    }
  },
  mounted () {
    this.getCart()
    this.getCity()
  }
}

</script>

<template>
  <div name="admin_coupon">
    <h1 class="admin_coupon-title">
      <font-awesome-icon icon="ticket-alt" class="mr-2"></font-awesome-icon>
      優惠券管理
    </h1>
    <div class="text-right my-2">
      <button class="btn btn-outline-primary" @click.prevent="openMsgModal(true)">
        <font-awesome-icon icon="plus-circle" class="mr-2"></font-awesome-icon>
        新增優惠券
      </button>
    </div>
    <div class="alert alert-primary text-center" v-if="coupons.length === 0">無優惠券資料</div>
    <table class="table table-striped table-hover" v-else>
      <thead>
        <tr>
          <th>名稱</th>
          <th>優惠代碼</th>
          <th>折扣金額</th>
          <th>有效期間</th>
          <th>啟用狀態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.percent }}%</td>
          <td>{{ coupon.due_date | moment("YYYY/MM/DD hh:mm a") }}</td>
          <td>
            <span v-if="coupon.is_enabled === '1'" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td class="d-flex justify-content-around">
            <button
              type="button"
              class="btn btn-sm btn-outline-ring"
              @click.prevent="openMsgModal(false, coupon)"
            >
              <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
            </button>
            <button type="button" class="btn btn-sm text-danger" @click="openRemoveModal(coupon)">
              <font-awesome-icon icon='trash-alt'></font-awesome-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!--Message Modal-->
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      id="couponModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" v-if="isNew">
              <font-awesome-icon icon="plus-square" class="mr-2"></font-awesome-icon>
              新增優惠券
            </h5>
            <h5 class="modal-title" v-else>
              <font-awesome-icon icon="pencil-alt" class="mr-2"></font-awesome-icon>
              修改優惠券
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ValidationObserver @submit.prevent="updateCoupon" tag="form" v-slot="{invalid}">
            <div class="modal-body">
              <div class="custom-control custom-switch text-right mb-3">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customSwitch1"
                  v-model="tempCoupon.is_enabled"
                  true-value="1"
                  false-value="0"
                />
                <label class="custom-control-label" for="customSwitch1"
                  >是否啟用</label
                >
              </div>
              <div class="form-group row">
                <label for="title" class="col-md-2 col-form-label">名稱</label>
                <div class="col-md-10">
                  <validation-provider rules="required" v-slot="{errors}">
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      name="couponName"
                      placeholder="請輸入優惠券名稱"
                      v-model="tempCoupon.title"
                      :class="{ 'is-invalid': errors[0] }"
                    />
                    <span class="text-danger" v-if="errors[0]"
                      >請輸入名稱</span
                    >
                  </validation-provider>
                </div>
              </div>
              <div class="form-group row">
                <label for="code" class="col-md-2 col-form-label">序號</label>
                <div class="col-md-10">
                  <validation-provider rules="required" v-slot="{errors}">
                    <input
                      type="text"
                      class="form-control"
                      id="code"
                      name="code"
                      placeholder="請輸入優惠券序號"
                      v-model="tempCoupon.code"
                      :class="{ 'is-invalid': errors[0] }"
                    />
                    <span class="text-danger" v-if="errors[0]"
                      >請輸入序號</span
                    >
                  </validation-provider>
                </div>
              </div>
              <div class="form-group row">
                <label for="percent" class="col-md-2 col-form-label"
                  >折扣百分比</label
                >
                <div class="col-md-10">
                  <validation-provider rules="required" v-slot="{errors}">
                  <input
                    type="number"
                    class="form-control"
                    id="percent"
                    name="percent"
                    placeholder="請輸入優惠券折扣金額"
                    v-model="tempCoupon.percent"
                    :class="{ 'is-invalid': errors[0] }"
                  />
                  <span class="text-danger" v-if="errors[0]"
                    >請輸入折扣百分比</span
                  >
                  </validation-provider>
                </div>
              </div>
              <div class="form-group row">
                <label for="due_date" class="col-md-2 col-form-label"
                  >到期日</label
                >
                <div class="col-md-10">
                  <VueCtkDateTimePicker
                    v-model="tempCoupon.due_date"
                    label="請輸入到期日期"
                    formatted="YYYY/MM/DD hh:mm a"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                關閉
              </button>
              <button type="submit" class="btn btn-primary" :disabled="invalid">
                <span v-if="status.isUpdateData">
                  <font-awesome-icon icon="spinner" class="fa-pulse mr-2"></font-awesome-icon>
                </span>
                <span v-else>
                  <font-awesome-icon icon="paper-plane" class="mr-2"></font-awesome-icon>
                </span>
                送出
              </button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <!--Delete Modal-->
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      id="removeModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <font-awesome-icon icon="trash-alt" class="mr-2"></font-awesome-icon>
              刪除優惠券
            </h5>
          </div>
          <div class="modal-body">
            您確定要刪除
            <span class="text-danger">{{ tempCoupon.title }} </span>嗎?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="removeCoupon"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Modal End-->
  </div>
</template>
<style lang="sass" scope>
div[name='admin_coupon']
  margin: 1rem auto
  .admin_coupon-title
    color: #634832
    font-size: 2rem
    border-bottom: 1px dotted #634832
    padding-bottom: 1rem
</style>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      isNew: false,
      coupons: [],
      tempCoupon: {},
      status: {
        isUpdateData: false,
        isDeleteData: false
      }
    }
  },
  mounted () {
    this.$bus.$emit('updateLoading', true)
    this.getCoupon()
  },
  methods: {
    getCoupon () {
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/coupons`
      this.$http.get(api).then(res => {
        if (res.data.success) {
          vm.coupons = res.data.coupons
          vm.$bus.$emit('updateLoading', false)
        }
      })
    },
    updateCoupon () {
      const vm = this
      let api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/coupon/${this.tempCoupon.id}`
      let httpMethod = 'put'
      let sendData = {}
      if (this.isNew) {
        api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/coupon`
        httpMethod = 'post'
      }
      this.status.isUpdateData = true
      sendData = Object.assign({}, this.tempCoupon)
      sendData.due_date = new Date(sendData.due_date).getTime()
      this.$http[httpMethod](api, { data: sendData }).then(res => {
        if (res.data.success) {
          vm.$bus.$emit('message:push', res.data.message, 'success')
          $('#couponModal').modal('hide')
          vm.getCoupon()
        }
        this.status.isUpdateData = false
      })
    },
    removeCoupon () {
      const vm = this
      let api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(api).then(res => {
        if (res.data.success) {
          vm.$bus.$emit('message:push', res.data.message, 'success')
          $('#removeModal').modal('hide')
          vm.getCoupon()
        }
      })
    },
    openMsgModal (isNew, item) {
      this.isNew = isNew
      if (isNew) {
        this.tempCoupon = {}
      } else {
        this.tempCoupon = Object.assign({}, item)
        this.tempCoupon.due_date = this.$moment(this.tempCoupon.due_date).format('YYYY/MM/DD hh:mm')
      }
      $('#couponModal').modal('show')
    },
    openRemoveModal (item) {
      this.tempCoupon = Object.assign({}, item)
      this.tempCoupon.due_date = this.$moment(
        this.tempCoupon.due_date
      ).format('YYYY/MM/DD hh:mm')
      $('#removeModal').modal('show')
    }
  }
}
</script>

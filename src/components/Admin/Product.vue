<template>
  <div name="admin_product">
    <h1 class="admin_title">
      <font-awesome-icon icon="cart-plus" class="mr-2"></font-awesome-icon>
      產品管理
    </h1>
    <div class="text-right">
      <button class="btn btn-outline-primary" @click.prevent="openFeatureModal(true)">
        <font-awesome-icon icon="plus-circle" class="mr-2"></font-awesome-icon>
        <i class="fas fa-plus-circle mr-2"></i>
        新增產品
      </button>
    </div>
    <div class="alert alert-primary text-center my-2" v-if="products.length === 0">
      無商品資訊
    </div>
    <table class="table table-hover table-striped my-3" v-else>
      <thead>
        <tr>
          <th width="10%">類別</th>
          <th>標題</th>
          <th width="30%">描述</th>
          <th width="10%">原價</th>
          <th width="10%">售價</th>
          <th width="10%">是否啟用</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.origin_price | currency }}</td>
          <td v-if="item.price">{{ item.price | currency }}</td>
          <td v-else>$ -</td>
          <td>
            <span v-if="item.is_enable === '1'" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td class="d-flex justify-content-around">
            <button
              type="button"
              class="btn btn-sm btn-outline-ring"
              data-toggle="modal"
              @click.prevent="openMsgModal(item)"
            >
            <font-awesome-icon icon="eye"></font-awesome-icon>
            </button>
            <button type="button" class="btn btn-sm btn-outline-ring" @click.prevent="openFeatureModal(false, item)">
              <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
            </button>
            <button type="button" class="btn btn-sm btn-outline-ring" @click="openDelModal(item)">
              <font-awesome-icon icon="trash-alt" class="text-danger"></font-awesome-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!--Message Modal-->
    <div class="modal fade" id="msgModal" tabindex="-1" role="dislog" aria-labelledby="msgModal" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header text-white">
            <h5 class="modal-title" id="msgModal">
              <font-awesome-icon icon="list" class="mr-2"></font-awesome-icon>
              商品資訊
            </h5>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-6">
                  <img :src="tempProduct.imageUrl" :alt="tempProduct.title" class="img-fluid" />
                </div>
                <div class="col-6 modal-info">
                  <h1>{{ tempProduct.title }}</h1>
                  <ul>
                    <li v-if="tempProduct.description">
                      <span>產品介紹</span>{{ tempProduct.description }}
                    </li>
                    <li v-if="tempProduct.content">
                      <span>產品內容</span>{{ tempProduct.content }}
                    </li>
                    <li>
                      <span>原價</span>{{ tempProduct.origin_price | currency }}
                    </li>
                    <li><span>售價</span>{{ tempProduct.price | currency }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Feature Modal-->
    <div class="modal fade" id="featureModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <ValidationObserver @submit.prevent="updateProduct" tag="form" v-slot="{invalid}">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <font-awesome-icon icon="store" class="mr-2"></font-awesome-icon>
                編輯商品
              </h5>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-6">
                    <img :src="tempProduct.imageUrl" alt="" class="img-fluid" />
                    <div class="custom-file my-3">
                      <div class="form-group">
                        <span v-if="status.fileUploading">
                          <font-awesome-icon icon="spinner" class="fa-spin"></font-awesome-icon>
                        </span>
                        <label for="exampleFormControlFile1">上傳圖片</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1" ref="files" @change="uploadImage"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="custom-control custom-switch text-right">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customSwitch1"
                        v-model="tempProduct.is_enable"
                        true-value="1"
                        false-value="0"
                      />
                      <label class="custom-control-label" for="customSwitch1"
                        >是否啟用</label
                      >
                    </div>
                    <div class="form-group">
                      <validation-provider rules="required" v-slot="{errors}">
                        <label for="title">商品名稱</label>
                        <input type="text" class="form-control" id="title" name="storeTitle" v-model="tempProduct.title" :class="{ 'is-invalid': errors[0]}"/>
                        <span class="text-danger" v-if="errors[0]">請輸入商品名稱</span>
                      </validation-provider>
                    </div>
                    <div class="form-group">
                      <validation-provider rules="required" v-slot="{errors}">
                        <label for="category">商品類別</label>
                        <input
                          type="text"
                          class="form-control"
                          id="category"
                          name="category"
                          v-model="tempProduct.category"
                          :class="{ 'is-invalid': errors[0]}"
                        />
                        <span class="text-danger" v-if="errors[0]">請輸入商品類別</span>
                      </validation-provider>
                    </div>
                    <div class="form-group">
                      <label for="content">商品描述</label>
                      <textarea
                        class="form-control"
                        id="content"
                        rows="3"
                        v-model="tempProduct.description"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label for="content">商品內容</label>
                      <textarea
                        class="form-control"
                        id="content"
                        rows="3"
                        v-model="tempProduct.content"
                      ></textarea>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="form-group">
                          <validation-provider rules="required" v-slot="{errors}">
                            <label for="origin_price">原價</label>
                            <input
                              type="number"
                              class="form-control"
                              id="origin_price"
                              name="origin_price"
                              min="0"
                              v-model="tempProduct.origin_price"
                              :class="{
                                'is-invalid': errors[0]
                              }"
                            />
                            <span class="text-danger" v-if="errors[0]">請輸入原價</span>
                          </validation-provider>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="form-group">
                          <label for="price">特價</label>
                          <input
                            type="number"
                            class="form-control"
                            id="price"
                            min="0"
                            v-model="tempProduct.price"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6">
                        <div class="form-group">
                          <label for="num">庫存</label>
                          <input
                            type="num"
                            class="form-control"
                            id="num"
                            v-model="tempProduct.num"
                          />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="form-group">
                          <label for="unit">單位</label>
                          <input
                            type="text"
                            class="form-control"
                            id="unit"
                            v-model="tempProduct.unit"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
              <button type="submit" class="btn btn-primary" v-if="!status.fileUploading" :disabled="invalid">送出</button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <!--Delete Modal-->
    <div
      class="modal fade"
      id="delModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="fas fa-trash-alt mr-3"></i> 商品資訊
            </h5>
          </div>
          <div class="modal-body">
            你確定要刪除商品<span class="text-danger mx-2">{{
              tempProduct.title
            }}</span
            >嗎？
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
              @click.prevent="removeItem"
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
div[name="admin_product"]
  margin: 1rem auto
  .admin_title
    color: #634832
    font-size: 2rem
    border-bottom: 1px dotted #634832
    padding-bottom: 1rem
  #msgModal
    .modal-header
      background-image: linear-gradient(to top, #38220F, #634832)
    .modal-info
      h1
        font-size: 1.5rem
        letter-spacing: 0.125rem
        color: #634832
        border-bottom: 1px solid #efefef
        padding-bottom: 1rem
      ul
        padding-left: 0
        list-style: none
        margin-top: 1rem
        li
          padding-left: 1rem
          line-height: 1.875
          span
            display: block
            margin-left: -1rem
            margin-bottom: 0.125rem
            margin-top: 0.125rem
            font-style: italic
            font-size: 0.875rem
            color: #bdbdbd
</style>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      isNew: false,
      products: [],
      tempProduct: {},
      status: {
        fileUploading: false
      }
    }
  },
  mounted () {
    this.$bus.$emit('updateLoading', true)
    this.getProducts()
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/products/all`
      this.$http.get(api).then(res => {
        if (res.data.success) {
          vm.products = res.data.products
          vm.$bus.$emit('updateLoading', false)
        }
      })
    },
    updateProduct () {
      const vm = this
      let api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/product/${this.tempProduct.id}`
      let httpMethod = 'put'
      if (this.isNew) {
        api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/product`
        httpMethod = 'post'
      }
      this.$http[httpMethod](api, { data: this.tempProduct }).then(res => {
        if (res.data.success) {
          $('#featureModal').modal('hide')
          vm.getProducts()
        }
      })
    },
    uploadImage () {
      const vm = this
      const uploadFiles = this.$refs.files.files[0]
      if (uploadFiles === undefined) return
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/upload`
      let formData = new FormData()
      formData.append('file-to-upload', uploadFiles)
      this.status.fileUploading = true
      this.$http
        .post(api, formData, {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          if (res.data.success) {
            vm.status.fileUploading = false
            vm.tempProduct.imageUrl = res.data.imageUrl
          } else {
            vm.$bus.$emit('message:push', res.data.message, 'danger')
            vm.status.fileUploading = false
          }
        })
    },
    removeItem (item) {
      const vm = this
      const api = `${process.env.APIURL}/api/${process.env.APINAME}/admin/product/${this.tempProduct.id}`
      this.$http.delete(api).then(res => {
        if (res.data.success) {
          $('#delModal').modal('hide')
          vm.isLoading = false
          vm.getProducts()
        }
      })
    },
    // ======= Model ========
    openMsgModal (item) {
      this.tempProduct = Object.assign({}, item)
      $('#msgModal').modal('show')
    },
    openFeatureModal (isNew, item) {
      this.isNew = isNew
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = Object.assign({}, item)
        if (this.tempProduct.is_enable === undefined) {
          this.tempProduct.is_enable = 0
        }
      }
      $('#featureModal').modal('show')
    },
    openDelModal (item) {
      this.tempProduct = Object.assign({}, item)
      $('#delModal').modal('show')
    }
  }
}
</script>

<template>
  <div class="container login-wrap">
    <div class="row">
      <div class="col-12 col-md-5 login-img">
        <div class="login-img-inner">
          <font-awesome-icon icon="coffee" class="text-white"></font-awesome-icon>
          <h1>歡迎回來</h1>
          <p>親愛的會員您好，目前有多項活動等您參與！</p>
        </div>
      </div>
      <div class="col-12 col-md-7 login-form">
        <h1>登入</h1>
        <ValidationObserver @submit.prevent="doLogin" tag="form" v-slot="{invalid}">
            <div class="form-group">
              <validation-provider rules="required" v-slot="{errors}">
                <input type="email" class="form-control" id="account" name="account" placeholder="請輸入帳號：name@example.com" v-model="user.username">
                <span v-if="errors[0]" class="text-danger my-2"><font-awesome-icon icon="exclamation-circle" class="mr-1"></font-awesome-icon> 請輸入帳號</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider rules="required" v-slot="{errors}">
                <input type="password" class="form-control" id="pwd" placeholder="請輸入密碼" v-model="user.password">
                <span v-if="errors[0]" class="text-danger my-2"><font-awesome-icon icon="exclamation-circle" class="mr-1"></font-awesome-icon> 請輸入密碼</span>
              </validation-provider>
            </div>
            <p class="text-right">
              <a href="#" class="text-muted">忘記密碼?</a>
            </p>
            <button type="submit" class="btn btn-lg btn-block my-2" :disabled="invalid" v-if="!isClick">登入</button>
            <button class="btn btn-lg btn-block my-2" v-else disabled>
              <font-awesome-icon :icon='["fas", "spinner"]' class="fa-spin"></font-awesome-icon>
            </button>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
.login-wrap
  margin: 2rem auto
  .login-img
    background-image: url('../assets/images/auth.jpg')
    background-size: cover
    background-position: center
    position: relative
    z-index: 1
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    &:before
      content: ''
      display: block
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: rgba(0, 0, 0, 0.65)
      z-index: -1
    .login-img-inner
      text-align: center
      color: #fff
      svg
        margin-bottom: 1rem
        font-size: 2rem
      h1
        margin-bottom: 2rem
  .login-form
    padding: 3.75rem
    text-align: center
    background-color: #F0F2F3
    h1
      margin-bottom: 2rem
    button
      background-color: #38220F
      color: #fff
</style>
<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isClick: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.$bus.$emit('updateLoading', false)
    }, 2000)
  },
  methods: {
    doLogin () {
      const vh = this
      const api = `${process.env.APIURL}/admin/signin`
      vh.isClick = true
      this.$http.post(api, vh.user).then(res => {
        if (res.data.success) {
          vh.$bus.$emit('message:push', '登入成功', 'success')
          const token = res.data.token
          const expired = res.data.expired
          // 存放Cookie
          document.cookie = `eCommenceToken=${token}; expires=${new Date(expired)};`
          vh.$router.push('/admin')
        } else {
          vh.loginInfo.password = ''
          vh.isClick = false
          vh.$bus.$emit('message:push', '登入失敗', 'danger')
        }
      })
    }
  }
}
</script>

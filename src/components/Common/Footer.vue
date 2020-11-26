<template>
    <footer>
        <div class="container">
            <p class="d-flex justify-content-center mb-0">
              <Social class="text-white"/>
            </p>
            <p class="mb-0">CopyRight &copy; by Dark Hsu 2020</p>
        </div>
    </footer>
</template>
<style lang="sass" scope>
  footer
    padding: 0.5rem 0
    background-color: #38220F
    color: #fff
    text-align: center
    .footer-social
      list-style: none
      display: flex
      justify-content: center
      align-items: center
      padding-left: 0
      margin-bottom: 0.5rem
      li
        &:not(:last-child)
          margin-right: 1rem
        a
          color: #fff
          transition: 0.3s
          &:hover
            text-decoration: none
            color: #634832
</style>
<script>
import Social from '@/components/Common/Utils/Social'
export default {
  components: {
    Social
  }
}
</script>

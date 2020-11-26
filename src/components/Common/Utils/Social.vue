<template>
    <nav class="social">
      <li v-for="social in socialList" :key="social.id" :class="{'d-none': !social.is_enable}">
        <a :href="social.url" target="_blank"><font-awesome-icon :icon="social.iconName" /></a>
      </li>
    </nav>
</template>
<style lang="sass" scoped>
.social
  list-style: none
  display: flex
  li
    &:not(:last-child)
      margin-right: 1rem
</style>
<script>
import socials from '@/assets/data/socialList.json'
export default {
  data () {
    return {
      socialList: socials
    }
  }
}
</script>

<template>
    <div class="message-alert">
    <div
      class="alert alert-dismissible"
      role="alert"
      :class="'alert-' + item.status"
      v-for="(item, i) in messageList"
      :key="i"
    >
      {{ item.message }}
      <button type="button" class="close text-white" @click.prevent="removeMsgWithTiming(i)">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>
<style lang="sass" scope>
.message-alert
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
</style>
<script>
const duration = 5000
export default {
  name: 'Alert',
  data () {
    return {
      messageList: []
    }
  },
  methods: {
    updateMsg (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messageList.push({
        message,
        status,
        timestamp
      })
      this.removeMsgWithTiming(timestamp)
    },
    removeMsg (num) {
      this.messageList.splice(num, 1)
    },
    removeMsgWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messageList.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.removeMsg(i)
          }
        })
      }, duration)
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMsg(message, status)
    })
  }
}
</script>

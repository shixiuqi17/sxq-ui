<template>
  <i :class="iconName" @click="click($event)"></i>
</template>

<script>
export default {
  name: 'sxqIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `iconfont ${this.icon}`
    }
  },
  methods: {
    click(event) {
      this.$emit('click', event)
    }
  }
}
</script>

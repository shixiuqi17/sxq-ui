<template>
  <div :class="['sxq-card', className]">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sxqCard',
  props: {
    shadow: {
      type: String,
      default: 'always',
      validator: value => {
        return ['always', 'hover', 'never'].includes(value)
      }
    },
    bodyStyle: {
      type: String,
      default: 'padding: 20px'
    }
  },
  computed: {
    className() {
      return {
        'card-always-shadow': this.shadow === 'always',
        'card-hover-shadow': this.shadow === 'hover'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

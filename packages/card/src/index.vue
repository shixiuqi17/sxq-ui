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
.sxq-card {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  &.card-always-shadow {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }
  &.card-hover-shadow:hover {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }

  .card-header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }
}
</style>

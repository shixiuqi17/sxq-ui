<template>
  <button
    class="sxq-button"
    :class="[styleClass, { 'cur-df': this.loading }]"
    :disabled="disabled || loading"
    @click="click($event)"
  >
    <i v-if="loading" :class="loadingClass"></i>
    <span v-if="icon">
      <i :class="iconName"></i>
    </span>
    <span :class="icon ? 'ml-3' : ''"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'sxqButton',
  props: {
    type: {
      type: String,
      defalut: 'default',
      validator: value => {
        return ['primary', 'success', 'warning', 'danger'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      defalut: false
    },
    round: {
      type: Boolean,
      defalut: false
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      validator: value => {
        return ['medium', 'small', 'mini'].includes(value)
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styleClass() {
      return {
        [`sxq-button-${this.type}`]: this.type,
        [`sxq-button-${this.size}`]: this.size,
        'is-disabled': this.disabled || this.loading,
        'is-round': this.round
      }
    },
    iconName() {
      return `iconfont ${this.icon}`
    },
    loadingClass() {
      return this.loading ? 'is-loading iconfont icon-loading' : ''
    }
  },
  methods: {
    click(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

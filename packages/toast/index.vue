<template>
  <transition name="toast-fade">
    <div class="mask" v-if="visible">
      <div class="toast">
        <span class="sxq-toast-content">我是内容</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'sxqToast',
  props: {
    message: {
      type: String,
      default: '我是toast内容'
    },
    duration: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.visible = true
    document.body.appendChild(this.$el)
    this.startimer()
  },
  methods: {
    startimer() {
      const timer = setTimeout(() => {
        this.visible = false
      }, this.duration)
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(timer)
      })
    }
  },
  beforeDestroy() {
    this.$el.parentNode.removeChild(this.$el)
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        this.$el.addEventListener('transitionend', () => {
          this.$destroy()
        })
        this.$emit('onClose')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

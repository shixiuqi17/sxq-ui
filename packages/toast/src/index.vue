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
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 9999;
}
.sxq-toast-content {
  color: #fff;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
}

.toast-fade-enter,
.toast-fade-leave-to {
  opacity: 0;
  .toast {
    transform: scale(0.5);
  }
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.5s;
  .toast {
    transition: transform 0.5s;
  }
}
</style>

<template>
  <transition name="message-fade">
    <div
      :class="['sxq-message', styleClass]"
      :style="computedStyle"
      v-if="visible"
    >
      <div class="sxq-message-content">
        <span v-if="type" :class="iconClass"></span>
        {{ message }}
        <span class="close-btn" @click="closeMessage">
          <i class="iconfont icon-close"></i>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'sxqMessage',
  props: {
    message: {
      type: String,
      default: '这是一条消息提示'
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'center'
    },
    type: {
      type: String,
      default: 'info',
      validator: value => {
        return ['success', 'error', 'info', 'warning'].includes(value)
      }
    }
  },
  data() {
    return {
      visible: false,
      verticalTop: 0,
      baseOffset: 16
    }
  },
  mounted() {
    if (this.autoClose) {
      this.startimer()
    }
    this.createElement()
  },
  methods: {
    createElement() {
      this.visible = true
      document.body.appendChild(this.$el)
    },
    closeMessage() {
      this.visible = false
    },
    startimer() {
      let timer = setTimeout(() => {
        this.visible = false
      }, this.duration)
      this.$once('hook:beforeDestory', () => {
        clearTimeout(timer)
        timer = null
      })
    }
  },
  computed: {
    styleClass() {
      return {
        [`sxq-message-${this.type}`]: this.type
      }
    },
    iconClass() {
      const icons = {
        success: 'iconfont icon-success1',
        error: 'iconfont icon-error1',
        info: 'iconfont icon-info',
        warning: 'iconfont icon-warning1'
      }
      return icons[this.type]
    },
    computedStyle() {
      return {
        top: this.verticalTop + 'px',
        ...(this.LR_POSITION && {
          [`${this.position}`]: this.baseOffset + 'px'
        }),
        ...(this.CENTER_POSITION && {
          left: '50%',
          marginLeft: '-190px'
        })
      }
    },
    LR_POSITION() {
      return this.position === 'right' || this.position === 'left'
    },
    CENTER_POSITION() {
      return this.position === 'center'
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
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

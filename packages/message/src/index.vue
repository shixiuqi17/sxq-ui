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
.sxq-message {
  width: 380px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  position: fixed;
  z-index: 99999;
  line-height: 20px;
  transition: top 0.5s;
  background-color: #edf2fc;
  padding: 15px 15px 15px 20px;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 5px;

  .close-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}

.sxq-message-success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}

.sxq-message-success .sxq-message-content {
  color: #67c23a;
}

.sxq-message-warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
}

.sxq-message-warning .sxq-message-content {
  color: #e6a23c;
}

.sxq-message-error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}

.sxq-message-error .sxq-message-content {
  color: #f56c6c;
}

.sxq-message-info .sxq-message-content {
  color: #909399;
}

.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
</style>

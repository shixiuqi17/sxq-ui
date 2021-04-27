<template>
  <transition name="message-fade">
    <div class="mask" v-if="visible">
      <div class="sxq-message-box">
        <div class="sxq-message-header">{{ title }}</div>
        <div class="sxq-message-content">{{ content }}</div>
        <div class="sxq-message-footer">
          <template v-if="type === 'confirm'">
            <sxq-button size="small" @click="clickHandler('cancel')"
              >取消</sxq-button
            >
          </template>
          <sxq-button
            type="primary"
            size="small"
            @click="clickHandler('confirm')"
            >确定</sxq-button
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'sxqMessageBox',
  props: {
    title: {
      type: String,
      default: '标题名称'
    },
    content: {
      type: String,
      default: '这是一段内容'
    },
    onOk: Function,
    onCancel: Function,
    type: {
      type: String,
      default: 'confirm'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.createElement()
  },
  methods: {
    createElement() {
      this.visible = true
      document.body.appendChild(this.$el)
    },
    clickHandler(type) {
      if (type === 'confirm') {
        this.onOk()
      } else {
        this.onCancel()
      }
      this.visible = false
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
.sxq-message-box {
  display: inline-block;
  width: 420px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;

  .sxq-message-header {
    position: relative;
    padding: 15px 15px 10px;
  }

  .sxq-message-content {
    padding: 10px 15px;
    color: #606266;
    font-size: 14px;
  }

  .sxq-message-footer {
    padding: 5px 15px 0;
    text-align: right;
  }
}
.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
  .sxq-message-box {
    transform: translateY(-100px);
  }
}

.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.5s;
  .sxq-message-box {
    transition: transform 0.5s;
  }
}
</style>

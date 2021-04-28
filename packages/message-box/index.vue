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
@import './style.scss';
</style>

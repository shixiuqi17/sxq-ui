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
@keyframes turn {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.cur-df {
  cursor: default !important;
}

.is-loading {
  font-size: 14px;
  display: inline-block;
  animation: turn 2s linear infinite;
  vertical-align: bottom;
  margin-right: 2px;
}

.sxq-button + .sxq-button {
  margin-left: 10px;
}

.iconfont {
  vertical-align: text-bottom;
}

.ml-3 {
  margin-left: 3px;
}

.sxq-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;

  &:hover,
  &:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }

  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }

  &.is-round {
    border-radius: 20px;
    padding: 12px 23px;
  }

  &.sxq-button-medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  &.sxq-button-small {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }

  &.sxq-button-mini {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
}

.sxq-button-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;

  &:hover,
  &:focus {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }

  &.is-disabled,
  &.is-disabled :focus,
  &.is-disabled :hover {
    color: #fff;
    background-color: #a0cfff;
    border-color: #a0cfff;
  }
}

.sxq-button-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;

  &:hover,
  &:focus {
    background: #85ce61;
    border-color: #85ce61;
    color: #fff;
  }

  &.is-disabled,
  &.is-disabled :focus,
  &.is-disabled :hover {
    color: #fff;
    background-color: #b3e19d;
    border-color: #b3e19d;
  }
}

.sxq-button-warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;

  &:hover,
  &:focus {
    background: #ebb563;
    border-color: #ebb563;
    color: #fff;
  }

  &.is-disabled,
  &.is-disabled :focus,
  &.is-disabled :hover {
    color: #fff;
    background-color: #f3d19e;
    border-color: #f3d19e;
  }
}

.sxq-button-danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;

  &:hover,
  &:focus {
    background: #f78989;
    border-color: #f78989;
    color: #fff;
  }

  &.is-disabled,
  &.is-disabled :focus,
  &.is-disabled :hover {
    color: #fff;
    background-color: #fab6b6;
    border-color: #fab6b6;
  }
}
</style>

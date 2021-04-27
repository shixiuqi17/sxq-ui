<template>
  <div :class="['sxq-input-number', styleClass]">
    <span
      :class="['input-button-minus', { 'is-disabled': minusDisabled }]"
      @click="handlerClickMinus"
    >
      <i class="iconfont icon-minus"></i>
    </span>
    <span
      :class="['input-button-add', { 'is-disabled': addDisabled }]"
      @click="handlerClickAdd"
    >
      <i class="iconfont icon-add"></i>
    </span>
    <div class="sxq-input">
      <input
        type="text"
        :class="['sxq-input_inner', { 'is-disabled': disabled }]"
        v-model="inputValue"
        :disabled="disabled"
        @change="handlerChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'sxqInputNumber',
  props: {
    value: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: +Infinity
    },
    min: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      validator: value => {
        return ['medium', 'small', 'mini'].includes(value)
      }
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(newValue) {
        const { max, min } = this
        const limit = [
          // 如果input的值大于等于max,结果就为max
          { validate: value => !this.isNumber(value), result: this.inputValue },
          { validate: value => value >= max, result: max },
          { validate: value => value <= min, result: min },
          { validate: value => true, result: +newValue }
        ]
        const _value = limit.find(item => item.validate(newValue)).result
        this.$emit('input', _value)
      }
    },
    styleClass() {
      return {
        [`input-number-${this.size}`]: this.size
      }
    },
    minusDisabled() {
      return this.disabled || this.inputValue <= this.min
    },
    addDisabled() {
      return this.disabled || this.inputValue >= this.max
    }
  },
  methods: {
    handlerClickMinus() {
      if (!this.disabled) {
        this.inputValue = Number(this.inputValue) - this.step
      }
    },
    handlerClickAdd() {
      if (!this.disabled) {
        this.inputValue = Number(this.inputValue) + this.step
      }
    },
    isNumber(num) {
      return (
        !isNaN(+num) &&
        Object.prototype.toString.call(+num) === '[object Number]'
      )
    },
    handlerChange() {
      // 强制更新
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.sxq-input-number {
  position: relative;
  display: inline-block;
  width: 180px;
  line-height: 38px;

  &.input-number-medium {
    width: 200px;
    line-height: 34px;
    .input-button-minus,
    .input-button-add {
      width: 36px;
      height: 34px;
      font-size: 14px;
    }
    .sxq-input {
      font-size: 14px;
      .sxq-input_inner {
        height: 36px;
        line-height: 36px;
        padding-left: 43px;
        padding-right: 43px;
      }
    }
  }
  &.input-number-small {
    width: 130px;
    line-height: 30px;
    .input-button-minus,
    .input-button-add {
      width: 32px;
      height: 30px;
      font-size: 13px;
      top: 2px;
    }
    .sxq-input {
      font-size: 13px;
      .sxq-input_inner {
        height: 32px;
        line-height: 32px;
        padding-left: 39px;
        padding-right: 39px;
      }
    }
  }
  &.input-number-mini {
    width: 130px;
    line-height: 26px;
    .input-button-minus,
    .input-button-add {
      width: 28px;
      height: 26px;
      font-size: 12px;
      top: 2px;
    }
    .sxq-input {
      font-size: 12px;
      .sxq-input_inner {
        height: 28px;
        line-height: 28px;
        padding-left: 35px;
        padding-right: 35px;
      }
    }
  }

  .is-disabled {
    color: #c0c4cc !important;
    cursor: not-allowed !important;
  }

  .input-button-minus,
  .input-button-add {
    position: absolute;
    z-index: 1;
    top: 1px;
    width: 40px;
    height: 38px;
    text-align: center;
    background: #f5f7fa;
    color: #606266;
    cursor: pointer;
    font-size: 13px;
  }

  .input-button-minus {
    left: 1px;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid #dcdfe6;
  }

  .input-button-add {
    right: 1px;
    border-radius: 0 4px 4px 0;
    border-left: 1px solid #dcdfe6;
  }

  .sxq-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;

    .sxq-input_inner {
      -webkit-appearance: none;
      padding-left: 50px;
      padding-right: 50px;
      text-align: center;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
      &:hover {
        border-color: #c0c4cc;
      }

      &.is-disabled {
        border-color: #dcdfe6 !important;
      }

      &:focus {
        outline: none;
        border-color: #409eff;
      }
    }
  }
}
</style>

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
@import './style.scss';
</style>

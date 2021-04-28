<template>
  <div class="input-container">
    <template v-if="type === 'textarea'">
      <textarea
        class="sxq-textarea"
        :class="styleCalss"
        v-bind="$attrs"
        v-model="inputValue"
        v-on="MyListeners"
        :disabled="disabled"
      ></textarea>
    </template>
    <template v-else>
      <div class="inline-container">
        <div :class="['sxq-input-prepend', className]" v-if="$slots.prepend">
          <slot name="prepend"></slot>
        </div>
        <div class="sxq-input-outer" :style="'width:' + this.width + 'px;'">
          <input
            type="text"
            :class="['sxq-input', styleCalss, className]"
            v-bind="$attrs"
            v-model="inputValue"
            v-on="MyListeners"
            :disabled="disabled"
          />
          <span class="prefix-input">
            <i :class="['input-prefix-icon', prefixClass]"></i>
          </span>
          <span class="suffix-input">
            <i :class="['input-suffix-icon', suffixClass]"></i>
          </span>
          <span
            class="clear-icon iconfont icon-error"
            :class="styleCalss"
            @click="clearText"
            v-if="showClear"
            :style="'right:' + clearAndSuffix + 'px;'"
          ></span>
        </div>
        <div :class="['sxq-input-append', className]" v-if="$slots.append">
          <slot name="append"></slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'sxqInput',
  props: {
    value: {
      type: [String, Number],
      defalut: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return ['text', 'textarea'].includes(value)
      }
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      defalut: ''
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    }
  },
  methods: {
    clearText() {
      if (!this.disabled) {
        this.inputValue = ''
      }
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    MyListeners() {
      return Object.assign(this.$listeners, {
        input: event => this.$emit('input', event.target.value)
      })
    },
    showClear() {
      return this.clearable && this.inputValue !== ''
    },
    styleCalss() {
      return {
        'is-disabled': this.disabled,
        'is-center': this.center,
        'input-pl25': this.prefixIcon,
        'input-pr25': this.suffixIcon,
        'input-pr45': this.suffixIcon && this.clearable
      }
    },
    className() {
      return {
        'has-prepend': this.$slots.prepend,
        'has-append': this.$slots.append
      }
    },
    prefixClass() {
      return {
        [`iconfont ${this.prefixIcon}`]: this.prefixIcon
      }
    },
    suffixClass() {
      return {
        [`iconfont ${this.suffixIcon}`]: this.suffixIcon
      }
    },
    clearAndSuffix() {
      return this.suffixIcon && this.clearable ? '25' : '10'
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

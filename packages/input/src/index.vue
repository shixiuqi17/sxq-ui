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
.input-container {
  width: 100%;
  display: inline-flex;

  .sxq-input-outer {
    width: 100%;
    position: relative;
    .clear-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #c0c4cc;
    }

    .prefix-input {
      height: 100%;
      text-align: center;
      position: absolute;
      left: 8px;
      top: 0;
      color: #c0c4cc;
      .input-prefix-icon {
        width: 25px;
        line-height: 40px;
        height: 100%;
        text-align: center;
      }
    }

    .suffix-input {
      position: absolute;
      height: 100%;
      right: 8px;
      top: 0;
      text-align: center;
      color: #c0c4cc;
      pointer-events: none;

      .input-suffix-icon {
        width: 25px;
        line-height: 40px;
        height: 100%;
        text-align: center;
      }
    }
  }

  .inline-container {
    width: 100%;
    display: inline-flex;

    .sxq-input-prepend,
    .sxq-input-append {
      background-color: #f5f7fa;
      color: #909399;
      display: flex;
      align-items: center;
      border: 1px solid #dcdfe6;
      border-radius: 0px;
      padding: 0 10px;
      width: 1px;
      white-space: nowrap;
      width: max-content;
    }

    .has-prepend.sxq-input-prepend {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-right: none;
    }

    .has-append.sxq-input-append {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: none;
    }
  }

  .is-center {
    text-align: center !important;
  }

  .is-disabled {
    background-color: #f5f7fa !important;
    border-color: #e4e7ed !important;
    color: #c0c4cc !important;
    cursor: not-allowed !important;
  }

  .sxq-input {
    -webkit-appearance: none;
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
    transition: border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;

    &:hover {
      border-color: #c0c4cc;
    }

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    &.has-prepend {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
    &.has-append {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    &.input-pl25 {
      padding-left: 27px;
    }

    &.input-pr25 {
      padding-right: 25px;
    }

    &.input-pr45 {
      padding-right: 45px;
    }
  }

  .sxq-textarea {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      border-color: #c0c4cc;
    }
    &:focus {
      outline: none;
      border-color: #409eff;
    }
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
</style>

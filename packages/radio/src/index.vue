<template>
  <label class="radio">
    <span :class="['sxq-radio-input', { 'is-checked': isChecked }]">
      <span class="sxq-radio-inner"></span>
      <input
        type="radio"
        class="sxq-radio-original"
        :value="label"
        v-model="radioValue"
      />
    </span>
    <span class="sxq-radio-label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'sxqRadio',
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    isGroup() {
      return this.RadioGroup
    },
    radioValue: {
      get() {
        return this.isGroup ? this.RadioGroup.value : this.value
      },
      set(newValue) {
        if (this.isGroup) {
          this.RadioGroup.$emit('input', newValue)
        } else {
          this.$emit('input', newValue)
        }
      }
    },
    isChecked() {
      return this.radioValue === this.label
    }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;

  .sxq-radio-input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;

    .sxq-radio-inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      &::after {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-in;
      }
    }

    .sxq-radio-original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }

  .sxq-radio-label {
    font-size: 14px;
    padding-left: 10px;
  }

  .sxq-radio-input.is-checked + .sxq-radio-label {
    color: #409eff;
  }

  .sxq-radio-input.is-checked {
    .sxq-radio-inner {
      border-color: #409eff;
      background: #409eff;
      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
}
</style>

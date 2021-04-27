<template>
  <div :class="['sxq-switch', styleCalss]">
    <input
      type="checkbox"
      class="sxq-switch-input"
      v-model="switchValue"
      :disabled="disabled"
    />
    <span
      class="sxq-switch-label switch-label-left"
      :class="{ 'is-checked': !switchValue }"
      v-if="activeText"
      @click="handlerSwitch"
    >
      {{ activeText }}
    </span>
    <span
      class="sxq-switch-core"
      @click="handlerSwitch"
      :style="switchStyle"
    ></span>
    <span
      class="sxq-switch-label switch-label-right"
      :class="{ 'is-checked': switchValue }"
      v-if="inactiveText"
      @click="handlerSwitch"
    >
      {{ inactiveText }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'sxqSwitch',
  props: {
    value: {
      type: Boolean,
      default: true
    },
    activeText: {
      type: String,
      default: ''
    },
    inactiveText: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: '#13ce66'
    },
    inactiveColor: {
      type: String,
      default: '#ff4949'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    switchValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    styleCalss() {
      return {
        'is-checked': this.switchValue,
        'is-disabled': this.disabled
      }
    },
    switchStyle() {
      if (this.switchValue) {
        return [
          { width: '40px' },
          { borderColor: `${this.activeColor}` },
          { backgroundColor: `${this.activeColor}` }
        ]
      } else {
        return [
          { width: '40px' },
          { borderColor: `${this.inactiveColor}` },
          { backgroundColor: `${this.inactiveColor}` }
        ]
      }
    }
  },
  methods: {
    handlerSwitch() {
      if (!this.disabled) {
        this.switchValue = !this.switchValue
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sxq-switch.is-checked .sxq-switch-core::after {
  left: 100%;
  margin-left: -17px;
}

.sxq-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    .sxq-switch-core,
    .sxq-switch-label {
      cursor: not-allowed;
    }
  }
  .sxq-switch-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .sxq-switch-core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    &::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }

  .switch-label-left {
    margin-right: 10px;
  }

  .switch-label-right {
    margin-left: 10px;
  }

  .sxq-switch-label {
    transition: 0.2s;
    height: 20px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    vertical-align: middle;
    color: #303133;
    &.is-checked {
      color: #409eff;
    }
  }
}
</style>

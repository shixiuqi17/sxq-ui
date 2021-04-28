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
@import './style.scss';
</style>

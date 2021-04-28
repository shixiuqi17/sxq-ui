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
@import './style.scss';
</style>

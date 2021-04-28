<template>
  <label class="sxq-checkbox">
    <span class="sxq-checkbox-input">
      <span
        class="sxq-checkbox-inner"
        :class="{ 'is-checked': isChecked }"
      ></span>
      <input
        type="checkbox"
        class="sxq-checkbox-native"
        :value="label"
        v-model="CKValue"
      />
    </span>
    <span class="sxq-checkbox__label">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'sxqCheckbox',
  props: {
    label: String,
    value: [Boolean, Array]
  },
  inject: {
    CKGroup: {
      default: ''
    }
  },
  computed: {
    // 判断你是否选中
    isChecked() {
      if (this.isGroup) {
        return this.CKGroup.value.includes(this.label)
      } else {
        if (typeof this.value === 'boolean') {
          return this.value
        } else {
          return this.value.includes(this.label)
        }
      }
    },
    // 判断是否分组
    isGroup() {
      return this.CKGroup
    },
    // 数据绑定
    CKValue: {
      get() {
        return this.isGroup ? this.CKGroup.value : this.value
      },
      set(newValue) {
        if (this.isGroup) {
          this.CKGroup.$emit('input', newValue)
        } else {
          this.$emit('input', newValue)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

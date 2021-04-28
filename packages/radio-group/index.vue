<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sxqRadioGroup',
  props: {
    value: { type: [String, Number] }
  },
  provide() {
    return {
      RadioGroup: this
    }
  }
}
</script>

<style lang="scss" scoped></style>

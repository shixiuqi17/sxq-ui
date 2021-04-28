<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sxqCheckboxGroup',
  props: {
    value: Array
  },
  provide() {
    return {
      CKGroup: this
    }
  }
}
</script>

<style lang="scss" scoped></style>

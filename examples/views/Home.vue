<template>
  <div class="home">
    <!-- <sxq-uploader
      accept="image/png, image/jpeg"
      :size="500 * 1024"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      multiple
    >
      <div class="uploader-area" slot="uploader-area">
        <sxq-icon icon="icon-add"></sxq-icon>
        <div class="sxq-uploader-text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
      <div class="sxq-uploader-tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </sxq-uploader> -->
    <!-- <sxq-checkbox-group v-model="msg">
      <sxq-checkbox label="嘿嘿"></sxq-checkbox>
      <sxq-checkbox label="嘿wa 嘿"></sxq-checkbox>
      <sxq-checkbox label="哈哈" disabled></sxq-checkbox>
      <sxq-checkbox label="哈哈" disabled></sxq-checkbox>
    </sxq-checkbox-group> -->
    <sxq-radio v-model="num2" label="aaa" disabled></sxq-radio>
    <sxq-radio v-model="num2" label="bbb" disabled></sxq-radio>
    <sxq-checkbox-group v-model="checkList">
      <sxq-checkbox label="复选框 A"></sxq-checkbox>
      <sxq-checkbox label="复选框 B"></sxq-checkbox>
      <sxq-checkbox label="复选框 C"></sxq-checkbox>
      <sxq-checkbox label="禁用" disabled></sxq-checkbox>
      <sxq-checkbox label="选中且禁用" disabled></sxq-checkbox>
    </sxq-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: [3],
      step: 3,
      num2: 'aaa',
      checkList: ['选中且禁用', '复选框 A']
    }
  },
  mounted() {},
  methods: {
    uploadSuccess(file) {
      console.log(file)
    },
    uploadError(msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.home {
  width: 650px;
  margin: 100px auto;
  // div {
  //   margin-top: 50px;
  // }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
</style>

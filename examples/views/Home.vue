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
    <sxq-button>123</sxq-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: false,
      step: 3
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

<template>
  <div class="sxq-uploader-wrapper">
    <div class="sxq-uploader-imagelist">
      <ul class="preview-images-list">
        <li v-for="(item, index) in previewImages" :key="index">
          <span class="preview-delete-icon">
            <i class="iconfont icon-bin" @click="deleteImage(index)"></i>
          </span>
          <img :src="item.url" alt="" />
        </li>
      </ul>
      <div
        class="sxq-uploader-container"
        @dragenter="prevent($event)"
        @dragover="prevent($event)"
        @drop="handlerFileUploader($event, 'drag')"
        @click="handlerFileUploader($event, 'click')"
      >
        <slot name="uploader-area"></slot>
        <input
          type="file"
          class="sxq-file-invisible"
          :multiple="multiple"
          ref="fileRef"
          @change="handlerFileUploader($event, 'change')"
        />
      </div>
    </div>
    <div>
      <slot name="tip"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sxqUploader',
  props: {
    accept: {
      type: String,
      default: 'image/png, image/jpeg'
    },
    size: {
      type: Number,
      default: 500 * 1024
    },
    limit: {
      type: Number,
      default: 3
    },
    multiple: {
      type: Boolean,
      default: false
    },
    onSuccess: Function,
    onError: Function
  },
  data() {
    return {
      // 上传文件之前的处理数组
      sourceFiles: [],
      // 上传完成处理过后的文件
      tempImages: [],
      // 展示图片的数组
      previewImages: []
    }
  },
  methods: {
    // 上传文件函数
    handlerFileUploader(event, type) {
      // 上传文件函数对象
      const handler = {
        // 点击上传
        click: () => {
          this.$refs.fileRef.value = ''
          this.$refs.fileRef.click()
        },
        // input的change函数
        change: event => {
          this.sourceFiles = event.target.files
        },
        // 拖拽上传
        drag: event => {
          event.preventDefault()
          this.sourceFiles = event.dataTransfer.files
        }
      }
      handler[type](event)
    },
    // 处理上传文件
    handlerImages(files) {
      if (window.URL && window.URL.createObjectURL) {
        // blob格式储存
        this.createObjectURL(files)
      } else {
        // base64格式储存
        this.createBase64Image(files)
      }
    },
    // blob格式储存图片
    createObjectURL(files) {
      const filesArray = files.map(file => ({
        file,
        url: URL.createObjectURL(file)
      }))
      this.tempImages = filesArray
    },
    // base64格式储存图片
    createBase64Image(files) {
      const handleFile = function(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = e => {
            resolve(e.target.result)
          }
          reader.onerror = error => {
            reject(error)
          }
        })
      }
      const filesPromises = files.map(handleFile)

      Promise.all(filesPromises).then(results => {
        this.tempImages = results.map((res, index) => {
          return {
            url: res,
            file: files[index]
          }
        })
      })
    },
    deleteImage(index) {
      this.previewImages.splice(index, 1)
    },
    prevent(event) {
      event.preventDefault()
    }
  },
  watch: {
    sourceFiles(newValue) {
      // 把上传的文件存起来，转换为数组
      const files = Array.from(newValue)
      // 如果没有上传文件，直接返回
      if (files.length <= 0) return
      const { size, accept } = this
      // 检查上传的文件
      if (files.some(file => file.size > size)) {
        return this.onError('上传文件超过大小限制')
      }
      // 检查上传文件的格式
      if (files.some(file => !~accept.indexOf(file.type))) {
        // todo
        return this.onError(`只能上传${accept}格式的文件`)
      }
      this.handlerImages(files)
    },
    tempImages(newValue) {
      this.previewImages = [...this.previewImages, ...newValue]
      if (this.previewImages.length >= this.limit) {
        this.previewImages = this.previewImages.slice(0, this.limit)
        return this.onError(`最多上传${this.limit}张图片`)
      }
      this.onSuccess(this.previewImages)
    }
  }
}
</script>

<style lang="scss" scoped>
.sxq-uploader-imagelist {
  display: flex;
}

.sxq-file-invisible {
  display: none;
}

.preview-images-list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    width: 148px;
    height: 148px;
    margin-right: 10px;
    overflow: hidden;
    position: relative;

    &:hover {
      .preview-delete-icon {
        opacity: 1;
        background: rgba(0, 0, 0, 0.6);
      }
    }
    img {
      width: 100%;
      height: 100%;
      max-width: 100%;
    }
  }
  .preview-delete-icon {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;

    i {
      cursor: pointer;
      font-size: 30px;
      color: #fff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .icon-bin {
      right: 40%;
    }
  }
}
.uploader-area {
  min-width: 148px;
  height: 148px;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dotted #ccc;
  font-size: 28px;
  cursor: pointer;
}

.sxq-uploader-text {
  color: #606266;
  font-size: 14px;
  text-align: center;

  em {
    color: #409eff;
    font-style: normal;
  }
}

.sxq-uploader-tip {
  font-size: 12px;
  color: #606266;
  margin-top: 7px;
}
</style>

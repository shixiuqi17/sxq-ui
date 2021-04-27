import Message from './src/index.vue'
const instances = [] // 存放的是每个message的对象
const verticalTop = 16 // 每个message的top高度
let index = 0 // 为message添加id

export default {
  install(Vue) {
    // 计算每一个message实例的top值
    function computedVerticalTop(position) {
      // 过滤position每个位置
      const filterInstances = instances.filter(instance => instance.position === position)

      return filterInstances.reduce((pre, cur) => {
        return cur.$el.offsetHeight + pre + verticalTop
      }, verticalTop)
    }

    // 关闭message后重新计算高度
    function updateVerticalTop(instance) {
      // 获取当前关闭的message的top值
      let removeTop = instance.verticalTop
      let index = 0
      // 循环数组找到当前关闭的message
      for (; index < instances.length; index++) {
        if (instances[index].id === instance.id) {
          break
        }
      }
      // 在数组中删除
      instances.splice(index, 1)

      // 循环删除之后的数组，找到关闭后面的message的top值，并重新赋值
      for (; index < instances.length; index++) {
        if (instances[index].position === instance.position) {
          [instances[index].verticalTop, removeTop] = [
            removeTop,
            instances[index].verticalTop
          ]
        }
      }
    }

    // 创建message实例
    function generateInstance(options) {
      const Ctor = Vue.extend(Message)
      // intance 为 message的实例对象
      const instance = new Ctor({
        propsData: options
      }).$mount(document.createElement('div'))

      // 每个message上面的距离
      instance.verticalTop = computedVerticalTop(instance.position)

      // 为每个实例创建一个id熟悉
      instance.id = 'message-' + index++

      // 只执行一次后销毁的message关闭函数
      instance.$once('close', function () {
        updateVerticalTop(instance)
      })

      return instance
    }

    Vue.prototype.$message = function (options) {
      const instance = generateInstance(options)
      instances.push(instance)
    }
  }
}

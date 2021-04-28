import Toast from './index.vue'

export default {
  install(Vue) {
    function generateInstance(options) {
      const Ctor = Vue.extend(Toast)
      const instance = new Ctor({
        propsData: options
      }).$mount(document.createElement('div'))

      if (options.onClose && typeof options.onClose === 'function') {
        instance.$once('onClose', function () {
          options.onClose()
        })
      }

      return instance
    }

    Vue.prototype.$toast = function (options) {
      generateInstance(options)
    }
  }
}

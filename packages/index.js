import Button from './button'
import Icon from './icon'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Input from './input'
import InputNumber from './input-number'
import Message from './message'
import MessageBox from './message-box'
import Toast from './toast'
import Radio from './radio'
import RadioGroup from './radio-group'
import Uploader from './uploader'
import Switch from './switch'
import Card from './card'
import '../public/iconfont/iconfont.css'

const components = [
  Button,
  Icon,
  Checkbox,
  CheckboxGroup,
  Input,
  InputNumber,
  Message,
  MessageBox,
  Toast,
  Radio,
  RadioGroup,
  Uploader,
  Switch,
  Card
]

const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.use(component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  Button,
  Icon,
  Checkbox,
  CheckboxGroup,
  Input,
  InputNumber,
  Message,
  MessageBox,
  Toast,
  Radio,
  RadioGroup,
  Uploader,
  Switch,
  Card
}

export default {
  install,
  Button,
  Icon,
  Checkbox,
  CheckboxGroup,
  Input,
  InputNumber,
  Message,
  MessageBox,
  Toast,
  Radio,
  RadioGroup,
  Uploader,
  Switch,
  Card
}

import Vue from 'vue'
import moment from 'moment'

moment.locale('zh-cn')
// 全局过滤器
Vue.filter('str_limit', (value, num) => {
  return value.length > num ? `${value.substring(0, num)}...` : value
})

Vue.filter('timeLL', value => {
  // return moment(value).format('MM-DD h:mm')
  return moment(value).fromNow()
})

import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	app.config.globalProperties.$checkPermission = function (perms = []) {
		let permission = uni.getStorageSync("permission");
		let result = false
		for (let one of perms) {
			if (permission.indexOf(one) != -1) {
				result = true
				break
			}
		}
		return result
	};
  return {
    app
  }
}
// #endif
'use strict'
import 'babel-polyfill'  // IE11 & Safari9
import 'material-design-icons-iconfont/dist/material-design-icons.css'  // vs vue-material-design-icons
// import '@mdi/font/css/materialdesignicons.css'  // vs @mdi/font
import 'vuetify/dist/vuetify.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './component/app/index.vue'


Vue.use(Vuetify)

Vue.component('x-hxe', {
    render: h => h('div', {}, [ h('p', 'Z') ])
})


new Vue({

    render: h => h(App),
    data: () => ({}),
    //components: { App },
    //template: '<App/>'

}).$mount('#app')

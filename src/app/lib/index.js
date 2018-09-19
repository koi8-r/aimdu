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


// ResizeObserver
/*
new MutationObserver(() => {}).observe(document, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
})
*/


Object.defineProperty(Vue.prototype, "$bus", {
    get: function() {
        return this.$root.bus
    }
})


const vue = new Vue({

    render: h => h(App),
    data: () => ({
        bus: new Vue({})
    }),
    //components: { App },
    //template: '<App/>'

    mounted: function() {
        self = this
        document.addEventListener('resize', function(_ev) {
            self.bus.$emit('init:a')
        })
        document.addEventListener('DOMSubtreeModified', function(_ev) {
            self.bus.$emit('init:a')
        })
        console.warn('app mount')

    }

}).$mount('#app')

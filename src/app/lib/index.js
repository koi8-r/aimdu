'use strict'
import 'babel-polyfill'  // IE11 & Safari9
import 'material-design-icons-iconfont/dist/material-design-icons.css'  // vs vue-material-design-icons
// import '@mdi/font/css/materialdesignicons.css'  // vs @mdi/font
import 'vuetify/dist/vuetify.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './component/app/index.vue'


Vue.use(Vuetify)

Vue.component('v-test', {
    render: h => h('div', {}, [ h('p', 'text') ])
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


new Vue({

    render: h => h(App),
    data: () => ({
        bus: new Vue({})
    }),
    components: {},
    mounted: function() {
        // top mounted last
        self = this
        this.$nextTick(() => {
            // todo: remove listeners
            window.addEventListener('resize', function(_ev) {
                self.bus.$emit('dom:resize')
            })
        })
    }

}).$mount('#app')

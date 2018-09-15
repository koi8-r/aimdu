'use strict'
import Vue from 'vue'
import App from './App.js'
import Example from './components/example/index.js'


new Vue({

    // render: h => h(App)
    components: {
        'example': Example
    },
    data: () => ({})

}).$mount('#app')

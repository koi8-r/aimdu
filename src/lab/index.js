'use strict'
import Vue from 'vue'
import Hello from './hello-component/'


new Vue({

    // render: h => h(App),
    data: () => ({}),
    components: {
        'v-hello': Hello
    },
    mounted: function() {}

}).$mount('#app')

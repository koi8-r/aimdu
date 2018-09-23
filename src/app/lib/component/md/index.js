'use strict'
import template from './index.vue.html'


// https://ru.vuejs.org/v2/examples/index.html
export default {
    name: 'MD',
    template: template,
    computed: {
        body: () => '<b>B</b>ody'
    }
}

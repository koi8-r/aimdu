'use strict'
import template from './index.vue.html'
import Vue from 'vue'


export default {
    name: 'Example',
    template: template,
    props: {
        msg: String,
        a: {
            type: String,
            required: false
        }
    },
    components: {}
}

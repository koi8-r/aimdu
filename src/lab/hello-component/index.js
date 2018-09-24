'use strict'
import Vue from 'vue'


let c = Vue.component('v-test', {
    render: function(h) {
        console.log('@render')
        return h('div', {
            attrs: { width: this.$attrs.w },
            style: { width: this.$attrs.w },
        })
    },
    methods: {
        rerender: function() {
            console.log(`${this.$el.innerHTML.toString()} -> @${this.$attrs.w.toString()}`)
            this.$el.innerHTML = '@' + this.$attrs.w.toString()
        }
    },
    mounted: function() {
        this.rerender()
    },
    updated: function () {
        this.rerender()
    }
})


export default {
    name: 'Hello',
    props: {},
    data: () => ({
        x: 0,
        width: {
            type: Number
        },
        dirty: false,
    }),
    render: function (h) {
        let vnode = h('div', {}, [
            h(c, {
                attrs: { w: this.w },
                style: {
                    position: 'absolute',
                }
            }),
            h('iframe', {
                style: {
                    width: '100%',
                    top: 0,
                    left: 0,
                    position: 'relative',
                    'z-index': -1,
                },
                ref: 'frame',
            })
        ])
        return vnode
    },
    computed: {
        w : {
            get: function () {
                return this.width
            },
            set: function (val) {
                this.width = val
            }
        }
    },
    mounted: function() {
        const self = this
        const frame = this.$refs.frame
        frame.contentWindow.addEventListener( 'resize', _ev => self.w = frame.clientWidth  )
    },
}

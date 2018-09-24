'use strict'
import Vue from 'vue'


let c = Vue.component('v-test', {
    render: function(h) {
        console.log('@render')
        return h('div', {}, this.$attrs.w)
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
        console.debug('mutation -> rerender')

        let vnode = h('div', {}, [
            h('a', {
                attrs: { href: this.x },
                style: {
                    position: 'absolute',
                }
            }, this.width > 0 && '' || ''),
            h(c, {
                attrs: { w: this.w },
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
    methods: {
        render: function () {
            console.info('render')
            this.dirty = false
        }
    },
    computed: {
        w : {
            get: function () {
                return this.width
            },
            set: function (val) {
                console.debug('set')
                this.width = val

                if (! this.dirty) {
                    this.$nextTick(this.render)
                    this.dirty = true
                }
            }
        }
    },
    updated: function() {
        console.debug('updated')
    },
    mounted: function() {
        const self = this
        const frame = this.$refs.frame
        frame.contentWindow.addEventListener( 'resize', _ev => self.w = frame.clientWidth  )
    },
}

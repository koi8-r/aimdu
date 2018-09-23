'use strict'
import Vue from 'vue'


export default {
    name: 'Hello',
    props: {},
    data: () => ({
        x: 0,
        width: {
            type: Number
        },
        rerender: true,
    }),
    render: function (h) {
        console.debug('mutation -> rerender')
        console.debug(this.$attrs.x)
        console.log(
            Vue.compile('<div>{{ x }}</div>').render.apply(this, h)
        )

        let vnode = h('div', {
                attrs: { id: Date.now().toString() }  // patch current real dom el
            }, [
                h('a', {
                    attrs: { href: this.x },
                    style: {
                        position: 'absolute',
                    }
                }, this.width),  // observe getter
                h('iframe', {
                    style: {
                        width: '100%',
                        top: 0,
                        left: 0,
                        position: 'relative',
                        'z-index': -1,
                    },
                    ref: 'frame',
                    attrs: { id: this.x },  // patch current real dom el
                    /*
                    on: {
                        'contentWindow.resize' : () => console.log('Z')
                    },
                    nativeOn: {
                        'contentWindow.resize' : () => console.log('Z')
                    },
                    */
                })  ])
        return vnode
    },
    methods: {
        render: function () {
            this.rerender = false
            this.w
        }
    },
    computed: {
        w : {
            get: function () {
                return this.width
            },
            set: function (val) {
                this.width = val
                if (! this.rerender) {
                    this.rerender = true
                    // $forceRender or updated
                    this.$nextTick( this.render )  // rerender at the next tick
                }
            }
        }
    },
    mounted: function() {
        const self = this

        // setInterval
        setTimeout(  () => self.x = Date.now(),  // observe setter
                      3000  )

        this.$nextTick(() => {  // all child components are mounted
            const frame = this.$refs.frame
            // vue native on: https://github.com/vuejs/vue/blob/3be8ff5c083abe3bf26a656369d5d294fa983681/src/directives/on.js#L17
            frame.contentWindow
                 .addEventListener(  'resize',
                                     _ev =>  self.w = frame.clientWidth  )
        })
    },
}

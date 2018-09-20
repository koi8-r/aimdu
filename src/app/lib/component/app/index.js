'use strict'
import Example from '../example/'
import Chart from '../chart/'
import D3Chart from '../d3chart/'
import Plot from '../plot'


export default {
    name: 'App',
    props: {},
    components: {
        'x-example': Example,
        'x-chart': Chart,
        'v-chart': D3Chart,
        'v-plot': Plot
    },
    mounted: function() {
        console.warn('App mount')
        // this.$nextTick(function(ev) {
            // window.dispatchEvent(new Event('resize'))
            // let _emit = this.$emit
            // window.addEventListener('resize', () => { _emit('resize', ev) })
        // })
    }
}

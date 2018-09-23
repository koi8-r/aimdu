'use strict'
import Example from '../example/'
import Chart from '../chart/'
import D3Chart from '../d3chart/'
import Plot from '../plot'
import Md from '../md'


export default {
    name: 'App',
    props: {},
    components: {
        'x-example': Example,
        'x-chart': Chart,
        'v-chart': D3Chart,
        'v-plot': Plot,
        'v-md': Md,
    },
}

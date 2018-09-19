'use strict'
import template from './index.vue.html'
import * as d3 from 'd3'
import q from '../../qrect'


export default {
    name: 'D3Chart',
    //template: template,
    props: {
        domId: {
            type: String,
            required: true
        }
    },
    data: () => ({
        data: [
            {val: 0,  date: new Date(2018, 1, 1)},
            {val: 5,  date: new Date(2018, 1, 2)},
            {val: 7,  date: new Date(2018, 1, 3)},
            {val: 10, date: new Date(2018, 1, 4)},
            {val: 8,  date: new Date(2018, 1, 5)},
            {val: 7,  date: new Date(2018, 1, 6)}
    ]}),
    render: function (h) {
        return h('div', {
                style: {
                    width: '100%',
                    'background-color': '#00a070',
                    padding: '10px',
                },
                // class: this.cssClasses
            },
            [h('svg', {
                attrs: {
                    // id: this.chartId,
                },
                style: {
                    'background-color': '#ffa070',
                    width: '100%',
                    height: '100%',
                    _display: 'block',
                },
                ref: 'chart'
            })]
        )
    },
    computed: {},
    beforeUpdate: function() {
        console.info('vue component update')
    },
    beforeCreate: function() {},
    beforeMount: function() {},
    beforeDestroy: () => this.$bus.$off(),  // unbind all events
    destroyed: () => {},
    mounted: function() {
        console.warn('chart mount')
        console.warn(this._width)

        let el = this.$el
        let ch = this.$refs['chart']

        this.$nextTick(() => {
            console.log(this.$el.clientWidth)
        })

        const self = this
        this.$bus.$on('init:a', function() {
            console.info('vue component init:a')
            console.log(self.$el.clientWidth)
        })

        /*
        this.$bus.$on('init:a', function() {
            console.info('vue component init:a')
            q(this)
            return null
            (function(ch, w, h) {
                let chart = d3.select(ch)
    
                let x = d3.scaleTime()
                          .domain([new Date(2018, 1, 1), new Date(2018, 1, 6)])
                          .range([0, w])
    
                let y = d3.scaleLinear()
                          //.domain([0, d3.max(data)])
                          .domain([10, 0])
                          .range([0, h])
    
                let ln = d3.line()
                           .x(d => x(d.date))
                           .y(d => y(d.val))
                
                let d = chart.append('path')
                             .attr('d', ln(this.data))
                             .attr("stroke", "white")
                /
                let d = chart.selectAll('g')
                             .data(this.data)
                             .enter()
                             .append('rect')
                             .attr('width', d => 32)
                             .attr('height', d => y(d.x))
                             //.attr('height', d => d.x)
                             .attr('x', (d, i) => 32 * i)
                /
            })(ch, el.clientWidth, el.clientHeight)
        })
        */
    },
    // watch: function(data) {}
}

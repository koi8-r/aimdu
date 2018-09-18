'use strict'
import template from './index.vue.html'
import * as d3 from 'd3'


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
            {x: 1, y: new Date(2018, 1, 1)},
            {x: 5, y: new Date(2018, 1, 2)},
            {x: 7, y: new Date(2018, 1, 3)},
            {x: 10, y: new Date(2018, 1, 4)},
            {x: 8, y: new Date(2018, 1, 5)},
            {x: 7, y: new Date(2018, 1, 6)}
    ]}),
    render: function (h) {
        return h('div', {
                style: {
                    'background-color': '#00a070',
                    _padding: '25px'
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
                    _height: '100%'
                },
                ref: 'chart'
            })]
        )
    },

    mounted: function() {
        let el = this.$el
        let chart = d3.select(this.$refs['chart'])
        let w = el.clientWidth  // offsetWidth
        let h = el.clientHeight  // offsetHeight
        console.warn(h)

        let x = d3.scaleTime()
                  .domain([new Date(2018, 1, 1), new Date(2018, 1, 10)])
                  .range([0, w])
        let y = d3.scaleLinear()
                  //.domain([0, d3.max(data)])
                  .domain([0, 10])
                  .range([0, h])
        console.log(x(new Date(2018, 1, 10)))
        console.log(y(10))
        // svg.append('g').call(d3.axisTop(y))
        let d = chart.selectAll('g')
                     .data(this.data)
                     .enter()
                     .append('rect')
                     .attr('width', d => 32)
                     .attr('height', d => y(d.x))
                     //.attr('height', d => d.x)
                     .attr('x', (d, i) => 32 * i)
    },
    // watch: function(data) {}
}

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
                    'background-color': '#00a070',
                    _padding: '25px',
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
                    display: 'block',
                },
                ref: 'chart'
            })]
        )
    },

    mounted: function() {
        let el = this.$el
        let chart = d3.select(this.$refs['chart'])
        let w = el.offsetWidth   // offsetWidth
        let h = el.clientHeight  // offsetHeight
        console.warn(`${w}x${h}`)
        console.warn(this.data.length)

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
        /*
        let d = chart.selectAll('g')
                     .data(this.data)
                     .enter()
                     .append('rect')
                     .attr('width', d => 32)
                     .attr('height', d => y(d.x))
                     //.attr('height', d => d.x)
                     .attr('x', (d, i) => 32 * i)
        */
    },
    // watch: function(data) {}
}

'use strict'
import template from './index.vue.html'
import * as d3 from 'd3'


export default {
    name: 'D3Chart',
    template: template,
    props: {
        domId: {
            type: String,
            required: true
        }
    },

    mounted: function() {
        let el = this.$el
        console.log(el.clientWidth)
        console.log(el.offsettWidth)
        let data = [1, 3, 7, 4, 9]
        let svg = d3.select(this.$el)

        let x = d3.scaleLinear()
                  .domain([0, d3.max(data)])
                  .range([0, 600])
        let xAxe = d3.scaleTime()
                     .domain([new Date(2018, 1, 1), new Date(2018, 12, 31)])
                     .range([0, 600])
        let d = svg.selectAll('g')
                   .data(data)
                   .enter()
                   .append('rect')
                   .attr('width', 32)
                   .attr('height', d => d*10)
                   .attr('x', (d, i) => 32 * i)

        svg.append('g').call(d3.axisTop(x))


        console.log(xAxe(new Date(2018, 9, 3)))
    },
    // watch: function(data) {}
}

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
    computed: {
        // width
    },
    beforeUpdate: function() {
        console.info('vue component update')
    },
    beforeCreate: function() {
        //this.$bus.$on(  'resize', () => console.info('vue component resize')  )
        //this.$bus.$on(  'transitionend', () => console.info('vue component transitionend')  )
    },
    beforeMount: function() {
        self = this
        this.$bus.$on(  'subtree_modified', function() {
            console.info('vue component subtree modified')
            q(self.$el)
        })
        this.$bus.$on(  'resize', function() {
            console.info('vue component resize')
            q(self.$el)
        })
        this.$bus.$on(  'transitionend', function() {
            console.info('vue component transitionend')
            q(self.$el)
        })
    },
    beforeDestroy: () => this.$bus.$off(),  // unbind all events
    mounted: function() {
        let el = this.$el
        let ch = this.$refs['chart']

        setInterval(() => {
            q(el)
        }, 3000)

        let chart = d3.select(ch)
        return

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

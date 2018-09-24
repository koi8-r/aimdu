'use strict'
import * as d3 from 'd3'


export default {
    name: 'D3Chart',
    props: {
        domId: {
            type: String,
            required: true
        }
    },
    data: () => ({
        data: [
            {val: 0,  date: new Date(2018, 1, 1)},
            {val: 2,  date: new Date(2018, 1, 2)},
            {val: 4,  date: new Date(2018, 1, 3)},
            {val: 3, date: new Date(2018, 1, 4)},
            {val: 0,  date: new Date(2018, 1, 5)},
            {val: 5,  date: new Date(2018, 1, 6)},
            {val: 5,  date: new Date(2018, 1, 7)},
            {val: 8,  date: new Date(2018, 1, 8)},
            {val: 5,  date: new Date(2018, 1, 9)},
            {val: 10, date: new Date(2018, 1, 10)},
    ]}),
    render: function (h) {
        // create VNode
        return h('div', {
                style: {
                    width: '50%',
                    height: '100%',
                    position: 'relative',
                },
            },
            // this.$slots.default
            [h('svg', {
                attrs: {},
                style: {
                    '-background-color': '#ffa070',
                    width: '100%',
                    height: '100%',
                    display: 'block',
                },
                ref: 'chart'
            }),
            h('iframe', {
                attrs: {},
                style: {
                    '-background-color': '#0fa0ff',
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    margin: '0',
                    top: '0',  // -100%
                    left: '0',
                    position: 'absolute',
                    'z-index': '-1',
                },
                nativeOn: {},
                props: {},
                ref: 'frame'
            })]
        )
    },
    beforeUpdate: function() {},
    beforeCreate: function() {},
    beforeMount: function() {},
    // beforeDestroy: () => this.$bus.$off(),  // unbind all events from all
    destroyed: () => {},
    // watch: function(data) {}
    // computed: {},
    // this.$set
    // if new_width != old_width
    mounted: function() {
        let el = this.$el
        let frame = this.$refs['frame']
        let chart = d3.select(this.$refs['chart']).append('g')
        const self = this

        const render = () => {
            // d.selectAll('rect.background').attr('width', w)
            let {clientWidth: w, clientHeight: h} = frame
            console.info(`:render: ${w}x${h}`)
            console.info(getComputedStyle(el).getPropertyValue("width"))
            console.info(el.getBoundingClientRect().width)

            let c = d3.scaleOrdinal(d3.schemeCategory20)
                      .domain([ d3.min(self.data, (d) => d.date),
                                d3.max(self.data, (d) => d.date) ])
                      .range([0, w])

            let x = d3.scaleTime()
                      .domain([ d3.min(self.data, (d) => d.date),
                                d3.max(self.data, (d) => d.date) ])
                      .range([0, w])

            let y = d3.scaleLinear()
                      .domain([ d3.max(self.data, (d) => d.val),
                                d3.min(self.data, (d) => d.val) ])
                      .range([0, h])

            let yAxis = d3.axisRight(y)
                          .tickPadding(-16 - w)
                          .tickFormat(d => d)

            let lngen = d3.line()
                          .x(d => x(d.date))
                          .y(d => y(d.val))
                          .curve(d3.curveCardinal)
            
            if (chart.select('path').node() !== null) {
                chart.attr('width', w)
                chart.attr('height', h)
                chart.select('path').attr('d', lngen(self.data))
            } else {
                chart.append('path')
                     .attr('d', lngen(self.data))
                     .attr("stroke", 'indigo')
                     .attr('stroke-width', 3)
                     .attr('fill', 'none')
            }
        }

        this.$nextTick(() => { // real DOM actualized
            // todo: remove listeners
            frame.contentWindow.addEventListener('resize', (_ev) => self.$nextTick(render))  // dedup same functions
            frame.contentWindow.dispatchEvent(new Event('resize'))
        })
    },
}

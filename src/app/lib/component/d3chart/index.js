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
            {val: 1,  date: new Date(2018, 1, 5)},
            {val: 3,  date: new Date(2018, 1, 6)},
            {val: 5,  date: new Date(2018, 1, 7)},
            {val: 8,  date: new Date(2018, 1, 8)},
            {val: 10,  date: new Date(2018, 1, 9)},
            {val: 7, date: new Date(2018, 1, 10)},
    ]}),
    render: function (h) {
        return h('div', {
                style: {
                    width: '100%',
                    '_background-color': '#00a070',
                    _padding: '10px',
                },
            },
            [h('svg', {
                attrs: {},
                style: {
                    '_background-color': '#ffa070',
                    width: '100%',
                    height: '100%',
                    display: 'block'
                },
                ref: 'chart'
            })]
        )
    },
    computed: {},
    beforeUpdate: function() {},
    beforeCreate: function() {},
    beforeMount: function() {},
    beforeDestroy: () => this.$bus.$off(),  // unbind all events
    destroyed: () => {},
    // watch: function(data) {}
    // this.$set(this.$el.is)
    mounted: function() {

        let el = this.$el
        let ch = this.$refs['chart']
        let chart = d3.select(ch)
        const self = this

        let w = el.clientWidth
        let h = el.clientHeight
        let x = d3.scaleTime()
                  .domain([new Date(2018, 1, 1), new Date(2018, 1, 6)])
                  .range([0, w])

        let y = d3.scaleLinear()
                  .domain([10, 0])  //.domain([0, d3.max(data)])
                  .range([0, h])

        let lngen = d3.line()
                      .x(d => x(d.date))
                      .y(d => y(d.val))

        let path = chart.append('path')
                        .attr('d', lngen(self.data))
                        .attr("stroke", "blue")

        this.$nextTick(() => {
            // todo: remove listeners
            document.addEventListener('DOMSubtreeModified', function(ev) {
                console.warn(ev.target.nodeName)
                // todo dom subtree check
                if (ev.target.nodeName !== 'svg' && ev.target.nodeName !== 'path') {
                    self.$root.bus.$emit('dom:mutate')
                }
            })
        })


        // svf scale: https://gist.github.com/soykje/ec2fc326830355104c89cd50bf1fa192
        const render = () => {
            let w = el.clientWidth
            let h = el.clientHeight
            console.log(`${w}x${h}`)

            // d.selectAll('rect.background').attr('width', w)

            chart.attr('width', w)

            let x = d3.scaleTime()
                      .domain([new Date(2018, 1, 1), new Date(2018, 1, 6)])
                      .range([0, w])

            let y = d3.scaleLinear()
                      .domain([10, 0])  //.domain([0, d3.max(data)])
                      .range([0, h])

            let lngen = d3.line()
                          .x(d => x(d.date))
                          .y(d => y(d.val))
            
            path.attr('d', lngen(self.data))

        }

        render()

        //this.$nextTick(() => () => render())
        //this.$nextTick(() => () => render())

        this.$bus.$on('dom:mutate', () => {
            console.info('dom:mutate')
            console.log(this.$el.clientWidth)
            render()
        })

        this.$bus.$on('dom:resize', () => {
            console.info('dom:resize')
            console.log(this.$el.clientWidth)
            render()
        })

        /*

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
         */
    },
}

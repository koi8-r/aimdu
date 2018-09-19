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
    mounted: function() {
        let el = this.$el
        // https://habr.com/post/166321/
        // https://github.com/que-etc/resize-observer-polyfill
        // https://github.com/Justineo/resize-detector
        // https://developers.google.com/web/updates/2016/10/resizeobserver
        // Vue.$bus

        /*
        https://www.sitepoint.com/creating-simple-line-bar-charts-using-d3-js/
        https://forums.databricks.com/questions/13077/multi-color-line-chart-d3js.html
        https://www.asynclabs.co/blog/how-to-visualize-big-data-sets-with-d3-js/
        https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
        http://nvd3.org/examples/line.html

        https://itnext.io/d3-js-in-all-its-glory-7066601aa16b
        https://codepen.io/zakariachowdhury/pen/JEmjwq
        https://stackoverflow.com/questions/50427528/unable-to-create-a-line-chart-in-d3-js
        https://gist.github.com/benjchristensen/2579599
        https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935
        https://medium.freecodecamp.org/learn-to-create-a-line-chart-using-d3-js-4f43f1ee716b
        
         */
        window.addEventListener("resize", function(ev) {
            console.info('!resize')
            console.info(`${el.offsetWidth}x${el.offsetHeight}`)
            console.info(`${el.clientWidth}x${el.clientHeight}`)
        }) ;
        console.error(getComputedStyle(el).getPropertyValue("width"))
        //console.error(getComputedStyle(this.$refs['chart']).getPropertyValue("width"))  // currentStyle
        console.error(el.getBoundingClientRect().width)
        console.error(this.$refs['chart'].getBoundingClientRect().width)
        console.error($(el).outerWidth())
        console.error($(el).innerWidth())
        //console.error($(this.$refs['chart']).outerWidth())
        //let chart = d3.select(this.$refs['chart'])
        //console.warn(this.$refs['chart'])
        let w = el.offsetWidth   // clientWidth
        let h = el.offsetHeight   // offsetHeight
        console.warn(this.$refs['chart'].getBBox())
        console.warn(`${w}x${h}`)
        console.warn(this.data.length)
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

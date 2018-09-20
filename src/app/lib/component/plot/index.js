'use strict'
import * as d3 from 'd3'
import Plotly from 'plotly.js-dist'


export default {
    name: 'Plot',
    props: {},
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
                    width: '100%'
                }
            },
            []
        )
    },
    mounted: function() {
        let el = this.$el
        //let gd = d3.select(el).node()
        let gd = el

        Plotly.plot(gd, [{
            x: [1, 2, 3, 2],
            y: [1, 2, 4, 5],
            //mode: 'lines+markers',
            //type: 'scatter',
            marker: {
                color: 'rgb(128, 0, 128)',
                size: 8
            },
            line: {
                color: 'rgb(128, 0, 128)',
                width: 1
            }
        }],
        {
            autosize: true,
            showlegend: true
        })

        window.onresize = function() {
            Plotly.Plots.resize(gd)
        }
    }
}

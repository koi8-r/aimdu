'use strict'
import * as d3 from 'd3'
import Plotly from 'plotly.js-dist'

/*
https://stackoverflow.com/questions/47117803/ploty-js-graph-not-responsive
https://plot.ly/javascript/
https://codepen.io/plotly/pen/PPVeer
https://plot.ly/javascript/pie-charts/
https://plot.ly/javascript/histograms/
https://plot.ly/javascript/line-charts/
https://plot.ly/javascript/responsive-fluid-layout/

 */

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
                    xwidth: '600px',
                    xheight: '250px',
                }
            },
            []
        )
    },
    mounted: function() {
        let el = this.$el

        Plotly.plot(el, [{
            x: [1, 2, 3],
            y: [1, 2, 4]
        }],
        { margin: {t: 0} })
    }
}

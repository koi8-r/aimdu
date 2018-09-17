'use strict'
import template from './index.vue.html'
import Chart from 'chart.js'


export default {
    name: 'Chart',
    template: template,
    props: {
        domId: {
            type: String,
            required: true
        }
    },
    // https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a
    // https://github.com/apertureless/vue-chartjs
    // https://alligator.io/vuejs/vue-chart-js/
    // https://www.sitepoint.com/creating-beautiful-charts-vue-chart-js/
    
    // https://dev.to/changoman/vuejs-and-chartjs-weather-api-example-1e7
    // https://alligator.io/vuejs/vue-chart-js/
    // https://abraxabra.ru/blog/vue-js/create-stunning-charts-vue-js-and-chart-js/
    // https://www.thepolyglotdeveloper.com/2018/01/use-chartjs-display-attractive-charts-vuejs-web-application/
    // https://medium.com/js-dojo/build-a-realtime-chart-with-vue-js-d7e2e25a5e21
    // https://codepen.io/setholito/pen/BWOmwP
    // https://hackernoon.com/creating-stunning-charts-with-vue-js-and-chart-js-28af584adc0a
    // https://www.sitepoint.com/creating-beautiful-charts-vue-chart-js/
    // https://appdividend.com/2018/02/23/laravel-vue-js-chartjs-tutorial-example/
    // https://travishorn.com/stacked-bar-chart-with-chart-js-846ebdf11c4e
    // 

    mounted: function() {
        console.log(this.domId)
        console.log(this.$refs[this.domId])
        console.log(this.$el)
        let ctx = this.$el.getContext('2d')
        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4],
                datasets: [{
                    label: 'l0',
                    data: [5, 15, 10, 8],
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(0, 0, 128, 0.3)',
                }, {
                    label: 'l1',
                    data: [8, 10, 8, 15],
                    borderColor: 'rgba(0, 0, 0, 0.1)',
					backgroundColor: 'rgba(0, 128, 0, 0.3)',
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Chart.js example'
                },
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        })
    },
    components: {},
    beforeDestroy () {},
    _render: function (h) {
        return h(
            'div', {
                style: this.styles,
                class: this.cssClasses
            },
            [h('canvas', {
                attrs: {
                    id: this.chartId,
                    width: this.width,
                    height: this.height
                },
                ref: 'canvas'
            })]
        )
    },
}

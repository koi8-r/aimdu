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
    
    mounted: function() {
        console.log(this.domId)
        console.log(this.$refs[this.domId])
        console.log(this.$el)
        let ctx = this.$el.getContext('2d')
        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5],
                datasets: [{
                    data: [10, 15, 18, 21, 15],
                }]
            }
        })
    },
    components: {}
}

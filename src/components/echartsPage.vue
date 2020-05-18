<template>
    <div id="charts" style="height:400px;"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import echarts from "echarts";
@Component({
    name: "chartsPage"
})
export default class EchartsPage extends Vue {
    mounted() {
        this.drawCharts();
    }
    drawCharts() {
        var myChart = echarts.init(document.getElementById("charts"));
        var option: object = {
            title: {
                text: "ECharts 入门示例"
            },
            tooltip: {},
            legend: {
                data: ["销量"]
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [
                {
                    name: "销量",
                    type: "bar",
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        };
        myChart.setOption(option);
    }
}
</script>

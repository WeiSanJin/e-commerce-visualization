<template>
    <div class="com-container">
        <div class="com-chart" ref="stock_ref"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            currentIndex: 0,
            timerId: null
        }
    },
    computed: {
        ...mapState(['theme'])
    },
    watch: {
        theme () {
        // console.log('主题切换了')
        this.chartInstance.dispose() // 销毁当前的图表
        this.initChart() // 重新以最新的主题名称初始化图表对象
        this.screenAdapter() // 完成屏幕的适配
        this.updateChart() // 更新图表的展示
        }
    },
    mounted() {
        this.initChart()
        this.getData()
        window.addEventListener('resize',this.screenAdapter)
        // 在页面加载完成时候，主动进行屏幕的适配
        this.screenAdapter()
    },
    destroyed() {
        // 关闭定时刷新
        clearInterval(this.timerId)
        // 组件销毁的时候，需要将监听器取消掉
        window.removeEventListener('resize', this.screenAdapter)
    },
    methods: {
        initChart(){
            this.chartInstance = this.$echarts.init(this.$refs.stock_ref, this.theme)
            const initOption = {
                title: {
                    text: '▎ 库存和销量分析',
                    left: 20,
                    top: 20
                },
            }
            this.chartInstance.setOption(initOption)
            this.chartInstance.on('mouseover', () => {
                clearInterval(this.timerId)
            })
            this.chartInstance.on('mouseout', () => {
                this.startInterval()
            })
        },
        async getData(){
            const {data:ret} = await this.$http.get('stock')
            this.allData = ret
            // console.log(ret);
            this.updateChart()
            this.startInterval()
        },
        updateChart(){
            const centerArr = [
                ['18%', '40%'],
                ['50%', '40%'],
                ['82%', '40%'],
                ['34%', '75%'],
                ['66%', '75%']
            ]
            const colorArr = [
                ['#4FF778', '#0BA82C'],
                ['#E5DD45', '#E8B11C'],
                ['#E8821C', '#E55445'],
                ['#5052EE', '#AB6EE5'],
                ['#23E5E5', '#2E72BF']
            ]
            const start = this.currentIndex * 5
            const end = (this.currentIndex + 1) *5
            const showData = this.allData.slice(start,end)
            const seriesArr = showData.map((item,index) => {
                return {
                    type: 'pie',
                    // radius: ['110','100'],
                    center: centerArr[index],
                    hoverAnimation: false, // 关闭鼠标移入时动画效果
                    labalLine:{
                        show: false
                    },
                    label: {
                        position: 'center',
                        color: colorArr[index][0]
                    },
                    data: [
                        {
                            name: item.name + '\n\n' + item.sales,
                            value: item.sales,
                            itemStyle: {
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: colorArr[index][0]
                                    },
                                    {
                                        offset: 1,
                                        color: colorArr[index][1]
                                    }
                                ])
                            }
                        },
                        {
                            value: item.stock,
                            itemStyle: {
                                color: '#333843'
                            }
                        }
                    ]
                }
            })
            const dataOption = {
                series: seriesArr
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter(){
            const titleFontSize = this.$refs.stock_ref.offsetWidth / 100 * 3.6
            const innerRadius = titleFontSize * 2.8
            const outterRadius = innerRadius * 1.125
            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize
                    }
                },
                series: [
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                    fontSize: titleFontSize / 1.5
                    }
                },
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                    fontSize: titleFontSize / 1.5
                    }
                },
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                    fontSize: titleFontSize / 1.5
                    }
                },
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                    fontSize: titleFontSize / 1.5
                    }
                },
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                        fontSize: titleFontSize / 1.5,
                    }
                }
                ]
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        startInterval(){
            if (this.timerId) {
                clearInterval(this.timerId)
            }
            this.timerId = setInterval(() => {
                this.currentIndex++
                if(this.currentIndex > 1){
                    this.currentIndex = 0
                }
                this.updateChart()
            }, 5000)
        }
    },
}
</script>

<style>

</style>
import {Component, Input, OnInit} from '@angular/core';
import * as echarts from "echarts";
import {EChartsOption} from "echarts/types/dist/shared";
import {PlatformFeeChartsOptions} from "../../../../../model/vo/chartsVo";
@Component({
  selector: 'app-platform-fee-charts',
  templateUrl: './platform-fee-charts.component.html',
  styleUrls: ['./platform-fee-charts.component.less']
})
export class PlatformFeeChartsComponent implements OnInit {

  platformCharts: any
  constructor() { }

  @Input()
  data: PlatformFeeChartsOptions

  ngOnInit(): void {
    let _data = this.data.seriesData
    const data = _data.map(i => {
      i[2]=Math.floor(Math.random() * (100 - 1)) + 1
      return i
    })
    setTimeout(() => {
      this.initCharts(data)
    }, 200)
    window.addEventListener('resize',(e:UIEvent) => {
      this.platformCharts.resize()
    })
  }

  initCharts(data) {
    console.log('init charts...')
    // @ts-ignore
    const chartDom:HTMLElement = document.getElementById('container');
    this.platformCharts = echarts.init(chartDom);
    let option: EChartsOption;
    const { xAxisValues, yAxisValues, min, max } = this.data

    // .map(function (item) {
    //   return [item[1], item[0], item[2] || '-'];
    // });
    console.log('data ', JSON.stringify(data))
    option = {
      backgroundColor: '#FFFFFF',
      tooltip: {
        show: true,
        position: 'top',
        // formatter: (params: any) => {
        //   console.log('params ', params)
        //   return params.data[2]
        // }
      },
      grid: {
        width: 'auto',
        height: 'auto',
        top: 0,
        left: 20,
        right: 20,
        bottom: 60
      },
      xAxis: {
        type: 'category',
        data: xAxisValues,
        splitArea: {
          show: true
        },
        splitLine: {
          show: false
        },
        minorSplitLine: {
          show: false
        },
        axisLabel: {
          formatter: function(val: any) {
            if (val == 3) {
              return '{a|3}'
            } else {
              return `{b|${val}}`
            }
          },
          color: '#515B6F',
          rich: {
            a: {
              height: 19,
              lineHeight: 19,
              backgroundColor: '#D6DDEB',
              color: '#25324B',
              padding: [0,8,0,8],
              fontSize: 12,
              fontFamily: 'Epilogue',
              fontWeight: 400,
              borderRadius: 2
            },
            b: {
              height: 19,
              lineHeight: 19,
              color: '#515B6F',
              fontSize: 12,
              fontFamily: 'Epilogue',
              fontWeight: 400,
            }
          }
        }
      },
      yAxis: {
        type: 'category',
        // name: 'Platforms',
        nameLocation: 'end',
        nameTextStyle: {
          fontStyle: 'normal',
          fontFamily: 'Epilogue',
          fontSize: 12,
          fontWeight: 400,
          width: 19,
          height: 57,
          lineHeight: 19,
          padding: [0,8,0,8],
          color: '#7C8493',
          backgroundColor: '#F7F7F7'
        },
        axisLabel: {
          show: false,
          interval: "auto",
          inside: false,
          // formatter: function (value: any, index: number) {
          //   const item = JSON.parse(value)
          //   return item.name
          // }
        },
        data: yAxisValues,
        splitArea: {
          show: true
        },
        splitLine: {
          show: false
        },
        minorSplitLine: {
          show: false
        }
      },
      visualMap: {
        show: false,
        min: min,
        max: max,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        inRange: {
          color: ['#e5e9ef','#002766'],
          symbolSize: [0,100],
        }
      },
      series: [
        {
          name: 'Platforms',
          type: 'heatmap',
          data: data,
          tooltip: {
            show: false
          },
          label: {
            fontSize: '14px',
            fontFamily: 'Epilogue',
            fontStyle: 'normal',
            fontWeight: 400,
            show: true,
            formatter: function(e: any) {
              return '$'+e.data[2].toFixed(1)
            }
          },
          // emphasis: {
          //   itemStyle: {
          //     shadowBlur: 2,
          //     // shadowColor: 'rgba(0,0,0,.4)',
          //     borderRadius: 5
          //   }
          // },
          itemStyle: {
            // @ts-ignore
            borderRadius: 5,
            borderWidth: 4,
            borderColor: '#FFFFFF',
            borderType: 'solid',
          }
        }
      ]
    };
    option && this.platformCharts.setOption(option);
  }

}

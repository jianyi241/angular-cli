import {Component, Input, OnInit} from '@angular/core';
import * as echarts from "echarts";
import {EChartsOption} from "echarts/types/dist/shared";
import { FeeReviewChartsProduct, PlatformFeeChartsOptions} from "../../../../../model/vo/chartsVo";
import {FeeReviewChart} from "../../../../../model/po/feeReviewChart";
import {ReviewService} from "../../../../../service/review.service";
@Component({
  selector: 'app-platform-fee-charts',
  templateUrl: './platform-fee-charts.component.html',
  styleUrls: ['./platform-fee-charts.component.less']
})
export class PlatformFeeChartsComponent implements OnInit {

  platformCharts: any = null
  yAxisData: Array<FeeReviewChartsProduct> = new Array<FeeReviewChartsProduct>()
  chartsHeight: number = 0
  constructor(private reviewService: ReviewService) { }

  @Input()
  chartsId: string

  ngOnInit(): void {
    window.addEventListener('resize',(e:UIEvent) => {
      if (this.platformCharts) {
        this.platformCharts.resize()
      }
    })
  }

  setChartsData(data: FeeReviewChart, hideWarning: boolean = false) {
    const xAxisValues = data.scopes.map(i => i / 1000)
    const yAxisValues: Array<FeeReviewChartsProduct> = []
    const seriesData: Array<Array<number>> = []
    let products = data.platforms.flatMap(i => i.products.flatMap(p => {
      return {...p, visitUrl: i.attachmentVo?.visitUrl}
    }))
    if (hideWarning) {
      products = products.filter(f => !f.warning)
    }
    products.forEach((p,idx) => {
        yAxisValues.unshift({
          platformName: p.platformName,
          produceName: p.name,
          warning: p.warning,
          warningMessage: p.warningMessage,
          mainFlag: p.shProductId == this.reviewService.comparison.mainPlatformId,
          visitUrl: p.visitUrl
        })
        const scopes = p.scopes.map((s, sIdx) => {
          return [sIdx, idx, s.value]
        })
        seriesData.push(...scopes)
    })
    const totalBalance = data.totalBalance / 1000
    const allValues = seriesData.flatMap(i => i[2]).sort((a, b) => a - b)
    this.chartsHeight = yAxisValues.length * 56 + 60 // 每项高度56
    setTimeout(() => {
      this.initCharts({xAxisValues,yAxisValues,seriesData,min: allValues[0], max: allValues[allValues.length - 1],totalBalance})
    },50)
  }

  initCharts({xAxisValues, yAxisValues, min, max, seriesData, totalBalance}: PlatformFeeChartsOptions) {
    this.yAxisData = yAxisValues
    if (this.platformCharts == null) {
      const chartDom:HTMLElement = document.getElementById(this.chartsId);
      this.platformCharts = echarts.init(chartDom);
    } else {
      this.platformCharts.clear()
    }
    let option: EChartsOption;
    option = {
      backgroundColor: '#FFFFFF',
      tooltip: {
        show: true,
        position: 'top',
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
            if (val == totalBalance) {
              return `{a|${val}}`
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
          },
          interval: 0
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
          inside: false,
        },
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
          data: seriesData,
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
    option && this.platformCharts.setOption(option, true);
    this.platformCharts.resize()
  }

}

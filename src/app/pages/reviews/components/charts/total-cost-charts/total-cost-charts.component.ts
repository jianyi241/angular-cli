import {Component, Input, OnInit} from '@angular/core';
import * as echarts from "echarts";
import {FeeReviewChart} from "../../../../../model/po/feeReviewChart";
import {FeeReviewChartsProduct, TotalCostChartsOptions} from "../../../../../model/vo/chartsVo";
import {ReviewService} from "../../../../../service/review.service";

@Component({
  selector: 'app-total-cost-charts',
  templateUrl: './total-cost-charts.component.html',
  styleUrls: ['./total-cost-charts.component.less']
})
export class TotalCostChartsComponent implements OnInit {
  totalCastCharts: any = null
  legendData: Array<FeeReviewChartsProduct> = new Array<FeeReviewChartsProduct>()

  @Input()
  chartsId: string
  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    window.addEventListener('resize',(e:UIEvent) => {
      if (this.totalCastCharts) {
        this.totalCastCharts.resize()
      }
    })
  }

  getRandomColor(): string{
    return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6);
  }

  setChartsData(data: FeeReviewChart, hideWarning: boolean = false) {
    const colors = ['#7C77E9', '#17B726', '#1890FF', '#7938C9', '#EDA114']
    const xAxisValues = data.scopes.map(i => i / 1000)
    let seriesData: Array<FeeReviewChartsProduct> = []
    let products = data.platforms.flatMap(i => i.products.flatMap(p => {
      return {...p, visitUrl: i.attachmentVo?.visitUrl}
    }))
    if (hideWarning) {
      products = products.filter(f => !f.warning)
    }

    seriesData = products.map((p, idx) => {
      return {
        platformName: p.platformName,
        produceName: p.name,
        warning: p.warning,
        warningMessage: p.warningMessage,
        mainFlag: p.shProductId == this.reviewService.comparison.mainPlatformId,
        visitUrl: p.visitUrl,
        lineData: p.scopes.map(pv => Number.parseFloat(pv.value.toFixed(2))),
        lineColor: idx <=4 ? colors[idx] : this.getRandomColor()
      }
    })
    this.legendData = seriesData
    const totalBalance = data.totalBalance / 1000
    const max = (): number => {
      const data = seriesData.flatMap(i => i.lineData).sort((a, b) => a - b)
      return data[data.length - 1]
    }
    const markIndex = xAxisValues.findIndex(x => x === totalBalance)
    setTimeout(() => {
      this.initCharts({seriesData, xAxisValues, markIndex, totalBalance , max: max()})
    }, 50)
  }

  initCharts({seriesData, xAxisValues, markIndex, totalBalance, max}: TotalCostChartsOptions) {
    const data: any = seriesData.map(e => {
      return {
        name: `${e.platformName}_||_${e.produceName}_||_${e.visitUrl}`,
        type: 'line',
        // stack: 'Total',
        showSymbol: true,
        symbol: 'circle',     //设定为实心点
        symbolSize: e.mainFlag ? 11 : 6,   //设定实心点的大小
        itemStyle: {
          color: e.lineColor,
        },
        lineStyle: {
          type: 'solid',
          color: e.lineColor,
          width: e.mainFlag ? 4 : 2 // 主产品加粗
        },
        data: e.lineData
      }
    })
    // @ts-ignore
    if (this.totalCastCharts == null) {
      const chartDom: HTMLElement = document.getElementById(this.chartsId);
      this.totalCastCharts = echarts.init(chartDom);
    } else {
      this.totalCastCharts.clear()
    }
    let option;
    option = {
      title: {
        show: false,
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `
            <div style="position: relative;box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);border-radius: 4px;background: #FFFFFF;overflow: hidden;width: 184px;">
                <div style="position: relative;padding: 10.5px 12px;background: #F8F8FD;display: flex;align-items: center;justify-content: space-between;">
                    <div style="display: flex;align-items: center;height: 42px;">
                        <img src="${params.seriesName.split('_||_')[2]}" style="width: 21px;
                        height: 21px;border-radius: 50%;margin-right: 8px;"/>
                        <div style="font: normal 400 10px 'Epilogue';">
                            <div style="color: #7C8493;">${params.seriesName.split('_||_')[1]}</div>
                            <div style="font-weight: 600;color: #25324B;">${params.seriesName.split('_||_')[0]}</div>
                        </div>
                    </div>
                    <div style=";width: 6px;height: 6px;border-radius: 50%;background-color: ${params.color}"></div>
                </div>
                <div style="vertical-align: text-top;padding: 0 8px 8px 8px !important;color: #25324B;font: normal 400 12px 'Epilogue';line-height: 1.5;word-wrap: break-word;word-break: break-word;white-space: pre-line;margin-top: -10px">
                    <span style="font-weight: 700;">$${params.value}</span> total cost at $${params.name} of the total investment value
                </div>
            </div>
          `
        },
        borderWidth: 0,
        padding: 0,
        borderRadius: 4
      },
      legend: {
        show: false,
        data: data,
        bottom: 0,
      },
      grid: {
        top: 10,
        left: 20,
        right: 20,
        bottom: 40,
        containLabel: true
      },
      toolbox: {
        show: false,
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisValues,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisTick: {
          show: true,
          lineStyle: {
            type: 'solid'
          }
        },
        axisLabel: {
          interval: 0  //设置间隔为0
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        max: 'dataMax',
        axisTick: {
          show: true,
          lineStyle: {
            type: 'solid'
          }
        },
        axisLine: {
          show: true
        }
      },
      series: [
        ...data,
        {
          name: 'Current portfolio value',
          type: 'line',
          markLine: {
            lineStyle: {
              width: 2,
              type: 'dashed',
              color: '515B6F',
              zIndex: 999
            },
            tooltip: {
              formatter: (params) => {
                return `
                  <div style='color: #25324B;padding: 7px 12px;background: #d6ddeb;border-radius: 4px;box-shadow: 0 0 2px #DEDEDE;text-align: center;;'>
                    <div style="font: normal 400 12px 'Epilogue';line-height: 20px">${params.name}</div>
                    <div style="font: normal 600 16px 'Epilogue';line-height: 20px">$${totalBalance} (K)</div>
                  </div>
                `
              },
            },
            label: {
              show: false,
              distance: -100,
              position: 'end',
              formatter: '{b}\n {h|$160 (K)}',
              color: '#25324B',
              fontFamily: 'Epilogue',
              padding: [7, 12, 7, 12],
              lineHeight: 20,
              borderWidth: 2,
              shadowColor: '#DEDEDE',
              shadowBlur: 6,
              backgroundColor: '#d6ddeb',
              borderRadius: 4,
              zIndex: 9999,
              rich: {
                h: {
                  fontSize: 16,
                  fontWeight: 600
                }
              }
            },
            silent: false, // 鼠标悬停事件, true悬停不会出现实线
            symbol: 'none', // 去掉箭头
            data: [
              [
                {
                  name: 'Current portfolio value',
                  coord: [markIndex, 0]
                },
                {
                  coord: [markIndex, max]
                }
              ]
            ]
          }
        }
      ]
    };
    option && this.totalCastCharts.setOption(option);
  }
}

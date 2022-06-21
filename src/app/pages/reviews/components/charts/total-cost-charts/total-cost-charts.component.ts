import { Component, OnInit } from '@angular/core';
import * as echarts from "echarts";

@Component({
  selector: 'app-total-cost-charts',
  templateUrl: './total-cost-charts.component.html',
  styleUrls: ['./total-cost-charts.component.less']
})
export class TotalCostChartsComponent implements OnInit {
  totalCastCharts: any
  totalCastData = [
    {
      name: 'Individual',
      product: 'BT Panorama',
      data: [120, 132, 101, 134, 90, 230, 210, 230, 210],
      color: '#7C77E9',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: false
    },
    {
      name: 'Individual1',
      product: 'BT Panorama',
      data: [120,220, 182, 191, 234, 290, 330, 310, 210],
      color: '#17B726',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: true
    },
    {
      name: 'Individual2',
      product: 'BT Panorama',
      data: [11, 22, 33, 44, 55, 66, 77, 99, 111],
      color: '#1890FF',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: true
    },
    {
      name: 'Individual3',
      product: 'Netwealth',
      data: [111, 132, 19, 34, 9, 23, 21, 240, 187],
      color: '#7938C9',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: false
    },
    {
      name: 'Individual4',
      product: 'BT Panorama',
      data: [155, 133, 126, 178, 230, 236, 120, 240, 170],
      color: '#EDA114',
      logo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F85%2F03%2Faf%2F8503af9a8b0ca227a0bd9be9ddc76e84.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657848848&t=ed9f99e59f7fcb63a66116259c19dfe6',
      mainFlag: false
    }
  ]
  constructor() { }

  ngOnInit(): void {
    this.initCharts()
    window.addEventListener('resize',(e:UIEvent) => {
      this.totalCastCharts.resize()
    })
  }

  initCharts() {
    const data = this.totalCastData
    const seriesData: any = data.map(e => {
      return {
        name: `${e.name}_||_${e.product}_||_${e.logo}`,
        type: 'line',
        // stack: 'Total',
        showSymbol: true,
        symbol: 'circle',     //设定为实心点
        symbolSize: e.mainFlag ? 11 : 6,   //设定实心点的大小
        itemStyle: {
          color: e.color,
        },
        lineStyle: {
          type: 'solid',
          color: e.color,
          width: e.mainFlag ? 4 : 2
        },
        data: e.data
      }
    })
    console.log('seriesData ', seriesData)
    // @ts-ignore
    const chartDom: HTMLElement = document.getElementById('totalCastCharts');
    this.totalCastCharts = echarts.init(chartDom);
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
                <div style="vertical-align: text-top;padding: 0 8px 8px 8px !important;color: #25324B;font: normal 400 12px 'Epilogue';line-height: 1.5;word-wrap: break-word;word-break: break-word;white-space: pre-line;">
                    <span style="font-weight: 700;">$${params.value}</span> total cost at $300k of the total investment value
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
        data: [0, 50, 100, 150,160, 200, 250, 300, 350, 400],
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
        ...seriesData,
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
                    <div style="font: normal 600 16px 'Epilogue';line-height: 20px">$160 (K)</div>
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
                  coord: [4, 0]
                },
                {
                  coord: [4, 330]
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

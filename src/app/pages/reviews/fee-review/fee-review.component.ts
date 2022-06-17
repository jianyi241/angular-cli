import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import * as echarts from "echarts";
import {EChartsOption} from "echarts/types/dist/shared";

@Component({
  selector: 'app-fee-review',
  templateUrl: './fee-review.component.html',
  styleUrls: ['./fee-review.component.less']
})
export class FeeReviewComponent implements OnInit {
  reviewNextObservable: any;
  reviewBackObservable: any;
  reviewSaveObservable: any;
  reviewLeaveObservable: any;
  text = 'This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,This is ...,'
  platformCharts: any
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

  constructor(public reviewService: ReviewService,
              public configService: ConfigService,
              private reviewRepository: ReviewRepository,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscribe();
    this.initCharts()
    this.initCharts1()
    window.addEventListener('resize',(e:UIEvent) => {
      this.platformCharts.resize()
      this.totalCastCharts.resize()
    })
  }

  ngOnDestroy(): void {
    this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
    this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
    this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
    this.reviewLeaveObservable && this.reviewLeaveObservable.unsubscribe();
  }


  subscribe(): void {
    this.saveSubscribe();
    this.nextSubscribe();
    this.backSubscribe();
    this.leaveSubscribe();
  }

  nextSubscribe(): void {
    this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
      // this.router.navigateByUrl(`/review/summary/${this.reviewService.comparison.id}`);
      this.reviewService.nextStep(AnalysisType.fee);
    });
  }

  backSubscribe(): void {
    this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
      // this.reviewService.preStep(AnalysisType.fee);
      this.router.navigateByUrl(`/review/fee-comparison/${this.reviewService.comparison.id}`);
    })
  }

  saveSubscribe(): void {
    this.reviewSaveObservable = this.reviewService.saveObservable.subscribe((callback) => {
      callback && callback();
    })
  }

  leaveSubscribe(): void {
    this.reviewLeaveObservable = this.reviewService.leaveReviewObservable.subscribe(() => {
      this.router.navigateByUrl('/supplier/comparisons-list');
    })
  }

  openCommentPopover(pComment: NgbPopover) {
    pComment.open()
  }

  closeCommentPopover(pComment: NgbPopover) {
    pComment.close()
  }

  initCharts() {
    // @ts-ignore
    const chartDom:HTMLElement = document.getElementById('container');
    this.platformCharts = echarts.init(chartDom);
    let option: EChartsOption;

    const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9','10'];

    const days = [
      {
        name: 'Individual11',
        product: 'BT Panorama',
        logo: 'https://img1.baidu.com/it/u=2427267416,2184425688&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      },
      {
        name: 'Individual22',
        product: 'BT Panorama',
        logo: 'https://img1.baidu.com/it/u=2427267416,2184425688&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      },
      {
        name: 'Individual33',
        product: 'BT Panorama',
        logo: 'https://img1.baidu.com/it/u=2427267416,2184425688&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      },
      {
        name: 'Individual44',
        product: 'BT Panorama',
        logo: 'https://img1.baidu.com/it/u=2427267416,2184425688&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      },
      {
        name: 'Individual55',
        product: 'BT Panorama',
        logo: 'https://img1.baidu.com/it/u=2427267416,2184425688&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      }
    ];
    // prettier-ignore
    const data = [[0,0,1],[1,0,2],[2,0,3],[3,0,4],[4,0,5],[5,0,6],[6,0,7],[7,0,8],[8,0,9],[9,0,10],
      [0,1,10],[1,1,9],[2,1,8],[3,1,7],[4,1,6],[5,1,5],[6,1,4],[7,1,3],[8,1,2],[9,1,1],
      [0,2,10],[1,2,9],[2,2,8],[3,2,7],[4,2,6],[5,2,5],[6,2,4],[7,2,3],[8,2,2],[9,2,1],
      [0,3,10],[1,3,9],[2,3,8],[3,3,7],[4,3,6],[5,3,5],[6,3,4],[7,3,3],[8,3,2],[9,3,1],
      [0,4,10],[1,4,9],[2,4,8],[3,4,7],[4,4,6],[5,4,5],[6,4,4],[7,4,3],[8,4,2],[9,4,1]]
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
        data: hours,
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
          formatter: function (value: any, index: number) {
            const item = JSON.parse(value)
            return item.name
          }
        },
        data: days.map(item => JSON.stringify(item)),
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
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        // target: {
        inRange: {
          color: ['#E6F7FF','#BAE7FF','#91D5FF','#40A9FF','#1890FF','#0050B3','#002766'],
          symbolSize: [0,100]
        }
        // },
      },
      series: [
        {
          name: 'Platforms',
          type: 'heatmap',
          data: data,
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
          emphasis: {
            itemStyle: {
              shadowBlur: 2,
              // shadowColor: 'rgba(0,0,0,.4)',
              borderRadius: 5
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
    option && this.platformCharts.setOption(option);
  }

  initCharts1() {
    const data = this.totalCastData
    const seriesData: any = data.map(e => {
      return {
        name: e.name,
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
        trigger: 'axis'
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
        data: [0, 50, 100, 150, 200, 250, 300, 350, 400],
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
            label: {
              show: true,
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
            silent: true, // 鼠标悬停事件, true悬停不会出现实线
            symbol: 'none', // 去掉箭头
            data: [
              [
                {
                  name: 'Current portfolio value',
                  coord: [2, 0]
                },
                {
                  coord: [2, 330]
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

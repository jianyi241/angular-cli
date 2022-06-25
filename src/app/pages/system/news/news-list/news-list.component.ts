import { Component, OnInit } from '@angular/core';

interface ConditionOptionsGroup {
  name: string,
  options: Array<{label: string,name: string, value: false}>
}

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.less']
})
export class NewsListComponent implements OnInit {
  expandedList: Array<number> = []
  conditionOptions: Array<ConditionOptionsGroup> = [
    {
      name: 'Products',
      options: [
        {
          label: 'All',
          name: 'all',
          value: false
        },
        {
          label: 'BT Panorama',
          name: 'BTPanorama',
          value: false
        },
        {
          label: 'Netwealth',
          name: 'Netwealth',
          value: false
        },
        {
          label: 'JO',
          name: 'JO',
          value: false
        },{
          label: 'HUB24',
          name: 'HUB24',
          value: false
        }
      ]
    },
    {
      name: 'Type',
      options: [
        {
          label: 'All',
          name: 'all',
          value: false
        },
        {
          label: 'General post',
          name: 'Generalpost',
          value: false
        },
        {
          label: 'Platform updates',
          name: 'Platformupdates',
          value: false
        }
      ]
    },
    {
      name: 'Status',
      options: [
        {
          label: 'All',
          name: 'all',
          value: false
        },
        {
          label: 'Published',
          name: 'Published',
          value: false
        },
        {
          label: 'Pending',
          name: 'Pending',
          value: false
        }
      ]
    }
  ]
  imageList: Array<string> = [
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202009%2F23%2F20200923185609_rQUdj.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658715908&t=2092f0f49a23b6ef929d97c86295c82b',
    'https://img0.baidu.com/it/u=4208173036,4288504561&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=422',
    'https://img1.baidu.com/it/u=1688680882,2943600730&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=362',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F3a%2F99%2F66%2F3a996646c1ad85975106393955102a40.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658728358&t=bc863be1da187139236e236845b99cf3',
    'https://img1.baidu.com/it/u=963199490,1397250471&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=370',
    'https://img1.baidu.com/it/u=963199490,1397250471&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=370'
  ]
  imagesList: Array<string> = []
  imageListWidth: number = 0
  imagesOffset: number = 0

  constructor() { }

  ngOnInit(): void {
    // this.initImageList()
  }

  expandOptions(idx: number) {
    const includesIndex = this.expandedList.indexOf(idx)
    if (includesIndex !== -1) {
      this.expandedList.splice(includesIndex, 1)
    } else {
      this.expandedList.push(idx)
    }
  }

  searchList() {

  }

  // initImageList(): void {
  //   let totalWidth: number = 0
  //   this.imagesList = this.imageList.map(i => {
  //     const img = new Image()
  //     img.src = i
  //     let height = 172
  //     let width = Number.parseFloat((height / img.height) * img.width)
  //     // img.height = 172
  //     console.log('width ', width)
  //     img.height = height
  //     img.width = Math.round(width)
  //     totalWidth += Number.parseFloat(img.width + 8)
  //     console.log('image width ', img.width)
  //     return img.outerHTML
  //   })
  //   this.imageListWidth = totalWidth
  //   console.log('imgList ', this.imagesList)
  //   console.log('total image width ', totalWidth.toFixed(2))
  // }

  // changeImages($event: UIEvent, type: string) {
  //   const baseWidth = $event.currentTarget.parentNode.clientWidth
  //   if (type === 'prev') {
  //     console.log('prev image-list ', $event.currentTarget.nextElementSibling.clientWidth)
  //
  //     this.imagesOffset += baseWidth
  //   } else {
  //     // if (!this.showNextImagesBtn($event, baseWidth)) return
  //     this.imagesOffset -= baseWidth
  //   }
  //   console.log('left ', this.imagesOffset)
  // }
  //
  // showNextImagesBtn(id: string): boolean {
  //   let imageContainerWidth = document.getElementById(id).clientWidth
  //   console.log('imageContainerWidth ', imageContainerWidth)
  //   let imageListWidth = this.imageListWidth
  //   let offsetWidth = Math.abs(this.imagesOffset - imageListWidth)
  //   if (imageListWidth < imageContainerWidth) {
  //     return false
  //   } else if (offsetWidth > imageListWidth) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }
}

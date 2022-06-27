import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-horizontal-image-list',
  templateUrl: './horizontal-image-list.component.html',
  styleUrls: ['./horizontal-image-list.component.less']
})
export class HorizontalImageListComponent implements OnInit {

  constructor() { }

  imagesOffset: number = 0
  imageListWidth: number = 0
  imageDomList: Array<string> = new Array<string>()

  @Input()
  imageList: Array<string> = new Array<string>()

  @Input()
  domId: string = 'images'

  @Input()
  height: number = 172

  ngOnInit(): void {
    console.log('...')
    this.initImageList()
  }

  initImageList(): void {
    let totalWidth: number = 0
    this.imageDomList = this.imageList.map(i => {
      const img = new Image()
      console.log('image ', img, '---- ', img.width, '---- ', img.height)
      img.src = i
      img.onload = () => {
        console.log('img onload res ')
        const height = this.height
        const width = (height / img.height) * img.width
        console.log('width ', width)
        img.height = height
        img.width = Math.round(width)
        totalWidth += img.width + 8
      }
      // this.getImageSize()
      console.log('image width ', img.width)
      return img.outerHTML
    })
    this.imageListWidth = totalWidth
    console.log('imgList ', this.imageList)
    console.log('total image width ', totalWidth.toFixed(2))
  }

  getImageSize(url) {
    return new Promise(function (resolve, reject) {
      let image = new Image();
      image.onload = function () {
        resolve({
          width: image.width,
          height: image.height
        });
      };
      image.onerror = function () {
        reject(new Error('error'));
      };
      image.src = url;
    });
  }

  changeImages(type: string) {
    const imageContainerWidth = document.getElementById(this.domId).clientWidth
    if (type === 'prev') {
      this.imagesOffset += imageContainerWidth
    } else {
      this.imagesOffset -= imageContainerWidth
    }
    console.log('left ', this.imagesOffset)
  }

  showNextImagesBtn() {
    let imageContainerWidth = document.getElementById(this.domId).clientWidth
    // console.log('imageContainerWidth ', imageContainerWidth)
    let imageListWidth = this.imageListWidth
    let offsetWidth = Math.abs(this.imagesOffset - imageListWidth)
    if (imageListWidth < imageContainerWidth) {
      return false
    } else if (offsetWidth > imageListWidth) {
      return false
    } else {
      return true
    }
  }
}

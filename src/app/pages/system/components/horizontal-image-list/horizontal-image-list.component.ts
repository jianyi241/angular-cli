import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {PreviewImageModalComponent} from "../../platforms/modal/preview-image-modal/preview-image-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

interface ImageInfo {
  url: string
  title?: string
  width: number
  height: number
}

@Component({
  selector: 'app-horizontal-image-list',
  templateUrl: './horizontal-image-list.component.html',
  styleUrls: ['./horizontal-image-list.component.less']
})
export class HorizontalImageListComponent implements OnInit {

  constructor(private ngbModal: NgbModal) { }

  imagesOffset: number = 0
  imageListWidth: number = 0
  imageInfoList: Array<ImageInfo> = new Array<ImageInfo>()

  @Input()
  imageList: Array<string> = new Array<string>()

  @Input()
  domId: string = 'images'

  @Input()
  height: number = 172

  @Input()
  showDelete: boolean = false

  @Output()
  removeImageIndex = new EventEmitter<number>()

  ngOnInit(): void {
    this.initImageList()
  }

  previewImage(imgUrl: string): void {
    const modalRef = this.ngbModal.open(PreviewImageModalComponent, {
      size: 'lg',
      windowClass: 'tip-popup-modal',
      centered: true
    });
    modalRef.componentInstance.imgUrl = imgUrl
  }

  initImageList(): void {
    this.imageListWidth = 0
    this.imageList.forEach(async i => {
      await this.getImageSize(i).then(res => {
        if (res.width && res.height) {
          const originHeight = res.height
          const originWidth = res.width
          let height = this.height
          let width = Math.round((height / originHeight) * originWidth)
              this.imageInfoList.push({
                url: i,
                height,
                width
              })
          this.imageListWidth += width + 8
        } else {
        }
      })
    })
  }

  getImageSize(url): Promise<{width: number,height: number}> {
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

  changeImages(type: string): void {
    const imageContainerWidth = document.getElementById(this.domId).clientWidth
    if (type === 'prev') {
      this.imagesOffset += imageContainerWidth
    } else {
      this.imagesOffset -= imageContainerWidth
    }
  }

  showNextImagesBtn(): boolean {
    const imageContainerWidth = document.getElementById(this.domId).clientWidth
    const imageListWidth = this.imageListWidth
    const offsetWidth = Math.abs(this.imagesOffset - imageContainerWidth)
    if (imageListWidth < imageContainerWidth) {
      return false
    } else if (offsetWidth > imageListWidth) {
      return false
    } else {
      return true
    }
  }

  handleClickRemove($event: UIEvent, idx: number): void {
    $event.stopPropagation()
    this.removeImageIndex.emit(idx)
  }
}

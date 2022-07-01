import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {PreviewImageModalComponent} from "../../platforms/modal/preview-image-modal/preview-image-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Attachment} from "../../../../model/attachment";

interface ImageInfo {
  attachment: Attachment
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
  attachmentList: Array<Attachment> = new Array<Attachment>()

  @Input()
  domId: string = 'images'

  @Input()
  height: number = 172

  @Input()
  showDelete: boolean = false

  @Output()
  removeImageIndex = new EventEmitter<number>()

  ngOnInit(): void {
    if (this.attachmentList.length) {
      this.loadImageList()
    }
  }

  previewImage(imgUrl: string): void {
    const modalRef = this.ngbModal.open(PreviewImageModalComponent, {
      size: 'lg',
      windowClass: 'tip-popup-modal',
      centered: true
    });
    modalRef.componentInstance.imgUrl = imgUrl
  }

  loadImageList(): void {
    this.imageListWidth = 0
    const list: Array<ImageInfo> = []
    this.attachmentList.forEach(async i => {
      await this.getImageSize(i.visitUrl).then(res => {
        if (res.width && res.height) {
          const originHeight = res.height
          const originWidth = res.width
          let height = this.height
          let width = Math.round((height / originHeight) * originWidth)
          list.push({
                attachment: i,
                height,
                width
              })
          this.imageListWidth += width + 8
        } else {
        }
      })
    })
    this.imageInfoList = list
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
      console.log('prev ', this.imagesOffset + imageContainerWidth)
      if (this.imagesOffset + imageContainerWidth > 0) {
        this.imagesOffset = 0
        return
      }
      this.imagesOffset += imageContainerWidth
      console.log('prev ', this.imagesOffset, '------ ', this.imageListWidth)
    } else {
      console.log('next ', Math.abs(this.imagesOffset - imageContainerWidth - imageContainerWidth))
      const start = Math.abs(this.imagesOffset - imageContainerWidth - imageContainerWidth) > this.imageListWidth
      if (start) {
        this.imagesOffset = -this.imageListWidth + imageContainerWidth
        return
      }
      this.imagesOffset -= imageContainerWidth
      console.log('next ', this.imagesOffset, '------ ', this.imageListWidth)
    }
  }

  showNextImagesBtn(): boolean {
    const imageContainerWidth = document.getElementById(this.domId).clientWidth
    const imageListWidth = this.imageListWidth
    const offsetTotalWidth = Math.abs(this.imagesOffset - imageContainerWidth)
    return !((imageListWidth < imageContainerWidth) || (offsetTotalWidth >= imageListWidth))
  }

  handleClickRemove($event: UIEvent, idx: number): void {
    $event.stopPropagation()
    this.removeImageIndex.emit(idx)
  }
}

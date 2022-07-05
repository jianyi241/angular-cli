import {Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from "../../../../../model/constants";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {FileRepository} from "../../../../../repository/file-repository";
import PostInfo from "../../../../../model/po/postInfo";
import {PostRepository} from "../../../../../repository/post-repository";
import {PlatformRepository} from "../../../../../repository/platform-repository";
import {CurrentUserService} from "../../../../../service/current-user.service";
import {ProductInfo} from "../../../../../model/po/productInfo";
import {PostType} from "../../../../../model/enums/post-type";
import {Router} from "@angular/router";
import {PostStatus} from "../../../../../model/enums/post-status";
import {HorizontalImageListComponent} from "../../../components/horizontal-image-list/horizontal-image-list.component";

Constants.EDITOR_CONFIG.editorplaceholder = 'What do you want to post?'
@Component({
    selector: 'app-create-post-modal',
    templateUrl: './create-post-modal.component.html',
    styleUrls: ['./create-post-modal.component.less']
})
export class CreatePostModalComponent implements OnInit {

    config = {...Constants.EDITOR_CONFIG};
    uploading: boolean = false
    postInfo: PostInfo = new PostInfo();
    platformOptions: Array<ProductInfo> = new Array<ProductInfo>();
    platform: ProductInfo = new ProductInfo()
    productOptions: Array<ProductInfo> = new Array<ProductInfo>();
    product: ProductInfo = new ProductInfo();
    valid = {
        title: true,
        post: true
    }

    constructor(private router: Router,
                private ngbActiveModal: NgbActiveModal,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository,
                private postRepository: PostRepository,
                private platformRepository: PlatformRepository,
                private currentUserService: CurrentUserService) {
    }

    @ViewChild('imageScroll')
    imageScroll: HorizontalImageListComponent

    ngOnInit(): void {
        this.init()
    }

    init(): void {
        this.getPlatformOptions()
    }

    close(): void {
        this.ngbActiveModal.close()
    }

    droppedFile(files: NgxFileDropEntry[]): void {
        const isFile = files.every(s => s.fileEntry.isFile)
        if (isFile) {
            files.forEach(f => {
                this.uploadFile(f)
            })
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

    uploadFile(ngxFileDropEntry: NgxFileDropEntry): void {
        const fileEntry = ngxFileDropEntry.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
            if (!file.type.includes('image')) {
                this.toastRepository.showDanger('Unsupported file types');
                return;
            }
            this.uploading = true;
            this.fileRepository.uploadFile('img', file).then(res => {
                this.uploading = false;
                if (res.statusCode !== 200) {
                    this.toastRepository.showDanger('upload image failed.')
                    return
                }
                this.postInfo.attachments.push(...res.data)
                this.imageScroll.loadImageList()
            });
        });
    }

    getPlatformOptions(): void {
        const companyId = this.currentUserService.currentUser().companyId;
        this.platformRepository.getPlatformOptions(companyId).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg || 'get platform options failed.')
                return
            }
            if (res.data && res.data.length) {
                this.platformOptions = res.data
                if (this.currentUserService.isAdminUser()) {
                    this.platformOptions.push({
                        id: '',
                        platformName: 'Suitability Hub'
                    })
                }
                if (!this.postInfo.id) {
                    this.platform = res.data[0]
                } else {
                    if (this.postInfo.platformName === 'Suitability Hub') {
                        this.platform = this.platformOptions[this.platformOptions.length - 1]
                        this.getSuitabilityHubProducts()
                        return;
                    }
                    const _platform = this.platformOptions.find(f => f.id === this.postInfo.productId)
                    this.platform = _platform
                }
                this.getProductOptions()
            }
        })
    }

    getSuitabilityHubProducts(): void {
        this.productOptions = [
            {
                id: '',
                name: 'No Specific Products',
            }
        ]
        this.product = this.productOptions[0]
    }

    getProductOptions(): void {
        this.platformRepository.getProductOptions(this.platform.id).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg || 'get platform options failed.')
                return
            }
            if (res.data && res.data.length) {
                this.productOptions = [...res.data,{
                    id: '',
                    name: 'No Specific Products',
                }]
                console.log('this.productOptions ', this.productOptions)
                if (!this.postInfo.id) {
                    this.product = res.data[0]
                    return;
                }
                if (this.postInfo.productId) {
                    const _product = this.productOptions.find(f => f.id === this.postInfo.subProductId)
                    this.product = _product
                } else {
                    this.product = {
                        id: '',
                        name: 'No Specific Products'
                    }
                }
            }
        })
    }

    removeImageByIndex(idx: number) {
        this.postInfo.attachments.splice(idx, 1)
        this.imageScroll.loadImageList()
    }

    platformSelectChange(data: ProductInfo) {
        if (data.platformName == 'Suitability Hub') {
            this.getSuitabilityHubProducts()
            return
        }
        this.getProductOptions()
    }

    saveOrUpdatePost(): void {
        if (!this.postInfo.content.title) {
            this.valid.title = false
            return
        } else {
            this.valid.title = true
        }
        if (!this.postInfo.content.post) {
            this.valid.post = false
            return
        } else {
            this.valid.post = true
        }
        Object.assign(this.postInfo,{
            attachment: this.platform.attachmentVo,
            platformName: this.platform.platformName,
            productId: this.platform.id,
            subProductId: this.product.id,
            productName: this.product.name,
            type: this.postInfo.id ? this.postInfo.type : PostType.GeneralPost.value,
            status: this.currentUserService.isAdminUser() ? PostStatus.Published.value : PostStatus.Pending.value
        })
        this.postRepository.saveOrUpdatePost(this.postInfo).subscribe(res => {
            if (res.statusCode == 200) {
                this.toastRepository.showSuccess('operation successful.')
                this.ngbActiveModal.close(res.data)
            } else {
                this.toastRepository.showDanger(res.msg || 'operation failed.')
            }
        })
    }
}

import {Component, OnInit} from '@angular/core';
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

    constructor(private router: Router,
                private ngbActiveModal: NgbActiveModal,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository,
                private postRepository: PostRepository,
                private platformRepository: PlatformRepository,
                private currentUserService: CurrentUserService) {
    }

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
        if (files[0].fileEntry.isFile) {
            const fileEntry = files[0].fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
                if (!file.type.includes('image')) {
                    this.toastRepository.showDanger('Unsupported file types');
                    return;
                }
                this.uploading = true;
                this.fileRepository.uploadFile('img', file).then(res => {
                    this.uploading = false;
                    if (res.statusCode == 200) {
                        this.postInfo.attachments.push(...res.data)
                        console.log('post ', this.postInfo)
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
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
                this.platform = res.data[0]
                this.getProductOptions()
            }
        })
    }

    getProductOptions(): void {
        this.platformRepository.getProductOptions(this.platform.id).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg || 'get platform options failed.')
                return
            }
            if (res.data && res.data.length) {
                this.productOptions = res.data
                this.product = res.data[0]
            }
        })
    }

    removeImageByIndex($event: number) {
        console.log('event ', $event)
    }

    platformSelectChange($event: ProductInfo) {
        this.getProductOptions()
    }

    saveOrUpdatePost(): void {
        Object.assign(this.postInfo,{
            attachment: this.platform.attachmentVo,
            platformName: this.platform.platformName,
            productId: this.platform.id,
            subProductId: this.product.id,
            productName: this.product.name,
            type: PostType.GeneralPost.value
        })
        this.postRepository.saveOrUpdatePost(this.postInfo).subscribe(res => {
            if (res.statusCode == 200) {
                this.toastRepository.showSuccess('operation successful.')
                this.ngbActiveModal.close()
                this.router.navigateByUrl('/post/news-list')
            } else {
                this.toastRepository.showDanger(res.msg || 'operation failed.')
            }
        })
    }
}

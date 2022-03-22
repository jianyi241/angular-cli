import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {ProductInfo} from "../../../../model/po/productInfo";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {TabType} from "../../../../model/enums/tab-type";
import {ProductPropInfo} from "../../../../model/po/productPropInfo";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {PropertyVo} from "../../../../model/vo/PropertyVo";
import {Constants} from "../../../../model/constants";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {ToastRepository} from "../../../../repository/toast-repository";
import {FileRepository} from "../../../../repository/file-repository";
import {ConfigService} from "../../../../service/config.service";

@Component({
    selector: 'app-feature-form',
    templateUrl: './feature-form.component.html',
    styleUrls: ['./feature-form.component.less']
})
export class FeatureFormComponent implements OnInit {
    productId: string;
    product: ProductInfo = new ProductInfo();
    groups: Array<GroupInfo> = new Array<GroupInfo>();
    subGroup: GroupInfo = new GroupInfo();
    props: Array<PropertyVo> = new Array<PropertyVo>();
    productProps: Array<ProductPropInfo> = new Array<ProductPropInfo>();
    config = {...Constants.EDITOR_CONFIG};
    constructor(private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository,
                private platformRepository: PlatformRepository,
                private supplierRepository: SupplierRepository,) {
        this.config.editorplaceholder = 'What security measures are in place, e.g. ISO 27001 certification';
    }

    ngOnInit(): void {
        this.parseRouteParam();
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            this.productId = params['productId'];
            this.productDetail();
            this.productPropList();
        })
    }

    productDetail(): void {
        this.platformRepository.productDetail(this.productId).subscribe(res => {
            this.product = Object.assign(this.product, res.data);
        });
    }

    groupList(): void {
        this.supplierRepository.groupList(TabType.features.value).subscribe(res => {
            this.groups = res.data;
            if (this.groups.length == 0) return;
            let subGroups = this.groups[0].subList || [];
            if (subGroups.length == 0) return;
            this.chooseSubGroup(subGroups[0]);
        })
    }

    propList(subGroupId: string): void {
        this.supplierRepository.propList(subGroupId).subscribe(res => {
            this.props = res.data;
            if (this.props.length == 0 || this.productProps.length == 0) return;
            this.props.forEach(prop => {
                let find = this.productProps.find(pp => pp.shPropertyId == prop.id);
                if (find) {
                    prop.propValue = find.propValue;
                    prop.productDesc = find.description;
                    prop.attachmentVo = find.attachmentVo;
                }
            })
        });
    }

    productPropList(): void {
        this.platformRepository.productPropList(TabType.features.value, this.productId).subscribe(res => {
            this.productProps = res.data;
            this.groupList();
        })
    }

    chooseSubGroup(group: GroupInfo) {
        this.subGroup = group;
        this.dealEditProductProps(this.props);
        this.propList(group.id);
    }

    dealEditProductProps(props: Array<PropertyVo>) {
        if (props.length == 0) return;
        let editList = props.filter(p => p.propValue).map(p => {
            let prop = new ProductPropInfo();
            prop.shProductId = this.productId;
            prop.shPropertyId = p.id;
            prop.propValue = p.propValue;
            prop.description = p.productDesc;
            prop.attachmentVo = p.attachmentVo;
            return prop
        });
        const arr = [];
        editList.forEach(p => {
            let find = this.productProps.find(l => l.shPropertyId == p.shPropertyId);
            if (find) {
                find.propValue = p.propValue;
                find.description = p.description;
                find.attachmentVo = p.attachmentVo;
            } else {
                arr.push(p);
            }
        })
        this.productProps = this.productProps.concat(arr);
    }

    chooseGroup(group: GroupInfo) {

    }

    dropped(files: NgxFileDropEntry[], prop: PropertyVo) {
        if (files[0].fileEntry.isFile) {
            const fileEntry = files[0].fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
                if (!file.type.includes('image')) {
                    this.toastRepository.showDanger('Unsupported file types');
                    return;
                }
                prop.uploading = true;
                this.fileRepository.uploadFile('img', file).then(res => {
                    prop.uploading = false;
                    if (res.statusCode == 200) {
                        prop.attachmentVo = res.data[0];
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }


    saveProductProp() {
        this.dealEditProductProps(this.props);
        this.platformRepository.saveProductProp([...this.productProps]).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess('Submit Successfully.');
        })
    }
}

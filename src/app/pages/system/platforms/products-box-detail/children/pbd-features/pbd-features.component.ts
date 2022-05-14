import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {PlatformRepository} from "../../../../../../repository/platform-repository";
import {ProductInfo} from "../../../../../../model/po/productInfo";
import {PropertyVo} from "../../../../../../model/vo/PropertyVo";
import {Constants} from "../../../../../../model/constants";
import {ToastRepository} from "../../../../../../repository/toast-repository";
import {ConfigService} from "../../../../../../service/config.service";
import {Version} from "../../../../../../model/po/version";
import {ProductFormVo} from "../../../../../../model/vo/productFormVo";
import {VersionRepository} from "../../../../../../repository/version-repository";
import {GroupVo} from "../../../../../../model/vo/groupVo";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {FileRepository} from "../../../../../../repository/file-repository";
import {PropStatus} from "../../../../../../model/enums/prop-status";
import {FocusService} from "../../../../../../service/focus.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PreviewImageModalComponent} from "../../../modal/preview-image-modal/preview-image-modal.component";


@Component({
  selector: 'app-pbd-features',
  templateUrl: './pbd-features.component.html',
  styleUrls: ['./pbd-features.component.less']
})
export class PbdFeaturesComponent implements OnInit, OnDestroy {
  product: ProductInfo = new ProductInfo();
  version: Version = new Version();
  feature: ProductFormVo = new ProductFormVo();
  subGroup: GroupVo = new GroupVo();
  config = {...Constants.EDITOR_CONFIG};
  routerSubscription: any;
  activatedRouteSubscription: any;
  alreadyExpandList: Array<number> = []

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              public configService: ConfigService,
              private focusService: FocusService,
              private toastRepository: ToastRepository,
              private versionRepository: VersionRepository,
              private fileRepository: FileRepository,
              private platformRepository: PlatformRepository,
              private ngbModal: NgbModal) {
    this.config.editorplaceholder = 'What security measures are in place, e.g. ISO 27001 certification';
  }

  ngOnInit(): void {
    this.subscribe();
    this.init();
  }

  ngOnDestroy(): void {
    this.routerSubscription && this.routerSubscription.unsubscribe();
    this.activatedRouteSubscription && this.activatedRouteSubscription.unsubscribe();
  }


  init(): void {
    this.parseRouterParam();
    this.getVersion();
    this.getProductPropList();
  }

  expandItem(item: number): void {
    const idx = this.alreadyExpandList.indexOf(item)
    if (idx !== -1) {
      this.alreadyExpandList.splice(idx,1)
    } else {
      this.alreadyExpandList.push(item)
    }
  }

  subscribe(): void {
    this.routerSubscription = this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  getProductPropList(): void {
    const res = {"statusCode":200,"msg":"","url":null,"data":{"tabType":0,"subProductVos":null,"productVos":null,"groupVoList":[{"id":"dd722e94-05ab-4eef-9104-186db4feb45d","deleteFlag":false,"parentId":"","name":"test401","description":"<p>0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789</p>\n","tabType":4,"sort":1,"moveFlag":true,"status":"Normal","versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"subList":[{"id":"bd3dda87-a102-4425-be34-fb69c95945b1","deleteFlag":false,"parentId":"dd722e94-05ab-4eef-9104-186db4feb45d","name":"test401-01","description":"<p>\uD83D\uDE03\uD83D\uDE42</p>\n","tabType":4,"sort":1,"moveFlag":true,"status":"Normal","versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"propertyVoList":[{"id":"3f3e6f7f-3ec1-49d5-b3c1-51e714f6ee91","deleteFlag":false,"shGroupId":"bd3dda87-a102-4425-be34-fb69c95945b1","name":"test401-01-01Maximum 100 characters01234567890123456789012345678901234567890123456789012345678901234","description":"<p>\uD83D\uDE190123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789\uD83D\uDE36</p>\n","type":3,"tabType":4,"status":"Normal","sort":1,"moveFlag":true,"vsFlag":true,"bmFlag":true,"readOnly":false,"versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"productPropVo":{"id":"2889308c-0886-4fd6-a17a-5e6353105557","createUser":"","updateUser":"","createTime":"2022-05-03T17:10:04","updateTime":"2022-05-03T17:10:14","deleteFlag":false,"shProductId":"31ea0691-ab5b-11ec-82be-06744bd0c96e","shPropertyId":"3f3e6f7f-3ec1-49d5-b3c1-51e714f6ee91","propValue":"yes","description":"<p>gdfhfghdfg</p>\n","versionId":"cc3ac6f9-6cf9-4228-a914-ba3423a17d11","type":0}},{"id":"bb69744e-eea9-4729-adfd-a29f36ecae30","deleteFlag":false,"shGroupId":"bd3dda87-a102-4425-be34-fb69c95945b1","name":"test401-01-02","description":"<p>\uD83D\uDE0F</p>\n","type":3,"tabType":4,"status":"Normal","sort":2,"moveFlag":true,"vsFlag":true,"bmFlag":true,"readOnly":false,"versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"productPropVo":{"id":"fff0ac68-4345-4936-9122-7493639ad4b0","createUser":"","updateUser":"","createTime":"2022-05-03T17:10:18","updateTime":"2022-05-03T17:10:27","deleteFlag":false,"shProductId":"31ea0691-ab5b-11ec-82be-06744bd0c96e","shPropertyId":"bb69744e-eea9-4729-adfd-a29f36ecae30","propValue":"yes","description":"<p>dgdfhfghrtr</p>\n","versionId":"cc3ac6f9-6cf9-4228-a914-ba3423a17d11","type":0}},{"id":"bb045b49-3856-47f1-8530-f4104d109f4c","deleteFlag":false,"shGroupId":"bd3dda87-a102-4425-be34-fb69c95945b1","name":"test401-01-03","description":"<p>\uD83D\uDE3A</p>\n","type":3,"tabType":4,"status":"Normal","sort":3,"moveFlag":true,"vsFlag":true,"bmFlag":true,"readOnly":false,"versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"productPropVo":{"id":"34294300-723b-46e3-a800-af160590b765","createUser":"","updateUser":"","createTime":"2022-05-03T17:10:29","updateTime":"2022-05-03T17:10:39","deleteFlag":false,"shProductId":"31ea0691-ab5b-11ec-82be-06744bd0c96e","shPropertyId":"bb045b49-3856-47f1-8530-f4104d109f4c","propValue":"yes","description":"<p>dfhdtfghyughn</p>\n","versionId":"cc3ac6f9-6cf9-4228-a914-ba3423a17d11","type":0}},{"id":"c3342e14-2b16-4d01-8442-12dd93234bc0","deleteFlag":false,"shGroupId":"bd3dda87-a102-4425-be34-fb69c95945b1","name":"test401-01-03","description":"<p>buhuizidongfabu</p>\n","type":3,"tabType":4,"status":"Insert","sort":4,"moveFlag":true,"vsFlag":true,"bmFlag":true,"readOnly":false,"versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"productPropVo":{"id":"e92fffd4-0c7e-4982-be6f-1939f0318d31","createUser":"","updateUser":"","createTime":"2022-05-09T18:47:20","updateTime":"2022-05-09T18:47:31","deleteFlag":false,"shProductId":"31ea0691-ab5b-11ec-82be-06744bd0c96e","shPropertyId":"c3342e14-2b16-4d01-8442-12dd93234bc0","propValue":"yes","description":"<p>zhelixinzengle</p>\n","versionId":"cc3ac6f9-6cf9-4228-a914-ba3423a17d11","type":0}}]},{"id":"67b92e1f-9f7a-42e3-8d63-6f9bc58de7f9","deleteFlag":false,"parentId":"dd722e94-05ab-4eef-9104-186db4feb45d","name":"test401-02","description":"<p>\uD83D\uDE0D\uD83D\uDC69&zwj;⚕️\uD83D\uDC68&zwj;\uD83D\uDE80</p>\n","tabType":4,"sort":2,"moveFlag":true,"status":"Normal","versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"propertyVoList":[{"id":"96936245-ec08-4915-a235-442dea0ccbd1","deleteFlag":false,"shGroupId":"67b92e1f-9f7a-42e3-8d63-6f9bc58de7f9","name":"test401-02-01","description":"<p>\uD83D\uDC69&zwj;\uD83D\uDE80</p>\n","type":3,"tabType":4,"status":"Normal","sort":1,"moveFlag":true,"vsFlag":true,"bmFlag":true,"readOnly":false,"versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"productPropVo":{"deleteFlag":false,"type":0}}]}],"propertyVoList":[]},{"id":"6ca0e5f4-264e-4de8-ae94-fdd10b0c8a0b","deleteFlag":false,"parentId":"","name":"test402Maximum 100 characters01234567890123456789012345678901234567890123456789012345678901234567890","description":"<p>chaochang</p>\n","tabType":4,"sort":2,"moveFlag":true,"status":"Normal","versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"subList":[{"id":"b6312094-00fa-4606-b8a2-88cd4c2e623e","deleteFlag":false,"parentId":"6ca0e5f4-264e-4de8-ae94-fdd10b0c8a0b","name":"test402-01","description":"<p>\uD83D\uDE020123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789<br />\n0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789\uD83D\uDE0D</p>\n","tabType":4,"sort":1,"moveFlag":true,"status":"Normal","versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"propertyVoList":[{"id":"0cd4be12-85e1-4cc8-b9a0-8af34dd7e125","deleteFlag":false,"shGroupId":"b6312094-00fa-4606-b8a2-88cd4c2e623e","name":"test402-01-01","description":"<p>\uD83E\uDDD9</p>\n","type":3,"tabType":4,"status":"Normal","sort":1,"moveFlag":true,"vsFlag":true,"bmFlag":true,"readOnly":false,"versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"productPropVo":{"id":"131aeeac-2006-41c3-9d6c-f1531aad3006","createUser":"","updateUser":"","createTime":"2022-05-03T17:11:02","updateTime":"2022-05-03T17:11:15","deleteFlag":false,"shProductId":"31ea0691-ab5b-11ec-82be-06744bd0c96e","shPropertyId":"0cd4be12-85e1-4cc8-b9a0-8af34dd7e125","propValue":"yes","description":"<p>fgsdrvbdth</p>\n","versionId":"cc3ac6f9-6cf9-4228-a914-ba3423a17d11","type":0}}]},{"id":"5c034feb-3c21-4677-84a0-a1a269291196","deleteFlag":false,"parentId":"6ca0e5f4-264e-4de8-ae94-fdd10b0c8a0b","name":"test402-02","description":"<ul>\n\t<li>\uD83D\uDE0A</li>\n\t<li>\uD83D\uDEB6&zwj;♂️</li>\n\t<li>\uD83D\uDEB6&zwj;♀️</li>\n\t<li>\uD83E\uDDD6&zwj;♀️</li>\n\t<li>\uD83D\uDC68</li>\n\t<li>\uD83E\uDD39&zwj;♀️</li>\n\t<li>\uD83E\uDDD7&zwj;♀️</li>\n\t<li>\uD83D\uDEA3&zwj;♂️</li>\n\t<li>\uD83D\uDC69&zwj;\uD83D\uDC66</li>\n</ul>\n","tabType":4,"sort":2,"moveFlag":true,"status":"Normal","versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"propertyVoList":[{"id":"143b7d58-83ba-416c-9efd-798f9717bf5c","deleteFlag":false,"shGroupId":"5c034feb-3c21-4677-84a0-a1a269291196","name":"test402-02-01","description":"<p>\uD83D\uDCA9\uD83D\uDDE3</p>\n","type":3,"tabType":4,"status":"Normal","sort":1,"moveFlag":true,"vsFlag":true,"bmFlag":true,"readOnly":false,"versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"productPropVo":{"id":"0b233875-e183-4253-af16-f082409d4137","createUser":"","updateUser":"","createTime":"2022-05-03T17:11:18","updateTime":"2022-05-03T17:11:22","deleteFlag":false,"shProductId":"31ea0691-ab5b-11ec-82be-06744bd0c96e","shPropertyId":"143b7d58-83ba-416c-9efd-798f9717bf5c","propValue":"yes","description":"<p>gfjfdgbdtujn</p>\n","versionId":"cc3ac6f9-6cf9-4228-a914-ba3423a17d11","type":0}}]}],"propertyVoList":[]},{"id":"94e089e4-007b-4132-b4d1-19a2fa960d90","deleteFlag":false,"parentId":"","name":"test403","description":"<p>\uD83D\uDE01\uD83D\uDE1A\uD83E\uDD28</p>\n","tabType":4,"sort":3,"moveFlag":true,"status":"Normal","versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"subList":[{"id":"abd3b02c-d3fa-45bf-9db1-560be957fcfd","deleteFlag":false,"parentId":"94e089e4-007b-4132-b4d1-19a2fa960d90","name":"test403-01-Maximum 100 characters0123456789012345678901234567890123456789012345678901234567890123456","description":"<p>\uD83D\uDC75\uD83E\uDDDA&zwj;♀️</p>\n","tabType":4,"sort":1,"moveFlag":true,"status":"Normal","versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"propertyVoList":[{"id":"572e7595-7939-43cd-96fd-2f87edf52ad5","deleteFlag":false,"shGroupId":"abd3b02c-d3fa-45bf-9db1-560be957fcfd","name":"test403-01-01","description":"<p>\uD83E\uDDD2</p>\n","type":3,"tabType":4,"status":"Normal","sort":1,"moveFlag":true,"vsFlag":true,"bmFlag":true,"readOnly":false,"versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"productPropVo":{"id":"0f98705e-aeb0-4a33-bc41-56b15a99da61","createUser":"","updateUser":"","createTime":"2022-05-03T17:11:26","updateTime":"2022-05-03T17:11:26","deleteFlag":false,"shProductId":"31ea0691-ab5b-11ec-82be-06744bd0c96e","shPropertyId":"572e7595-7939-43cd-96fd-2f87edf52ad5","propValue":"yes","versionId":"cc3ac6f9-6cf9-4228-a914-ba3423a17d11","type":0}}]},{"id":"03937fa5-25d5-46fa-a9f7-f477ee1d4179","deleteFlag":false,"parentId":"94e089e4-007b-4132-b4d1-19a2fa960d90","name":"test403-02","description":"<p>Describe this feature so that it can be better understood by Advisors and Suppliers. This will appear as a tool tip</p>\n","tabType":4,"sort":2,"moveFlag":true,"status":"Normal","versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"propertyVoList":[{"id":"954a161a-719d-4c61-ba33-80e88877abd3","deleteFlag":false,"shGroupId":"03937fa5-25d5-46fa-a9f7-f477ee1d4179","name":"test403-02-01","description":"<p>\uD83D\uDC68&zwj;\uD83C\uDFA4</p>\n","type":3,"tabType":4,"status":"Normal","sort":1,"moveFlag":true,"vsFlag":true,"bmFlag":true,"readOnly":false,"versionId":"53fdf946-8c9e-41cb-a922-58eeb1bfc4c5","newSort":0,"productPropVo":{"id":"0be77ffb-64d2-4558-987f-d0f24a19942b","createUser":"","updateUser":"","createTime":"2022-05-03T17:11:33","updateTime":"2022-05-03T17:11:39","deleteFlag":false,"shProductId":"31ea0691-ab5b-11ec-82be-06744bd0c96e","shPropertyId":"954a161a-719d-4c61-ba33-80e88877abd3","propValue":"yes","description":"<p>dfgsetvsh</p>\n","versionId":"cc3ac6f9-6cf9-4228-a914-ba3423a17d11","type":0}}]}],"propertyVoList":[]}],"propertyVoList":null,"comparisonProductVoList":null}}
    this.feature = Object.assign(this.feature, res.data);
    if (this.feature && this.feature.groupVoList && this.feature.groupVoList.length > 0) {
      if (this.feature.groupVoList[0].subList && this.feature.groupVoList[0].subList.length > 0)
        this.chooseSubGroup(this.feature.groupVoList[0].subList[0]);
    }
  }

  getVersion() {
    if (this.version.id == Constants.VERSION) {
      return;
    }
    this.versionRepository.versionById(this.version.id).subscribe(res => {
      this.version = res.data || this.version;
      this.configService.currentVersion = res.data || this.version
    });
  }

  parseRouterParam(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(res => {
      this.product.id = res['productId'];
      this.version.id = res[Constants.VERSION];
    })
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
            prop.productPropVo.attachmentVo = res.data[0];
            this.saveProp(prop);
          }
        });
      });
    } else {
      this.toastRepository.showDanger('Unsupported file types');
    }
  }

  focus() {
    this.focusService.addFocus();
  }

  saveProp(prop: PropertyVo): void {
    this.focusService.deleteFocus();
    let productProp = {...prop.productPropVo};
    productProp.shProductId = this.product.id;
    productProp.shPropertyId = prop.id;
    this.platformRepository.saveProductProp(productProp).subscribe(res => {
      prop.productPropVo = res.data;
    })
  }

  groupDotFlag(group: GroupVo): boolean {
    if (!group.subList || group.subList.length == 0) {
      return false;
    }
    for (const subGroup of group.subList) {
      if (this.subGroupDotFlag(subGroup)) {
        return true;
      }
    }
    return false;
  }

  subGroupDotFlag(subGroup: GroupVo): boolean {
    if (!subGroup.propertyVoList || subGroup.propertyVoList.length == 0) {
      return false;
    }
    return subGroup.propertyVoList.some(p => p.status != PropStatus.Normal.value);
  }


  chooseSubGroup(group: GroupVo) {
    console.log('group ', group)
    this.subGroup = group;
  }

  previewImage(imgUrl: string): void {
    const modalRef = this.ngbModal.open(PreviewImageModalComponent, {
      size: 'w644',
      windowClass: 'tip-popup-modal',
      centered: true
    });
    modalRef.componentInstance.imgUrl = imgUrl
  }

  showPic(val): void {

  }
}

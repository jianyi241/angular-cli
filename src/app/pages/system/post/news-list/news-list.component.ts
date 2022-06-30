import { Component, OnInit } from '@angular/core';
import {CreatePostModalComponent} from "../modal/create-post-modal/create-post-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CurrentUserService} from "../../../../service/current-user.service";
import {PostRepository} from "../../../../repository/post-repository";
import {PostCondition} from "../../../../model/condition/post-condition";
import {Page} from "../../../../model/vo/page";
import PostInfo from "../../../../model/po/postInfo";
import {ToastRepository} from "../../../../repository/toast-repository";
import {PostService} from "../../../../service/post.service";
import {PostStatus} from "../../../../model/enums/post-status";
import {PostType} from "../../../../model/enums/post-type";
import {Commons} from "../../../../utils/Commons";
import {PlatformRepository} from "../../../../repository/platform-repository";

interface ConditionOptionsGroup {
  name: string,
  key: string,
  options: Array<{label: string, value: string, checked: boolean}>
}

@Component({
  selector: 'app-post-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.less']
})
export class NewsListComponent implements OnInit {
  postCondition: PostCondition = new PostCondition(1,10);
  page: Page<PostInfo> = new Page<PostInfo>();
  pageLoading: boolean = false;
  expandedList: Array<number> = new Array<number>();
  conditionOptions: Array<ConditionOptionsGroup> = [
    {
      key: 'platforms',
      name: 'Products',
      options: [
        {
          label: 'All',
          value: '',
          checked: false
        },
        {
          label: 'BT Panorama',
          value: '',
          checked: false
        }
      ]
    },
    {
      key: 'types',
      name: 'Type',
      options: [
        {
          label: 'All',
          value: '',
          checked: false
        },
        {
          label: PostType.GeneralPost.name,
          value: PostType.GeneralPost.value,
          checked: false
        },
        {
          label: PostType.PlatformUpdates.name,
          value: PostType.PlatformUpdates.value,
          checked: false
        }
      ]
    },
    {
      key: 'status',
      name: 'Status',
      options: [
        {
          label: 'All',
          value: '',
          checked: false
        },
        {
          label: PostStatus.Pending.name,
          value: PostStatus.Pending.value,
          checked: false
        },
        {
          label: PostStatus.Published.name,
          value: PostStatus.Published.value,
          checked: false
        },
        {
          label: PostStatus.Rejected.name,
          value: PostStatus.Rejected.value,
          checked: false
        }
      ]
    }
  ]

  constructor(public ngbModal: NgbModal,
              public postService: PostService,
              private currentUserService: CurrentUserService,
              private toastRepository: ToastRepository,
              private postRepository: PostRepository,
              private platformRepository: PlatformRepository) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.getPostPageList();
    this.getGroupOptions()
  }

  expandOptions(idx: number): void {
    const includesIndex = this.expandedList.indexOf(idx);
    if (includesIndex !== -1) {
      this.expandedList.splice(includesIndex, 1);
    } else {
      this.expandedList.push(idx);
    }
  }

  searchList(): void {
    this.postCondition.current = 1;
    this.page.records = [];
    this.getPostPageList();
  }

  getPostPageList(): void {
    if (this.postCondition.current > this.page.pages) {
      this.postCondition.current--;
      // this.toastRepository.showDanger('No more data.');
      return;
    }
    if (this.currentUserService.isSupplierUser() && this.currentUserService.currentUser().owner) {
      this.postCondition.companyId = this.currentUserService.currentUser().companyId;
    }
    this.pageLoading = true;
    this.postRepository.getPostPageList(this.postCondition).subscribe(res => {
      this.pageLoading = false;
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg || 'get data list failed.');
        return;
      }
      if (this.page.searchCount) {
        this.page.records.push(...res.data.records);
        return;
      }
      this.page = res.data;
    })
  }

  getGroupOptions(): void {
    this.postRepository.getGroupOptions().subscribe(res => {
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg || 'get feature groups failed.')
        return
      }
      this.conditionOptions.push({
        key: 'groups',
        name: 'Feature groups',
        options: res.data.map(i => {
          return {
            label: i.name,
            value: i.name,
            checked: false
          }
        })
      })
      console.log('conditionOptions --> ', this.conditionOptions)
    })
  }

  getPlatformOptions(): void {
    const companyId = this.currentUserService.currentUser().companyId;
    this.platformRepository.getPlatformOptions(companyId).subscribe(res => {
    })
  }

  getUserType(role: string): string {
    if (this.currentUserService.isAdminUser()) {
      return 'admin';
    } else if (this.currentUserService.isSupplierUser() && this.currentUserService.currentUser().owner) {
      return 'supplierOwner';
    } else if (this.currentUserService.isSupplierUser() && !this.currentUserService.currentUser().owner) {
      return 'supplier';
    }
  }

  showCreatePostModal(): void {
    const modalRef = this.ngbModal.open(CreatePostModalComponent, {
      size: 'w644',
      windowClass: 'tip-popup-modal',
      centered: true
    });
  }

  nextPage(): void {
    this.postCondition.current++
    this.getPostPageList()
  }

  conditionOptionsChange(): void {
    const _conditionOptions = Commons.deepCopy(this.conditionOptions)
    _conditionOptions.map(m => {
      if (m.options.some(s => s.label === 'All' && s.checked)) {
        m.options = []
      }
      return m
    })
    _conditionOptions.forEach(i => this.postCondition[i.key] = i.options.filter(f => f.checked).map(v => v.value))
    this.searchList()
  }
}

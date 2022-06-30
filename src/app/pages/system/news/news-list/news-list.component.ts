import { Component, OnInit } from '@angular/core';
import {CreatePostModalComponent} from "../modal/create-post-modal/create-post-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CurrentUserService} from "../../../../service/current-user.service";
import {PostRepository} from "../../../../repository/post-repository";
import {PostCondition} from "../../../../model/condition/post-condition";
import {Page} from "../../../../model/vo/page";
import PostInfo from "../../../../model/po/postInfo";
import {ToastRepository} from "../../../../repository/toast-repository";

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
  postCondition: PostCondition = new PostCondition(1,10);
  page: Page<PostInfo> = new Page<PostInfo>();
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

  constructor(public ngbModal: NgbModal,
              private currentUserService: CurrentUserService,
              private toastRepository: ToastRepository,
              private postRepository: PostRepository) { }

  ngOnInit(): void {
    this.getPostPageList()
  }

  expandOptions(idx: number) {
    const includesIndex = this.expandedList.indexOf(idx)
    if (includesIndex !== -1) {
      this.expandedList.splice(includesIndex, 1)
    } else {
      this.expandedList.push(idx)
    }
  }

  searchList(): void {

  }

  getPostPageList(): void {
    this.postRepository.getPostPageList(this.postCondition).subscribe(res => {
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg || 'get data list failed.')
        return
      }
      console.log('getPostPageList ===> ', res.data)
    })
  }

  getUserType(): string {
    if (this.currentUserService.isAdminUser()) {
      return 'admin'
    } else if (this.currentUserService.isSupplierUser() && this.currentUserService.currentUser().owner) {
      return 'supplierOwner'
    } else if (this.currentUserService.isSupplierUser() && !this.currentUserService.currentUser().owner) {
      return 'supplier'
    }
  }


  showCreatePostModal(): void {
    const modalRef = this.ngbModal.open(CreatePostModalComponent, {
      size: 'w644',
      windowClass: 'tip-popup-modal',
      centered: true
    });
  }

  nextPage() {
    console.log('is bottom 0...')
  }
}

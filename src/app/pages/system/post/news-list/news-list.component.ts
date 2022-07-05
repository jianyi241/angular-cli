import {Component, OnInit} from '@angular/core'
import {CreatePostModalComponent} from "../modal/create-post-modal/create-post-modal.component"
import {NgbModal} from "@ng-bootstrap/ng-bootstrap"
import {CurrentUserService} from "../../../../service/current-user.service"
import {PostRepository} from "../../../../repository/post-repository"
import {PostCondition} from "../../../../model/condition/post-condition"
import {Page} from "../../../../model/vo/page"
import PostInfo from "../../../../model/po/postInfo"
import {ToastRepository} from "../../../../repository/toast-repository"
import {PostService} from "../../../../service/post.service"
import {PostStatus} from "../../../../model/enums/post-status"
import {PostType} from "../../../../model/enums/post-type"
import {Commons} from "../../../../utils/Commons"
import {PlatformRepository} from "../../../../repository/platform-repository"
import $ from 'jquery'
import {ConfirmModalComponent} from "../../modal/confirm-modal/confirm-modal.component"

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
  postCondition: PostCondition = new PostCondition(1,10)
  page: Page<PostInfo> = new Page<PostInfo>()
  pageLoading: boolean = false
  dropdownExpandedList = [0,1,2,3]
  featureExpandedList = []
  recordFinally: boolean = false

  conditionOptions: Array<ConditionOptionsGroup> = [
    {
      key: 'platforms',
      name: 'Products',
      options: [
        {
          label: 'All',
          value: '',
          checked: true
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
          checked: true
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
          checked: true
        },
        {
          label: PostStatus.Published.name,
          value: PostStatus.Published.value,
          checked: true
        },
        {
          label: PostStatus.Rejected.name,
          value: PostStatus.Rejected.value,
          checked: false
        },
        {
          label: 'Deleted',
          value: PostStatus.Archive.value,
          checked: false
        }
      ]
    },
    {
      key: 'groups',
      name: 'Feature groups',
      options: [
        {
          label: 'All',
          value: '',
          checked: true
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
    this.init()
  }

  init(): void {
    // this.getPostPageList()
    this.conditionOptionsChange()
    this.getGroupOptions()
    this.getPlatformOptions()
  }

  expandOptions(idx: number): void {
    const includesIndex = this.dropdownExpandedList.indexOf(idx)
    if (includesIndex !== -1) {
      this.dropdownExpandedList.splice(includesIndex, 1)
    } else {
      this.dropdownExpandedList.push(idx)
    }
  }

  searchList(): void {
    this.postCondition.current = 1
    this.recordFinally = false
    this.page = new Page<PostInfo>()
    this.getPostPageList()
  }

  getPostPageList(): void {
    if (this.postCondition.current > this.page.pages) {
      this.postCondition.current--
      this.recordFinally = true
      return
    }
    if (this.currentUserService.isSupplierUser() && this.currentUserService.currentUser().owner) {
      this.postCondition.companyId = this.currentUserService.currentUser().companyId
    }
    this.pageLoading = true
    this.postRepository.getPostPageList(this.postCondition).subscribe(res => {
      this.pageLoading = false
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg || 'get data list failed.')
        return
      }
      if (this.page.searchCount) {
        this.page.records.push(...res.data.records)
        setTimeout(() => {
          this.initTextEllipsis()
        }, 1000)
        return;
      }
      this.page = res.data
      setTimeout(() => {
        this.initTextEllipsis()
      }, 1000)
    })
  }

  getGroupOptions(): void {
    this.postRepository.getGroupOptions().subscribe(res => {
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg || 'get feature groups failed.')
        return
      }
      const idx = this.conditionOptions.findIndex(i => i.key === 'groups')
      const _options = res.data.map(i => {
        return {
          label: i.name,
          value: i.name,
          checked: false
        }
      })
      this.conditionOptions[idx].options.push(..._options)
    })
  }


  getPlatformOptions(): void {
    const companyId = this.currentUserService.currentUser().companyId
    this.platformRepository.getPlatformOptions(companyId).subscribe(res => {
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg || 'get platform options failed.')
        return
      }
      if (res.data && res.data.length) {
        const idx = this.conditionOptions.findIndex(i => i.key === 'platforms')
        const _options = res.data.map(i => {
          return {
            label: i.platformName,
            value: i.id,
            checked: false
          }
        })
        this.conditionOptions[idx].options.push(..._options)
      }
    })
  }

  changeStatus(status: string, idx: number): void {
    const post = Commons.deepCopy(this.page.records[idx])
    const params = {
      id: post.id,
      archived: post.archived,
      status: post.status
    }
    if (status === PostStatus.Archive.value) {
      params.archived = !post.archived
    } else {
      params.status = status
    }
    this.postRepository.updatePostStatus(params).subscribe(res => {
      if (res.statusCode != 200) {
        this.toastRepository.showDanger(res.msg || 'operation failed.')
        return
      }
      this.toastRepository.showSuccess('operation successfully.')
      this.page.records[idx].archived = params.archived
      this.page.records[idx].status = params.status
    })
  }

  deleteConfirm(idx: number): void {
    if (this.page.records[idx].archived) {
      this.changeStatus(PostStatus.Archive.value, idx)
      return
    }
    const modalRef = this.ngbModal.open(ConfirmModalComponent, {
      size: 'w644',
      windowClass: 'tip-popup-modal',
      centered: true
    })
    modalRef.componentInstance.modal = {
      title: 'Delete supplier’s post?',
      text: 'You are about to delete a supplier post. Are you sure about this action?',
      cancelText: 'No, don’t delete',
      confirmText: 'Yes, delete my post'
    }
    modalRef.result.then(res => {
      console.log('confirm')
      this.changeStatus(PostStatus.Archive.value, idx)
    }, err => {
      console.log('cancel')
    })
  }

  showCreatePostModal(idx: number = -1): void {
    const modalRef = this.ngbModal.open(CreatePostModalComponent, {
      size: 'w644',
      windowClass: 'tip-popup-modal',
      centered: true
    })
    if (idx != -1) {
      const post = Commons.deepCopy(this.page.records[idx])
      modalRef.componentInstance.postInfo = post
    }
    modalRef.result.then((data: PostInfo) => {
      if (!data) return
        if (idx == -1) {
          this.page.records.unshift(data)
        } else {
          this.page.records[idx] = data
        }
    },(err: any) => {})
  }

  nextPage(): void {
    this.postCondition.current++
    this.getPostPageList()
  }

  conditionOptionsChange(): void {
    const _conditionOptions = Commons.deepCopy(this.conditionOptions)
    _conditionOptions.map(m => {
      if (m.key === 'status') this.postCondition.archived = m.options.find(f => f.value === PostStatus.Archive.value).checked
      if (m.options.some(s => s.label === 'All' && s.checked)) m.options = []
      return m
    })
    _conditionOptions.forEach(i => this.postCondition[i.key] = i.options.filter(f => f.checked).map(v => v.value))
    this.searchList()
  }

  expandFeaturesTable(id: string): void {
    if (this.featureExpandedList.includes(id)) {
      let idx = this.featureExpandedList.findIndex(i => i == id)
      this.featureExpandedList.splice(idx, 1)
    } else {
      this.featureExpandedList.push(id)
    }
  }

  initTextEllipsis(): void {
    const textContentNodes: HTMLCollectionOf<Element> = document.getElementsByClassName('text-content')
    for (let i = 0; i < textContentNodes.length;i++) {
      const node = textContentNodes[i]
      console.log(node.scrollHeight ,'  -----   ', node.clientHeight)
      if (node.scrollHeight > node.clientHeight) {
        $(node).next().css('display','block')
      } else {
        $(node).next().css('display','none')
      }
    }
  }

  showMoreText(event: UIEvent): void {
    if ($(event.target).text() === 'Read more') {
      $(event.target).prev().css({
        'max-height': '2000px',
        '-webkit-line-clamp': 'unset'
      })
      $(event.target).text('Fold more')
    } else {
      $(event.target).prev().css({
        'max-height': '60px',
        '-webkit-line-clamp': '3'
      })
      $(event.target).text('Read more')
    }
  }
}

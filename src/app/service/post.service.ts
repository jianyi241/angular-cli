import {Injectable} from '@angular/core';
import {PostStatus} from "../model/enums/post-status";
import {PostType} from "../model/enums/post-type";
import {CurrentUserService} from "./current-user.service";

type EditType = 'create' | 'archive' | 'reject' | 'publish' | 'update' | ''

@Injectable({
    providedIn: 'root'
})
export class PostService {

    postStatus = {
        rejected: PostStatus.Rejected.value,
        published: PostStatus.Published.value,
        pending: PostStatus.Pending.value,
        archive: PostStatus.Archive.value
    }

    postType = {
        generalPost: PostType.GeneralPost.value,
        platformUpdates: PostType.PlatformUpdates.value
    }

    constructor(private currentUserService: CurrentUserService) {
    }

    allowEdit(companyId: string, status: string, editType: EditType = ''): boolean {
        if (this.currentUserService.isAdminUser()) {
            return true
        }
        if (this.currentUserService.isAdviceUser()) {
            return false
        }
        if (this.currentUserService.isSupplierUser()) {
            if (editType === 'publish' || editType === 'reject') return false
            if (editType === 'create') {
                return this.currentUserService.currentUser().owner
            } else {
                if (editType === 'update') {
                    return this.currentUserService.currentUser().owner && companyId === this.currentUserService.currentUser().companyId && status === PostStatus.Pending.value && status == PostStatus.Pending.value
                }
                return this.currentUserService.currentUser().owner && companyId === this.currentUserService.currentUser().companyId
            }
        }
    }

}

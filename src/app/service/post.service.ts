import {Injectable} from '@angular/core';
import {PostStatus} from "../model/enums/post-status";
import {PostType} from "../model/enums/post-type";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    postStatus = {
        rejected: PostStatus.Rejected.value,
        published: PostStatus.Published.value,
        pending: PostStatus.Pending.value
    }

    postType = {
        generalPost: PostType.GeneralPost.value,
        platformUpdates: PostType.PlatformUpdates.value
    }

    constructor() {
    }

}

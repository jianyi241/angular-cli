import {EnumIdentity} from "../interfaces/EnumIdentity";
export class PostStatus implements EnumIdentity {
    private static AllValues: Array<PostStatus> = new Array<PostStatus>();
    static readonly Rejected = new PostStatus('Rejected', "Rejected");
    static readonly Published = new PostStatus('Published', "Published");
    static readonly Pending = new PostStatus('Pending', "Pending");

    private constructor(public readonly value: string, public readonly name: string) {
        PostStatus.AllValues.push(this);
    }

    public static Values(): Array<PostStatus> {
        return PostStatus.AllValues;
    }
}

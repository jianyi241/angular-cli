import {EnumIdentity} from "../interfaces/EnumIdentity";
export class PostType implements EnumIdentity {
    private static AllValues: Array<PostType> = new Array<PostType>();
    static readonly GeneralPost = new PostType('General post', "General post");
    static readonly PlatformUpdates = new PostType('Platform updates', "Platform updates");

    private constructor(public readonly value: string, public readonly name: string) {
        PostType.AllValues.push(this);
    }

    public static Values(): Array<PostType> {
        return PostType.AllValues;
    }
}

import { ContentBlock } from "./trail-content-item-value-object";

export interface VideoContent {
    title: string;
    extension: string;
    location: string;
}

export class VideoContentItem implements ContentBlock<VideoContent> {
    public readonly idClassOrActivity: string;
    public readonly index: number;
    public readonly type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video' = 'video';
    public readonly content: VideoContent;
    public readonly upload: {
        status: "pending" | "uploaded" | "error";
        errorMessage?: string;
    };

    constructor(
        idClassOrActivity: string,
        index: number,
        content: VideoContent,
        upload: {
            id: string
            status: "pending" | "uploaded" | "error";
            errorMessage?: string;
        }
    ) {
        this.idClassOrActivity = idClassOrActivity;
        this.index = index;
        this.content = content;
        this.upload = upload
    }
}

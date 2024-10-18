import { ContentBlock } from "./trail-content-item-value-object";

export interface VideoContent {
    title: string;
    extension: string;
    binary: string;
}

export class VideoContentItem implements ContentBlock<VideoContent> {
    public readonly idClassOrActivity: string;
    public readonly index: number;
    public readonly type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video';
    public readonly content: VideoContent;
    public readonly upload: { 
        status: "pending" | "uploaded" | "error"; 
        errorMessage?: string; 
    };
    
    constructor(
        idClassOrActivity: string, 
        index: number,
        type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video', 
        content: VideoContent,
        upload: { 
            status: "pending" | "uploaded" | "error"; 
            errorMessage?: string; 
        }
    ) {
        this.idClassOrActivity = idClassOrActivity;
        this.index = index;
        this.type = type;
        this.content = content;
        this.upload = upload
    }
}

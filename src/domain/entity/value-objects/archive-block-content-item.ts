import { ContentBlock } from "./trail-content-item-value-object";

export interface ArchiveContent {
    title: string;
    extension: string;
    location: string;
}   

export class ArchiveContentItem implements ContentBlock<ArchiveContent> {
    public readonly idClassOrActivity: string;
    public readonly index: number;
    public readonly type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video' = 'file';
    public readonly content: ArchiveContent;
    public readonly upload: {
        status: 'pending' | 'uploaded' | 'error';
        errorMessage?: string;
    };
    
    constructor(
        idClassOrActivity: string, 
        index: number,
        content: ArchiveContent,
        upload: {
            status: 'pending' | 'uploaded' | 'error',
            errorMessage?: string
        }
    ) {
        this.idClassOrActivity = idClassOrActivity;
        this.index = index;
        this.content = content;
        this.upload = upload;   
    }
}

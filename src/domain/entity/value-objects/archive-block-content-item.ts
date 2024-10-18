import { ContentBlock } from "./trail-content-item-value-object";

export interface ArchiveContent {
    title: string;
    extension: string;
    binary: string;
}   

export class ArchiveContentItem implements ContentBlock<ArchiveContent> {
    public location: string = 'None'; 
    public readonly idClassOrActivity: string;
    public readonly index: number;
    public readonly type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video';
    public readonly content: ArchiveContent;
    public readonly upload: {
        status: 'pending' | 'uploaded' | 'error';
        errorMessage?: string;
    };
    
    constructor(
        idClassOrActivity: string, 
        index: number,
        type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video', 
        content: ArchiveContent,
        upload: {
            status: 'pending' | 'uploaded' | 'error',
            errorMessage?: string
        }
    ) {
        this.idClassOrActivity = idClassOrActivity;
        this.index = index;
        this.type = type;
        this.content = content;
        this.upload = upload;   
    }
}

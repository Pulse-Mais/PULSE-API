import { ContentBlock } from "./trail-content-item-value-object";

export class TextContentItem implements ContentBlock<string> {
    public readonly idClassOrActivity: string;
    public readonly index: number;
    public readonly type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video';
    public readonly content: string;
    public readonly upload: {
        status: 'pending' | 'uploaded' | 'error';
        errorMessage?: string;
    };
    
    constructor(
        idClassOrActivity: string, 
        index: number,
        content: string,
        upload: {
            status: 'pending' | 'uploaded' | 'error',
            errorMessage?: string
        }
    ) {
        this.idClassOrActivity = idClassOrActivity;
        this.index = index;
        this.type = "text";
        this.content = content;
        this.upload = upload;
    }
}   

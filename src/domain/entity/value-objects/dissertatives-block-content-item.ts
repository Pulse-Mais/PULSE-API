import { ContentBlock } from "./trail-content-item-value-object";


export interface DissertativeContent {
    questionPrompt: string;
    ExpectedAnswer: string;
}

export class DissertativeContentItem implements ContentBlock<DissertativeContent> { 
    public readonly idClassOrActivity: string;
    public readonly index: number;
    public readonly type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video';
    public readonly content: DissertativeContent;
    public readonly upload: {
        status: 'pending' | 'uploaded' | 'error';
        errorMessage?: string;
    };
    
    constructor(
        idClassOrActivity: string, 
        index: number,
        content: DissertativeContent,
        upload: {
            status: 'pending' | 'uploaded' | 'error',
            errorMessage?: string
        }
    ) {
        this.idClassOrActivity = idClassOrActivity;
        this.index = index;
        this.type = 'dissertative';
        this.content = content;
        this.upload = upload;   
    }
}   

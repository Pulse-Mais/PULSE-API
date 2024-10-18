import { ContentBlock } from "./trail-content-item-value-object";

export interface Alternative {
    alternativeText: string;
    isCorrect: boolean;
}

export interface AlternativesContent {
    questionPrompt: string;
    alternatives: Alternative[];
}

export class AlternativesContentItem implements ContentBlock<AlternativesContent> {
    public readonly idClassOrActivity: string;
    public readonly index: number;
    public readonly type: 'text' | 'file' | 'alternatives' | 'dissertative' | 'video';
    public readonly content: AlternativesContent;
    public readonly upload: {
        status: 'pending' | 'uploaded' | 'error';
        errorMessage?: string;
    };
    
    constructor(
        idClassOrActivity: string, 
        index: number,
        content: AlternativesContent,
        upload: {
            status: 'pending' | 'uploaded' | 'error',
            errorMessage?: string
        }
    ) {
        this.idClassOrActivity = idClassOrActivity;
        this.index = index;
        this.type = "alternatives";
        this.content = content;
        this.upload = upload;   
    }
}   

 

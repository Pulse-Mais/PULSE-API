import { ContentBlock } from "@/domain/entity/value-objects/trail-content-item-value-object";

export interface CreateTrailClassInputDTO {
    idTrail: string
    title: string;  
    type: "class" | "activity"; 
    duration: number; // hh:mm //  
    description: string;  
    content: ContentBlock<any>[];  
    files: any
}


interface ContentItem {
    index: number;  
    type: 'text' | 'file' | 'alternatives' | 'dissertative';  
    content: string; 
    alternatives?: Array<{ text: string; correct: boolean }>;  
}



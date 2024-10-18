import { ContentBlock } from "../value-objects/trail-content-item-value-object"


export interface CreateTrailClassInput {
    idTrail: string
    type: 'class' | 'activity'
    title: string
    description: string
    duration: number
}

export interface RestoreTrailClassInput {

    id: string
    idTrail: string

    title: string
 
    description: string
    duration: number
    
    contents: ContentBlock<any>[]
    status: "published" | "not-published"
    createdAt: Date
    updatedAt: Date
}


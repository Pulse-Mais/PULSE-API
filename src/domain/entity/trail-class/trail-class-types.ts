import { ContentValueObject } from "../value-objects/content-value-object"


export interface CreateTrailClassInput {
    idTrail: string
    trailStorageKey: string,
    title: string
    description: string
    duration: number
    subtitle: string
}

export interface RestoreTrailClassInput {

    id: string
    idTrail: string

    title: string
    subtitle: string
    description: string
    duration: number
    
    trailClassStorageKey: string
    content: ContentValueObject
    status: "published" | "not-published"
    createdAt: Date
    updatedAt: Date
}


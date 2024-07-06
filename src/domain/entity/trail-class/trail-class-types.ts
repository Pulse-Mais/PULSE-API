import { ContentArchiveValueObject } from "../value-objects/content-archive-value-object"
import { ContentArticleValueObject } from "../value-objects/content-article-value-object"
import { ContentEmptyValueObject } from "../value-objects/content-empty-value-object"
import { ContentVideoValueObject } from "../value-objects/content-video-value-object"


export interface CreateTrailClassInput {
    idTrail: string
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
    
    content: ContentEmptyValueObject | ContentArticleValueObject | ContentVideoValueObject | ContentArchiveValueObject
    status: "published" | "not-published"
    createdAt: Date
    updatedAt: Date
}


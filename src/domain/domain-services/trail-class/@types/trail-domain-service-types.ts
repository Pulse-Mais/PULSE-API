import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity"
import { ContentArchiveValueObject } from "@/domain/entity/value-objects/content-archive-value-object"
import { ContentArticleValueObject } from "@/domain/entity/value-objects/content-article-value-object"
import { ContentEmptyValueObject } from "@/domain/entity/value-objects/content-empty-value-object"
import { ContentVideoValueObject } from "@/domain/entity/value-objects/content-video-value-object"


export interface CreateTrailClassDomainServiceInput {
    idTrail: string
    title: string
    subtitle: string
    description: string
    duration: number
}

export interface UpdateTrailClassDomainServiceInput {
    trailClass: TrailClass
    title?: string
    description?: string
    subtitle?: string
    duration?: number
}

export interface RestoreTrailClassDomainServiceInput {
    id: string
    idTrail: string

    title: string
    subtitle: string
    description: string
    duration: number
    content: ContentEmptyValueObject | ContentArchiveValueObject | ContentVideoValueObject | ContentArticleValueObject
    status: "published" | "not-published"

    createdAt: Date;
    updatedAt: Date;
}

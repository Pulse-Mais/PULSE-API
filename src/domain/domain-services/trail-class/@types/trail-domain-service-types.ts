import { Trail } from "@/domain/entity/trail/trail-entity"
import { Content } from "@/domain/entity/value-objects/content-value-object"

export interface CreateTrailClassDomainServiceInput {
    trail: Trail
    title: string
    subtitle: string
    description: string
    duration: number
}

export interface UpdateTrailClassDomainServiceInput {
    idTrailClass: string
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
    trailClassStorageKey: string
    content: Content
    status: "published" | "not-published"

    createdAt: Date;
    updatedAt: Date;
}

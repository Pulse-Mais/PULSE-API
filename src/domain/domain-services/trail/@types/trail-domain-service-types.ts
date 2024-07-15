import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity";
import { Trail } from "@/domain/entity/trail/trail-entity";


export interface CreateTrailInputDomainService {
    title: string
    subtitle: string
    description: string
}

export interface RestoreTrailInputDomainService {
    id: string;

    title: string
    subtitle: string
    description: string

    status: "published" | "not-published"
    trailClasses: TrailClass[]

    createdAt: Date;
    updatedAt: Date;
}

export interface GetTrailClassDomainServiceInput {
    trail: Trail
    idTrailClass: string
}

export interface UpdateTrailDomainServiceInput {
    trail: Trail
    title?: string
    subtitle?: string
    description?: string
}

export interface GetTrailClassesDomainServiceInput {
    trail: Trail
}

export interface GetPublishedTrailClassesDomainServiceInput {
    trail: Trail
}

export interface GetUnfilledTrailClassesDomainServiceInput {
    trail: Trail    
}

export interface GetFilledTrailClassesDomainServiceInput {
    trail: Trail
}

export interface GetTrailClassesByContentTypeDomainServiceInput {
    trail: Trail
    contentType: "ContentArchiveValueObject" | "ContentEmptyValueObject" | "ContentVideoValueObject" | "ContentArticleValueObject"
}
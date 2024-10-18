import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity"
import { RestoreTrailClassInput } from "@/domain/entity/trail-class/trail-class-types"


export interface CreateTrailClassDomainServiceInput {
    idTrail: string
    type: 'class' | 'activity'
    title: string
    description: string
    duration: number
}

export interface UpdateTrailClassDomainServiceInput {
    trailClass: TrailClass
    title?: string
    description?: string
    duration?: number
}

export interface RestoreTrailClassDomainServiceInput extends RestoreTrailClassInput  {
 
}

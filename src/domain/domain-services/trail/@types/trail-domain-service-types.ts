import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity";

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
    storageTrailKey: string;
    trailClasses: TrailClass[]

    createdAt: Date;
    updatedAt:Date;
}
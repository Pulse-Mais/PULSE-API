import { TrailClass } from '@/domain/entity/trail-class/trail-class-entity';
 


export interface CreateTrailInput {
    title: string
    subtitle: string
    description: string
}

export interface RestoreTrailInput {
    id: string;

    title: string
    subtitle: string
    description: string
    
    status: "published" | "not-published"
    storageTrailKey: string;
    trailClasses: TrailClass[]

    createdAt: Date;
    updatedAt: Date;
}

import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity";

export interface ReadPublishedTrailClassesUseCaseOutputDTO {
    trailClasses: TrailClass[];
}
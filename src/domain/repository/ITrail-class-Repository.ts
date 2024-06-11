import { TrailClass } from "../entity/trail-class/trail-class-entity";


export interface ITrailClassRepository {

    findById: (id: string) => Promise<TrailClass | null>
    findByTrailClassUploadId: (idUpload: string) => Promise<TrailClass | null>
    save: (c: TrailClass) => Promise<TrailClass>
    delete(trailClass: TrailClass): Promise<boolean>
    deleteById(id: string): Promise<boolean>
    listByTrail: (idTrail: string) => Promise<TrailClass[]>

}
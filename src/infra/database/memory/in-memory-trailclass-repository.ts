import { TrailClass } from "@/domain/domain-services/trail";
import { ITrailClassRepository } from "@/domain/repository/ITrail-class-Repository";


export class InMemoryTrailClassRepository implements ITrailClassRepository {

    async save(c: TrailClass): Promise<TrailClass> {
        console.log('savedddd', c)
        return c
    } 


    async delete(trailClass: TrailClass): Promise<boolean> {
        
        return true
    }
    
    async deleteById(id: string): Promise<boolean> {
        return true
    }
    async findById (id: string): Promise<TrailClass | null> {

        return null
    }

    async findByTrailClassUploadId(idUpload: string): Promise<TrailClass | null> {
        return null
    }  
    async listByTrail(idTrail: string): Promise<TrailClass[]> {
        return []
    }
}
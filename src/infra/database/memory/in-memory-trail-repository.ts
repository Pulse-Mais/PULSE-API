import { Trail } from "@/domain/entity/trail/trail-entity"
import { ITrailRepository } from "@/domain/repository/ITrail-Repository"


export class InMemoryTrailRepository implements ITrailRepository {

    async save(c: Trail): Promise<Trail> {
        console.log('savedddd', c)
        return c
    } 

    async delete(id: string): Promise<boolean>{
        return true
    }
    async list(): Promise<Trail[]>{
        return []
    }
    async listNotPublished(): Promise<Trail[]>{
        return []
    }
    async listPublished(): Promise<Trail[]>{
        return []
    }
    
    
    async deleteById(id: string): Promise<boolean> {
        return true
    }
    async findById (id: string): Promise<Trail | null> {
        const trail = Trail.create({
      
            title: 'Trail Teste',
            description: 'Descrição do Trail',
            subtitle: 'Subtítulo do Trail',
            
       
        })

        trail.setId(id)
        return trail
    }

    async findByTrailClassUploadId(idUpload: string): Promise<Trail | null> {
        return null
    }  
    async listByTrail(idTrail: string): Promise<Trail[]> {
        return []
    }
}
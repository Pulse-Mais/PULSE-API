import { TrailClass } from "../../src/domain/entity/trail-class/trail-class-entity";
import { Trail } from "../../src/domain/entity/trail/trail-entity";
import { ITrailClassRepository } from "../../src/domain/repository/ITrail-class-Repository";
import { ITrailRepository } from "../../src/domain/repository/ITrail-Repository";

interface TrailTable {
    id: string,
    title: string,
    description: string,
    subtitle: string,
    storageKey: string;
    status: "published" | "not-published",
    createAt: string,
    updateAt: string
}


export class InMemoryTrailRepository implements ITrailRepository {

    public trails: TrailTable[] = [
        {
            id: "c2b05078-4df0-4248-9e40-01026f8a3c71",
            title: "Trilha AAA",
            description: "Essa trilha tem o objetivo de ser um teste aaa",
            subtitle: "Trilha 1",
            storageKey: "trilhas/trail-c2b05078-4df0-4248-9e40-01026f8a3c71/",
            status: "published",
            createAt: "2022-10-10",
            updateAt: "2022-10-10"
        }
        
    ]

    constructor(private readonly courseRepository: ITrailClassRepository) { }

    async findById(id: string): Promise<Trail | null> {
        console.log("Chamou o find!", id, typeof id);
        
        if (typeof id !== 'string') {
            console.error('ID não é uma string:', id);
            return null;
        }
    
        console.log("Lista de trilhas:", this.trails);
        this.trails.forEach(trail => {
            console.log(`Comparando ${trail.id} com ${id}`);
        });
    
        const trailOrNull: TrailTable | undefined = this.trails.find(t => t.id.trim() === id.trim());
        console.log(trailOrNull);
        if (!trailOrNull) return null;
    
        const trailTrailClasss: TrailClass[] = await this.courseRepository.listByTrail(trailOrNull.id)
    
        const trailDomainEntity: Trail = Trail.restore({
            id: trailOrNull.id,
            title: trailOrNull.title,
            description: trailOrNull.description,
            subtitle: trailOrNull.subtitle,
            storageTrailKey: trailOrNull.storageKey,
            status: trailOrNull.status,
            courses: trailTrailClasss,
            createAt: trailOrNull.createAt,
            updateAt: trailOrNull.updateAt
        })
    
        return trailDomainEntity;
    }

    async save(trail: Trail) {

        if (!trail) throw new Error("AAAAAAAAAAAAA");

        let id = trail.getId()
        if (!id) throw new Error("AAAAAAAAAAAAA");

        let title = trail.getTitle()
        if (!title) throw new Error("AAAAAAAAAAAAA");

        let description = trail.getDescription()
        if (!description) throw new Error("AAAAAAAAAAAAA");

        let subtitle = trail.getSubtitle()
        if (!subtitle) throw new Error("AAAAAAAAAAAAA");

        let storageKey = trail.getStorageKey()
        if (!storageKey) throw new Error("AAAAAAAAAAAAA");

        let courses = trail.getTrailClasss();
        if (!courses) throw new Error("AAAAAAAAAAAAA");

        let status = trail.getStatus();
        if (!status) throw new Error("AAAAAAAAAAAAA");

        let createAt = String(trail.getCreatedAt())
        if (!createAt) throw new Error("AAAAAAAAAAAAA");

        let updateAt = String(trail.getUpdatedAt())
        if (!updateAt) throw new Error("AAAAAAAAAAAAA");


        const trailTableEntity: TrailTable = {
            id,
            title,
            description,
            subtitle,
            storageKey,
            status,
            createAt,
            updateAt
        }

        console.log("AAAAAAAAAAA")
        this.trails.push(trailTableEntity)
        console.log(this.trails)

        return trail
    }

    async list(): Promise<Trail[]> {
        let trails: Trail[] = []
        let rows = this.trails

        rows.forEach(row => {
            
        })
        

        return trails
    }

}
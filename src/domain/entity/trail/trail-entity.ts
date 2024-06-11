import { TrailClass } from "../trail-class/trail-class-entity";
import { TrailBase } from "./trail-base-entity";
import { CreateTrailInput, RestoreTrailInput } from "./trail-types";

export class Trail extends TrailBase {

    private constructor() {
        super();
    }
    
    public publish() {

        if (this.getTrailClasss().length < 1)  throw new Error("");

        if (this.getStatus() != "not-published") throw new Error("");

        this.setStatus("published")
    }

    public addTrailClass(course: TrailClass) {
        let courseIdTrail = course.getIdTrail()

        if (!courseIdTrail || courseIdTrail != this.getId()) {
            throw new Error("A aula não pertente a trilha.");
        }

        this.getTrailClasss().push(course)
    }

    public getTrailClassById(idTrailClass: string) {
        
        if (!idTrailClass) throw new Error("falta id trailclassss")

        const course = this.getTrailClasss().find(course => course.getId() === idTrailClass)

        if (!course) return null;

        return course
    }

    static create(input: CreateTrailInput): Trail {
        const dateNow = new Date().toLocaleDateString('pt-BR', {year: "numeric", month: "2-digit", day: "2-digit"}); 
        const trail = new Trail()
 
        trail.setId(crypto.randomUUID())
        trail.setStorageKey(`trilhas/trail-${trail.getId()}/`)
        trail.setTrailClasss([])
        trail.setStatus("not-published")

        trail.setTitle(input.title)
        trail.setSubtitle(input.subtitle)
        trail.setDescription(input.description)

        trail.setCreateAt(dateNow)
        trail.setUpdateAt(dateNow)
       
        return trail
    }


    static restore(input: RestoreTrailInput): Trail {
        const trail = new Trail() 

        trail.setId(input.id);
        trail.setStorageKey(input.storageTrailKey);

        trail.setTrailClasss(input.courses);
        trail.setStatus(input.status);

        trail.setTitle(input.title);
        trail.setSubtitle(input.subtitle);
        trail.setDescription(input.description);

        trail.setCreateAt(input.createAt);
        trail.setUpdateAt(input.updateAt);
        
        return trail
    }
}
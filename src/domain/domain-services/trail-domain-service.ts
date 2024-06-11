import { TrailClass } from "../entity/trail-class/trail-class-entity";
import { Trail } from "../entity/trail/trail-entity";

interface CreateInput {
    title: string
    subtitle: string
    description: string
}

interface RestoreInput {
    id: string;

    title: string
    subtitle: string
    description: string
    
    status: "published" | "not-published"
    storageTrailKey: string;
    courses: TrailClass[]

    createAt: string;
    updateAt: string;
}

export class TrailDomainService {

    constructor() { }

    createTrail(input: CreateInput): Trail {
        return Trail.create(input)
    }

    restoreTrail(input: RestoreInput) {
        return Trail.restore(input)
    }

    publishTrail(trail: Trail) {
        trail.publish()
        return trail
    }

}

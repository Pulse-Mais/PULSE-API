import { Trail } from "../../entity/trail/trail-entity";
import { CreateTrailInputDomainService, RestoreTrailInputDomainService } from "./@types/trail-domain-service-types";

export class TrailDomainService {

    constructor() { }

    createTrail(input: CreateTrailInputDomainService): Trail {
        return Trail.create(input)
    }

    restoreTrail(input: RestoreTrailInputDomainService) {
        return Trail.restore(input)
    }

    publishTrail(trail: Trail) {
        trail.publish()
        return trail
    }

}

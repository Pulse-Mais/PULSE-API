import { TrailClassAlreadyAddedOnTrailDomainException } from "@/domain/domain-exception/trail-class-already-added-on-trail-domain-exception";
import { TrailClass } from "../trail-class/trail-class-entity";
import { TrailBaseEntity } from "./trail-base-entity";
import { CreateTrailInput, RestoreTrailInput } from "./trail-types";
import { TrailClassIsNotPartOfTheTrailDomainException } from "@/domain/domain-exception/trail-class-is-not-part-of-the-trail-domain-exception";
import { TrailDoesNotHaveEnoughClassesForPublicationDomainException } from "@/domain/domain-exception/trail-does-not-have-enough-classes-for-publication-domain-exception";
import { TrailAlreadyPublishedDomainException } from "@/domain/domain-exception/trail-already-published-domain-exception";
import crypto from 'crypto';
 

export class Trail extends TrailBaseEntity {

    private constructor() {
        super();
    }

    public publish() {

        const publishedTrailClasses = this.getTrailClasses().filter(c => c.getStatus() === "published")
        const hasEnoughTrailClassesToPublish = publishedTrailClasses.length > 0

        if (hasEnoughTrailClassesToPublish === false) {
            throw new TrailDoesNotHaveEnoughClassesForPublicationDomainException("trail-entity.ts", "100")
        }

        const isTrailAlreadyPublished = this.getStatus() !== "not-published"

        if (isTrailAlreadyPublished) {
            throw new TrailAlreadyPublishedDomainException("trail-entity.ts", "100")
        }

        this.setStatus("published")
    }

    public addTrailClass(trailClass: TrailClass) {

        if (this.getTrailClassById(`${trailClass.getId()}`)) {
            throw new TrailClassAlreadyAddedOnTrailDomainException("trail-entity.ts", "24")
        }

        const trailClassIdTrail = trailClass.getIdTrail()

        if (!trailClassIdTrail || trailClassIdTrail != this.getId()) {
            throw new TrailClassIsNotPartOfTheTrailDomainException("trail-entity.ts", "100")
        }

        this.getTrailClasses().push(trailClass)
    }

    public getTrailClassById(idTrailClass: string) {

        if (!idTrailClass) throw new Error("falta id trailclassses")

        const course = this.getTrailClasses().find(course => course.getId() === idTrailClass)

        if (!course) return null;

        return course
    }

    public updateTitle(newTitle: string) {
        if (newTitle !== this.getTitle()) {
            this.setTitle(newTitle)
            this.setUpdatedAt(new Date())
        }
    }

    public updateSubtitle(newSubtitle: string) {
        if (newSubtitle !== this.getSubtitle()) {
            this.setSubtitle(newSubtitle)
            this.setUpdatedAt(new Date())
        }
    }

    public updateDescription(newDescription: string) {

        if (newDescription !== this.getDescription()) {
            this.setDescription(newDescription)
            this.setUpdatedAt(new Date())
        }
    }

    static create(input: CreateTrailInput): Trail {
        const trail = new Trail()

        trail.setId(crypto.randomUUID())
        trail.setTrailClasses([])
        trail.setStatus("not-published")
        trail.setTitle(input.title)
        trail.setSubtitle(input.subtitle)
        trail.setDescription(input.description)
        trail.setCreatedAt(new Date())
        trail.setUpdatedAt(new Date())

        return trail
    }


    static restore(input: RestoreTrailInput): Trail {
        const trail = new Trail()

        trail.setId(input.id);
        trail.setTrailClasses(input.trailClasses);
        trail.setStatus(input.status);
        trail.setTitle(input.title);
        trail.setSubtitle(input.subtitle);
        trail.setDescription(input.description);
        trail.setCreatedAt(input.createdAt);
        trail.setUpdatedAt(input.updatedAt);

        return trail
    }
}
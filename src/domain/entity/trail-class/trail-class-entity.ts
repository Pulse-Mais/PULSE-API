import { InvalidTrailClassPropetyDomainException } from "@/domain/domain-exception/invalid-trail-class-propety-domain-exception";
import { Content, ContentValueObject } from "../value-objects/content-value-object"
import { TrailClassBaseEntity } from "./trail-class-base-entity"
import { CreateTrailClassInput, RestoreTrailClassInput } from "./trail-class-types"
import { ContentNotFilledDomainException } from "@/domain/domain-exception/content-not-filled-domain-exception";
import { ClassAlreadyPublishedDomainException } from "@/domain/domain-exception/class-already-published-domain-exception";
import { ContentTypeEmptyDomainException } from "@/domain/domain-exception/content-type-empty-domain-exception";

export class TrailClass extends TrailClassBaseEntity {

    private constructor() {
        super()
    }

    public static create(input: CreateTrailClassInput) {

        const trailClass = new TrailClass()

        trailClass.setId(crypto.randomUUID())
        trailClass.setIdTrail(input.idTrail)
        trailClass.setTrailClassStorageKey(`${input.trailStorageKey}trailClass-${trailClass.getId()}/`)
        trailClass.setTitle(input.title)
        trailClass.setSubtitle(input.subtitle)
        trailClass.setDescription(input.description)
        trailClass.setDuration(input.duration)
        trailClass.setStatus("not-published")
        trailClass.setContent(new Content(`${trailClass.getTrailClassStorageKey()}`, "empty", "empty", { id: "empty", status: "none" }))
        trailClass.setCreatedAt(new Date())
        trailClass.setUpdatedAt(new Date())

        return trailClass
    }

    public static restore(input: RestoreTrailClassInput) {

        const trailClass = new TrailClass()

        trailClass.setId(input.id)
        trailClass.setIdTrail(input.idTrail)
        trailClass.setTitle(input.title)
        trailClass.setSubtitle(input.subtitle)
        trailClass.setDescription(input.description)
        trailClass.setDuration(input.duration)
        trailClass.setTrailClassStorageKey(input.trailClassStorageKey)
        trailClass.setStatus(input.status)
        trailClass.setContent(input.content)
        trailClass.setCreatedAt(input.createdAt)
        trailClass.setUpdatedAt(input.updatedAt)

        return trailClass

    }


    public publish() {

        const status = this.getStatus()
        if (!status) {
            throw new InvalidTrailClassPropetyDomainException("trail-class-entity", "75", "status");
        };

        if (status !== "not-published") {
            throw new ClassAlreadyPublishedDomainException("trail-class-entity", "78")
        };

        const content = this.getContent()
        if (!content) {
            throw new InvalidTrailClassPropetyDomainException("trail-class-entity", "79", "content")
        };

        if (content.status !== "filled") {
            throw new ContentNotFilledDomainException("trail-class-entity", "84")
        };

        if (content.type === "empty") {
            throw new ContentTypeEmptyDomainException("trail-class-entity", "86");
        }

        this.setStatus("published")

    }

    public updateContent(input: ContentValueObject) {

        if (this.getStatus() === "published") {
            throw new ClassAlreadyPublishedDomainException(
                "trail-class-entity", 
                "75", 
                "Você não não pode alterar o conteúdo de uma aula já públicada!"
            )
        }

        this.setContent(new Content(input.key, input.type, input.status, input.upload))
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

    public updateDuration(newDuration: number) {
        if (newDuration !== this.getDuration()) {
            this.setDuration(newDuration)
            this.setUpdatedAt(new Date())
        }
    }



}
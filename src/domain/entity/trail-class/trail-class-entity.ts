import { InvalidTrailClassPropetyDomainException } from "@/domain/domain-exception/invalid-trail-class-propety-domain-exception";
import { Content, ContentValueObject } from "../value-objects/content-value-object"
import { Release, ReleaseValueObject } from "../value-objects/release-value-object";
import { TrailClassBaseEntity } from "./trail-class-base-entity"
import { CreateTrailClassInput, RestoreTrailClassInput, SetTrailClassContentInput } from "./trail-class-types"
import { ContentNotFilledDomainException } from "@/domain/domain-exception/content-not-filled-domain-exception";
import { ClassAlreadyPublishedDomainException } from "@/domain/domain-exception/class-already-published-domain-exception";
import { ContentTypeEmptyDomainException } from "@/domain/domain-exception/content-type-empty-domain-exception";
import { InvalidContentKeyDomainException } from "@/domain/domain-exception/invalid-content-key-domain-exception";
import { InvalidReleaseScheduleDomainException } from "@/domain/domain-exception/invalid-release-schedule-domain-exception";
import { InvalidReleaseStatusDomainException } from "@/domain/domain-exception/invalid-release-status-domain-exception";

export class TrailClass extends TrailClassBaseEntity {

    private constructor() {
        super()
    }

    public static create(input: CreateTrailClassInput) {

        const dateNow = new Date().toLocaleDateString('pt-BR', {year: "numeric", month: "2-digit", day: "2-digit"}); 
        const trailClass = new TrailClass()
        
        trailClass.setId(crypto.randomUUID())
        trailClass.setIdTrail(input.idTrail)
        trailClass.setTrailClassStorageKey(`${input.trailStorageKey}trailClass-${trailClass.getId()}/`)
        trailClass.setTitle(input.title)
        trailClass.setSubtitle(input.subtitle)
        trailClass.setDescription(input.description)
        trailClass.setStatus("not-published")
        trailClass.setRelease(new Release("locked", "empty"))
        trailClass.setContent(new Content(`${trailClass.getTrailClassStorageKey()}`, "empty", "empty", "empty", {id: "empty", status: "none"}))
        trailClass.setCreateAt(dateNow)
        trailClass.setUpdateAt(dateNow)

        return trailClass
    }

    public static restore(input: RestoreTrailClassInput) {

        const trailClass = new TrailClass()

        trailClass.setId(input.id) 
        trailClass.setIdTrail(input.idTrail)
        trailClass.setTitle(input.title)
        trailClass.setSubtitle(input.subtitle)
        trailClass.setDescription(input.description)
        trailClass.setTrailClassStorageKey(input.trailClassStorageKey)
        trailClass.setStatus(input.status)
        trailClass.setRelease(input.release)
        trailClass.setContent(input.content)
        trailClass.setCreateAt(input.createAt)
        trailClass.setUpdateAt(input.updateAt)

        return trailClass

    }

    public updateContent(input: ContentValueObject) {
        
        if (this.getStatus() === "published") {
            throw new Error("Não é possível alterar o conteúdo de uma aula já públicada!")
        }

        if (!input.key) throw new Error("aaaa");

        if (input.key === "empty") throw new Error("A key do objeto não pode ser vazia");

        if (input.key.length <= 10) throw new Error("A key é muito curta!");

        if (!input.type || input.type === "empty") throw new Error("O tipo do conteúdo não pode ser vazio!");
    
        if (!input.status) throw new Error("O conteúdo não possuí status!");
        
        this.setContent(new Content(input.key, input.type, input.format, input.status, input.upload))
    }

    public publish(releaseSchedule: ReleaseValueObject) {

        const status = this.getStatus()
        if (!status) throw new InvalidTrailClassPropetyDomainException("trail-class-entity", "75", "status");

        if (status !== "not-published") throw new ClassAlreadyPublishedDomainException("trail-class-entity", "78");

        const content = this.getContent()
        if (!content) throw new InvalidTrailClassPropetyDomainException("trail-class-entity", "79", "content");
        
        if (content.status !== "filled") throw new ContentNotFilledDomainException("trail-class-entity", "84");
        
        if (content.type === "empty") throw new ContentTypeEmptyDomainException("trail-class-entity", "86");

        if (content.key.length <= 20) throw new InvalidContentKeyDomainException("trail-class-entity", "90");
       
        const release = this.getRelease()
        if (!release) throw new InvalidTrailClassPropetyDomainException("trail-class-entity", "93", "release");

        if (release.schedule !== "empty") throw new InvalidReleaseScheduleDomainException("trail-class-entity", "95");
        if (release.status !== "locked") throw new InvalidReleaseStatusDomainException("trail-class-entity", "96");

        if (releaseSchedule.schedule === "empty") throw new Error("aaaa");
        if (releaseSchedule.status !== "locked") throw new Error("aaaa");
        if (typeof(releaseSchedule.schedule) !== Date()) throw new Error("aaaa");

        this.setRelease(releaseSchedule)
        this.setStatus("published")

    }

    public unlock() {

        if (this.getStatus() !== "published") {
            throw new Error("Não é possível liberar uma aula não publicada!");
        }

        const release = this.getRelease()
        if (!release) throw new Error("aaaa");

        this.setRelease(new Release("unlocked", release.schedule))
    }

    public updateTitle(newTitle: string) {
        if (newTitle !== this.getTitle()) {
            this.setTitle(newTitle)
            this.setUpdateAt(String(new Date()))
        }
    }

    public updateSubtitle(newSubtitle: string) {
        if (newSubtitle !== this.getSubtitle()) {
            this.setSubtitle(newSubtitle)
            this.setUpdateAt(String(new Date()))
        }
    }

    public updateDescription(newDescription: string) {

        if (newDescription !== this.getDescription()) {
            this.setDescription(newDescription)
            this.setUpdateAt(String(new Date()))
        }
    }



}
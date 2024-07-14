import { InvalidTrailClassPropetyDomainException } from "@/domain/domain-exception/invalid-trail-class-propety-domain-exception";
import { TrailClassBaseEntity } from "./trail-class-base-entity"
import { CreateTrailClassInput, RestoreTrailClassInput } from "./trail-class-types"
import { ContentNotFilledDomainException } from "@/domain/domain-exception/content-not-filled-domain-exception";
import { ClassAlreadyPublishedDomainException } from "@/domain/domain-exception/class-already-published-domain-exception";
import { ContentEmptyValueObject } from "../value-objects/content-empty-value-object";
import { ContentArchiveValueObject } from "../value-objects/content-archive-value-object";
import { ContentArticleValueObject } from "../value-objects/content-article-value-object";
import { ContentVideoValueObject } from "../value-objects/content-video-value-object";
import crypto from 'crypto';

export class TrailClass extends TrailClassBaseEntity {

    private constructor() {
        super()
    }

    public static create(input: CreateTrailClassInput) {

        const trailClass = new TrailClass()

        trailClass.setId(crypto.randomUUID())
        trailClass.setIdTrail(input.idTrail)
        trailClass.setTitle(input.title)
        trailClass.setSubtitle(input.subtitle)
        trailClass.setDescription(input.description)
        trailClass.setDuration(input.duration)
        trailClass.setStatus("not-published")
        trailClass.setContent(new ContentEmptyValueObject())
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
        trailClass.setStatus(input.status)
        trailClass.setCreatedAt(input.createdAt)
        trailClass.setUpdatedAt(input.updatedAt)

        if (input.content instanceof ContentArchiveValueObject) {
            trailClass.setArchiveTrailClassContent(input.content)
        }

        if (input.content instanceof ContentVideoValueObject) {
            trailClass.setVideoTrailClassContent(input.content)
        }

        if (input.content instanceof ContentArticleValueObject) {
            trailClass.setArticleTrailClassContent(input.content)
        }

        if (input.content instanceof ContentEmptyValueObject) {
            trailClass.setContent(input.content)
        }

        return trailClass
    }


    public publish() {

        const status = this.getStatus()
        if (!status) {
            throw new InvalidTrailClassPropetyDomainException("trail-class-entity", "75", "status");
        };

        if (status !== "not-published") {
            throw new ClassAlreadyPublishedDomainException("trail-class-entity", "78", `${status}`)
        };

        const content = this.getContent()
        if (!content) {
            throw new InvalidTrailClassPropetyDomainException("trail-class-entity", "79", "content")
        };

        if (content instanceof ContentEmptyValueObject) {
            throw new ContentNotFilledDomainException("trail-class-entity", "84")
        };

        if (content.status !== "filled") {
            throw new ContentNotFilledDomainException("trail-class-entity", "84")
        };

        this.setStatus("published")

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

    public cleanTrailClassContent() {

        if (this.getStatus() === "published") {
            throw new ClassAlreadyPublishedDomainException(
                "trail-class-entity", 
                "75", 
                "Você não não pode alterar o conteúdo de uma aula já públicada!"
            )
        }

        this.setContent(new ContentEmptyValueObject())
    }

    public setArchiveTrailClassContent(content: ContentArchiveValueObject) {
        const validPrefix = `trilhas/trail-${this.getIdTrail()}/trailClass-`
        const contentKey = content.key

        const idValidCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        const keyStartsWithValidPrefix = contentKey.startsWith(validPrefix)
        const keyLengthIsValid = contentKey.length >= 99

        if (!keyStartsWithValidPrefix) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "324",
                "content",
                `o prexifo da key é inválido.`
            )
        }

        if (!keyLengthIsValid) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O tamanho da key da aula é inválido.`
            )
        }

        const contentKeyParts = contentKey.split("/")
        const idTrailOnContentKeyParts = contentKeyParts[1].split("trail-")[1]
        const idTrailClassOnContentKeyParts = contentKeyParts[2].split("trailClass-")[1]

        const isValidIdTrailFormat = idValidCharacters.test(idTrailOnContentKeyParts)
        const isValidIdTrailClassFormat = idValidCharacters.test(idTrailClassOnContentKeyParts)

        if (!isValidIdTrailFormat) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O formato do id da trilha presente da key da aula é inválido.`
            )
        }

        if (!isValidIdTrailClassFormat) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O formato do id da aula presente da key da aula é inválido.`
            )
        }

        const isValidIdTrail = this.getIdTrail() === idTrailOnContentKeyParts
        const isValidIdTrailClass = this.getId() === idTrailClassOnContentKeyParts

        if (!isValidIdTrail) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O id da aula presente na key da aula não é igual ao id da aula.`
            )
        }

        if (!isValidIdTrailClass) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O id da aula presente na key da aula não é igual ao id da aula.`
            )
        }

        this.setContent(content)
    }

    // TO-DO: Incluir futuras validações  
    public setVideoTrailClassContent(content: ContentVideoValueObject) {
        this.setContent(content)
    }

    // TO-DO: Incluir futuras validações  
    public setArticleTrailClassContent(content: ContentArticleValueObject) {
        this.setContent(content)
    }

}

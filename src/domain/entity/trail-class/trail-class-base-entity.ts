import { InvalidTrailClassPropetyDomainException } from "@/domain/domain-exception/invalid-trail-class-propety-domain-exception";
import { ContentEmptyValueObject } from "../value-objects/content-empty-value-object";
import { ContentArticleValueObject } from "../value-objects/content-article-value-object";
import { ContentVideoValueObject } from "../value-objects/content-video-value-object";
import { ContentArchiveValueObject } from "../value-objects/content-archive-value-object";


export class TrailClassBaseEntity {
    private id?: string;
    private idTrail?: string
    private title?: string
    private subtitle?: string
    private description?: string
    private duration?: number
    private status?: "published" | "not-published"
    private content?: ContentEmptyValueObject | ContentArticleValueObject | ContentVideoValueObject | ContentArchiveValueObject;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor() { }

    public getId() {
        return this.id
    }

    public setId(id: string) {
        const validIdCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!validIdCharacters.test(id)) throw new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "35", "id")
        if (id.length < 36) throw new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "40", "id")

        this.id = id
    }

    public getIdTrail() {
        return this.idTrail
    }

    public setIdTrail(idTrail: string) {
        const validIdTrailCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!validIdTrailCharacters.test(idTrail)) throw new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "47", "idTrail")
        if (idTrail.length != 36) throw new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "51", "id")

        this.idTrail = idTrail
    }

    public getTitle() {
        return this.title;
    }

    public setTitle(title: string): void {
        if (!title) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "55",
                "title",
                "O título não pode ser vazio!"
            )
        }

        if (title.length < 5 || title.length > 70) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "62",
                "title",
                "O título deve ter entre 5 e 70 caracteres."
            )
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const hasInvalidCharacters = title.match(invalidCharacters);

        if (hasInvalidCharacters) {

            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "74",
                "title",
                `O título contém caracteres inválidos. \n Caracteres inválidos encontrados: ${hasInvalidCharacters}`
            )
        }

        if (/(\d{2,})/.test(title)) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "85",
                "title",
                `O título não pode conter sequências numéricas.`
            )
        }

        if (this.verifyIfContainsSwearsWords(title.toLowerCase())) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "85",
                "title",
                `O título contém palavras de baixo calão.`
            )
        }

        this.title = title;
    }


    public getSubtitle() {
        return this.subtitle;
    }

    public setSubtitle(subtitle: string): void {

        if (!subtitle) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "113",
                "subtitle",
                `O subtítulo não pode ser vazio!`
            )
        }

        if (subtitle.length < 5 || subtitle.length > 70) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "122",
                "subtitle",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const hasInvalidCharacters = subtitle.match(invalidCharacters);

        if (hasInvalidCharacters) {

            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "131",
                "subtitle",
                `O subtítulo contém caracteres inválidos. \n Caracteres inválidos encontrados: ${hasInvalidCharacters}`
            )
        }

        if (/(\d{2,})/.test(subtitle)) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "140",
                "subtitle",
                `O subtítulo não pode conter sequências numéricas.`
            )
        }

        if (this.verifyIfContainsSwearsWords(subtitle.toLowerCase())) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "149",
                "subtitle",
                `O subtítulo contém palavras de baixo calão.`
            )
        }

        this.subtitle = subtitle;
    }

    public getDescription() {
        return this.description
    }

    public setDescription(description: string): void {
        if (!description) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "166",
                "description",
                `A descrição não pode ser vazia!`
            )
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const hasInvalidCharacters = description.match(invalidCharacters);

        if (hasInvalidCharacters) {

            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "180",
                "description",
                `A descrição contém caracteres inválidos. \n Caracteres inválidos encontrados: ${hasInvalidCharacters}`
            )
        }

        if (/(\d{10,})/.test(description)) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "189",
                "description",
                `a descrição não pode conter sequências numéricas muito longas.`
            )
        }

        if (this.verifyIfContainsSwearsWords(description)) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "198",
                "description",
                `a descrição contém palavras de baixo calão.`
            )
        }

        this.description = description;
    }

    public getStatus() {
        return this.status
    }

    public setStatus(status: "published" | "not-published"): void {

        if (typeof status !== 'string' || !['published', 'not-published'].includes(status)) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "223",
                "status",
                `status inválido. Status: ${status}`
            )
        }

        if (this.getStatus() === "published" && status === "not-published") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "223",
                "status",
                `status inválido. Status: ${status}. Não é possível 'despublicar' uma aula já publicada.`
            )
        }

        if (status === "published" && this.getContent() === undefined) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "232",
                "status",
                `status inválido. O status não pode ser "published" se o conteúdo não for válido`
            )
        }

        if (status === "published" && this.getContent()?.status === "empty") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "status",
                `status inválido. O status não pode ser "published" se o conteúdo for vazio`
            )
        }

        if (status === "published" && this.getContent()?.status === "in-upload") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "status",
                `status inválido. O status não pode ser "published" se o conteúdo for vazio`
            )
        }

        if (status === "published" && this.getContent()?.type === "empty") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "status",
                `status inválido. O status não pode ser "published" se o conteúdo tipo do conteúdo for vazio`
            )
        }

        this.status = status;
    }

    public getDuration() {
        return this.duration
    }

    public setDuration(duration: number): void {
        if (!duration) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "140",
                "duration",
                "O tempo de duração de uma aula precisa ser igual ou maior a 1 minuto."
            )
        }

        if (duration > 30) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "140",
                "duration",
                `O tempo de duração de uma aula deve ser igual ou menor que 30 minutos.`
            )
        }

        if (duration === 0) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "140",
                "duration",
                "O tempo de duração de uma aula precisa ser igual ou maior a 1 minuto."
            )
        }

        this.duration = parseInt(duration.toString());
    }

    public getContent() {
        return this.content
    }

    public setContent(content: ContentEmptyValueObject | ContentArticleValueObject | ContentVideoValueObject | ContentArchiveValueObject) {
        if (!content) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula, com um conteúdo vazio, meu mano.`
            )
        }
        
        if (
            !(content instanceof ContentEmptyValueObject) &&
            !(content instanceof ContentArticleValueObject) &&
            !(content instanceof ContentVideoValueObject) &&
            !(content instanceof ContentArchiveValueObject)
        ) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "404",
                "content",
                "O tipo de conteúdo não é suportado."
            )
        }

        if (this.getStatus() === "published" && content.type === "empty") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula publicada, com o tipo do conteúdo vazio.`
            )
        }

        if (this.getStatus() === "published" && content.status === "empty") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula publicada, com o status do conteúdo como 'empty'.`
            )
        }

        if (this.getStatus() === "published" && content.status === "in-upload") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula publicada, com o status do conteúdo como 'in-upload'.`
            )
        }

        this.content = content
    }

    public getCreatedAt() {
        return this.createdAt
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    public getUpdatedAt() {
        return this.updatedAt;
    }

    public setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }


    private verifyIfContainsSwearsWords(str: string): boolean {

        const swearWords = ["caralho", "porra", "sexo", "piroca", "puta", "pinto", "buceta", "pênis", "cu"];

        const containsSwearWords: boolean = swearWords.some(swear => str.toLowerCase().split(' ').includes(swear));
        if (containsSwearWords) {
            return true
        }

        return false
    }

}
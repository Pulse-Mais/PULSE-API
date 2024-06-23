import { InvalidTrailClassPropetyDomainException } from "@/domain/domain-exception/invalid-trail-class-propety-domain-exception";
import { ContentValueObject } from "../value-objects/content-value-object";
import { ReleaseValueObject } from "../value-objects/release-value-object";


export class TrailClassBaseEntity {
    private id?: string;
    private idTrail?: string
    private title?: string
    private description?: string
    private subtitle?: string
    private status?: "published" | "not-published"
    private release?: ReleaseValueObject
    private trailClassStorageKey?: string;
    private content?: ContentValueObject;
    private createAt?: Date;
    private updateAt?: Date;

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

    public getRelease() {
        return this.release
    }

    public setRelease(release: ReleaseValueObject) {
        this.release = release
    }

    public getTrailClassStorageKey() {
        return this.trailClassStorageKey;
    }

    public setTrailClassStorageKey(key: string) {
        const idValidCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const validPrefix = `trilhas/trail-${this.getIdTrail()}/trailClass-`
         
        const keyStartsWithValidPrefix = key.startsWith(validPrefix)
        const keyLengthIsValid = key.length >= 99

        if (!keyStartsWithValidPrefix) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `o prexifo da key é inválido.`
            )
        }

        if (!keyLengthIsValid) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `O tamanho da key da aula é inválido.`
            )
        }

        const contentKeyParts = key.split("/")
        const idTrailOnContentKeyParts = contentKeyParts[1].split("trail-")[1]
        const idTrailClassOnContentKeyParts = contentKeyParts[2].split("trailClass-")[1]

        const isValidIdTrailFormat = idValidCharacters.test(idTrailOnContentKeyParts) 
        const isValidIdTrailClassFormat = idValidCharacters.test(idTrailClassOnContentKeyParts)

        if (!isValidIdTrailFormat) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `O formato do id da trilha presente da key da aula é inválido.`
            )
        }

        if (!isValidIdTrailClassFormat) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `O formato do id da aula presente da key da aula é inválido.`
            )
        }

        const isValidIdTrail = this.getIdTrail() === idTrailOnContentKeyParts
        const isValidIdTrailClass = this.getId() === idTrailClassOnContentKeyParts

        if (!isValidIdTrail) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `O id da aula presente na key da aula não é igual ao id da aula.`
            )
        }

        if (!isValidIdTrailClass) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `O id da aula presente na key da aula não é igual ao id da aula.`
            )
        }

        this.trailClassStorageKey = key;
    }

    public getContent() {
        return this.content
    }

    public setContent(content: ContentValueObject) {

        if (!content) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula, com um conteúdo vazio, meu mano.`
            )
        }

        const validPrefix = `trilhas/trail-${this.getIdTrail()}/trailClass-${this.getId()}/`
        const contentKey = content.key

        if (!contentKey) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula, com a key do conteúdo vazia.`
            )
        }

        if (contentKey.length < validPrefix.length) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `A key do conteúdo é muito curta.`
            )
        }

        const contentKeyParts = contentKey.split("/")
        const idTrailOnContentKeyParts = contentKeyParts[1].split("trail-")[1]
        const idTrailClassOnContentKeyParts = contentKeyParts[2].split("trailClass-")[1]

   
        if (this.getIdTrail() !== idTrailOnContentKeyParts) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O idTrail presente na key do conteúdo não é igual ao idTrail da aula.`
            )
        }

        if (this.getId() !== idTrailClassOnContentKeyParts) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O id da aula presente na key do conteúdo não é igual ao id da aula.`
            )
        }

        const contentType = content.type

        if (this.getStatus() === "published" && contentType === "empty") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula publicada, com o tipo do conteúdo vazio.`
            )
        }

        const contentStatus = content.status

        if (this.getStatus() === "published" && contentStatus === "empty") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula publicada, com o status do conteúdo como 'empty'.`
            )
        }

        if (this.getStatus() === "published" && contentStatus === "in-upload") {
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
        return this.createAt
    }

    public setCreateAt(createAt: string | Date): void {
        // if (!this.isValidDate(createAt)) {
        //     throw new Error("Data de criação inválida ou em formato incorreto.");
        // }

        if (typeof createAt === 'string') {
            const dateParts = createAt.split("/");
            this.createAt = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        } else {
            this.createAt = createAt;
        }

        if (isNaN(this.createAt.getTime())) {
            throw new Error("Data de criação inválida.");
        }
    }

    public getUpdatedAt() {
        return this.updateAt;
    }

    public setUpdateAt(updateAt: string | Date): void {
        // if (!this.isValidDate(updateAt)) {
        //     throw new Error("Data de atualização inválida ou em formato incorreto.");
        // }

        if (typeof updateAt === 'string') {
            const dateParts = updateAt.split("/");
            this.updateAt = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        } else {
            this.updateAt = updateAt;
        }

        if (isNaN(this.updateAt.getTime())) {
            throw new Error("Data de atualização inválida.");
        }
    }

    private isValidDate(dateStr: string): boolean {
        // const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        // return regex.test(dateStr);
        return true
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
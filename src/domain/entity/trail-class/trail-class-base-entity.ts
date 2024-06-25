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

    private courseStorageKey?: string;
    private content?: ContentValueObject;

    private createAt?: Date;
    private updateAt?: Date;
    

    constructor() { }

    public getId() {
        return this.id
    }

    public setId(id: string) {

        const validIdCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!validIdCharacters.test(id)) {
            throw new Error("Id inválido!")
        }

        if (id.length != 36) {
            throw new Error("Id inválido!")
        }

        this.id = id
    }

    public getIdTrail() {
        return this.idTrail
    }

    public setIdTrail(idTrail: string) {
        const validIdTrailCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!validIdTrailCharacters.test(idTrail)) {
            throw new Error("Id inválido!")
        }

        if (idTrail.length != 36) {
            throw new Error("Id inválido!")
        }

        this.idTrail = idTrail

    }

    public getTitle() {
        return this.title;
    }

    public setTitle(title: string) {
        console.log(title)
        const invalidCharacters = /[^a-zA-ZáéíóúÁÉÍÓÚàÀêÊôÔçÇüÜ -]/;

        if (invalidCharacters.test(title)) {
            throw new Error("O título contém números ou caracteres especiais inválidos.");
        }

        const containsSwearWords: boolean = this.verifyIfContainsSwearsWords(title)

        if (containsSwearWords) {
            throw new Error(`O título contém palavras de baixo calão. ${title}`);
        }

        this.title = title;
    }

    public getSubtitle() {
        return this.subtitle;
    }

    public setSubtitle(subtitle: string) {

        const invalidSubtitleCharacters = /[^a-zA-ZáéíóúÁÉÍÓÚàÀêÊôÔçÇüÜ0-9 -]/;

        if (invalidSubtitleCharacters.test(subtitle)) {
            throw new Error(`O subtítulo contém caracteres inválidos.  `);
        }

        const containsSwearWords: boolean = this.verifyIfContainsSwearsWords(subtitle)

        if (containsSwearWords) {
            throw new Error(`O subtítulo contém palavras de baixo calão. ${subtitle}`);
        }

        this.subtitle = subtitle
    }

    public getDescription() {
        return this.description
    }

    public setDescription(description: string) {

        // const invalidDescriptionCharacters = /[a-zA-ZáéíóúÁÉÍÓÚàÀâÂêÊôÔçÇüÜ0-9 \-~]/

        // if (invalidDescriptionCharacters.test(description)) {
        //     throw new Error("A descrição contém caracteres inválidos.");
        // }

        const containsSwearWords: boolean = this.verifyIfContainsSwearsWords(description)

        if (containsSwearWords) {
            throw new Error("A descrição contém palavras de baixo calão.");
        }

        this.description = description
    }

    public getStatus() {
        return this.status
    }

    public setStatus(status: "published" | "not-published"): void {

        if (typeof status !== 'string' || !['published', 'not-published'].includes(status)) {
            throw new Error(`status inválido`);
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
        return this.courseStorageKey;
    }

    public setTrailClassStorageKey(key: string) {

        if (key.length < 93) {
            throw new Error("A key da aula está incorreta!")
        }

        this.courseStorageKey = key
    }

    public getContent() {
        return this.content
    }

    public setContent(content: ContentValueObject) {
        console.log(content)
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
        console.log(str)
        const swearWords = ["caralho", "porra", "sexo", "piroca", "puta", "pinto", "buceta", "pênis", "cu"];

        const containsSwearWords: boolean = swearWords.some(swear => str.toLowerCase().split(' ').includes(swear));
        if (containsSwearWords) {
            return true
        }

        return false
    }

}
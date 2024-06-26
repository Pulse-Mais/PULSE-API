import { InvalidTrailDomainException } from "@/domain/domain-exception/invalid-trail-domain-exception";
import { TrailClass } from "../trail-class/trail-class-entity";

export class TrailBaseEntity {

    private id?: string;

    private title?: string;
    private description?: string;
    private subtitle?: string;

    private storageKey?: string;
    private status?: "published" | "not-published";

    private createAt?: Date;
    private updateAt?: Date;

    private trailClass: TrailClass[] = [];

    constructor() { }

    public getId(): string | undefined {
        return this.id;
    }

    public setId(id: string): void {

        const validIdCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!validIdCharacters.test(id)) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "55",
                "id"
            )
        }

        this.id = id;
    }

    public getTitle() {
        return this.title;
    }

    public setTitle(title: string): void {
        if (!title) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "55",
                "title",
                "O título não pode ser vazio!"
            )
        }

        if (title.length < 5 || title.length > 70) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "62",
                "title",
                "O título deve ter entre 5 e 70 caracteres."
            )
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const hasInvalidCharacters = title.match(invalidCharacters);

        if (hasInvalidCharacters) {

            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "74",
                "title",
                `O título contém caracteres inválidos. \n Caracteres inválidos encontrados: ${hasInvalidCharacters}`
            )
        }

        if (/(\d{2,})/.test(title)) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "85",
                "title",
                `O título não pode conter sequências numéricas.`
            )
        }

        if (this.verifyIfContainsSwearsWords(title.toLowerCase())) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
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
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "113",
                "subtitle",
                `O subtítulo não pode ser vazio!`
            )
        }

        if (subtitle.length < 5 || subtitle.length > 70) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "122",
                "subtitle",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const hasInvalidCharacters = subtitle.match(invalidCharacters);

        if (hasInvalidCharacters) {

            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "131",
                "subtitle",
                `O subtítulo contém caracteres inválidos. \n Caracteres inválidos encontrados: ${hasInvalidCharacters}`
            )
        }

        if (/(\d{2,})/.test(subtitle)) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "140",
                "subtitle",
                `O subtítulo não pode conter sequências numéricas.`
            )
        }

        if (this.verifyIfContainsSwearsWords(subtitle.toLowerCase())) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
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
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "166",
                "description",
                `A descrição não pode ser vazia!`
            )
        }

        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const hasInvalidCharacters = description.match(invalidCharacters);

        if (hasInvalidCharacters) {

            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "180",
                "description",
                `A descrição contém caracteres inválidos. \n Caracteres inválidos encontrados: ${hasInvalidCharacters}`
            )
        }

        if (/(\d{10,})/.test(description)) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "189",
                "description",
                `a descrição não pode conter sequências numéricas muito longas.`
            )
        }

        if (this.verifyIfContainsSwearsWords(description)) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "198",
                "description",
                `a descrição contém palavras de baixo calão.`
            )
        }

        this.description = description;
    }

    public getStatus(): "published" | "not-published" | undefined {
        return this.status;
    }

    public setStatus(status: "published" | "not-published"): void {

        if (typeof status !== 'string' || !['published', 'not-published'].includes(status)) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "223",
                "status",
                `status inválido. Status: ${status}`
            )
        }

        if (this.getStatus() === "published" && status === "not-published") {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "223",
                "status",
                `status inválido. Status: ${status}. Não é possível 'despublicar' uma trilha já publicada.`
            )
        }

        const publishedTrailClasses = this.getTrailClasses().filter(c => c.getStatus() === "published")
        const hasEnoughTrailClassesToPublish = publishedTrailClasses.length >= 1

        if (status === "published" && hasEnoughTrailClassesToPublish === false) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "232",
                "status",
                `status inválido. O status não pode ser "published" se a trilha não tiver ao menos uma aula publicada.`
            )
        }

        this.status = status;
    }

    public getStorageKey(): string | undefined {
        return this.storageKey;
    }

    public setStorageKey(key: string): void {
        const idValidCharacters = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const validPrefix = "trilhas/trail-"

        const keyStartsWithValidPrefix = key.startsWith(validPrefix)
        const keyLengthIsValid = key.length === 51

        if (!keyStartsWithValidPrefix) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `o prexifo da key é inválido.`
            )
        }

        if (!keyLengthIsValid) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `O tamanho da key da trilha é inválido.`
            )
        }

        const contentKeyParts = key.split("/")
        const idTrailOnContentKeyParts = contentKeyParts[1].split("trail-")[1]

        const isValidIdTrailFormat = idValidCharacters.test(idTrailOnContentKeyParts)


        if (!isValidIdTrailFormat) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `O formato do id da trilha presente da key da trilha é inválido.`
            )
        }

        const isValidIdTrail = this.getId() === idTrailOnContentKeyParts

        if (!isValidIdTrail) {
            throw new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `O id da trilha presente na key da trilha não é igual ao id da trilha.`
            )
        }

        this.storageKey = key

    }

    public getTrailClasses(): TrailClass[] {
        return this.trailClass;
    }

    public setTrailClasses(trailClasses: TrailClass[]): void {

        const invalidTrailClasses: TrailClass[] = []
        const validTrailClasses: TrailClass[] = []

        trailClasses.forEach(trailClass => {
            if (trailClass.getIdTrail() !== this.id) {
                invalidTrailClasses.push(trailClass)
            }

            validTrailClasses.push(trailClass)
        })

        if (invalidTrailClasses.length > 0) {
            throw new InvalidTrailDomainException(
                "trail-class-entity",
                "100",
                "trailClasses",
                `A trilha contém trilhas de outra trilha. trilhas inválidas encontradas: ${invalidTrailClasses}`
            )
        }

        this.trailClass = validTrailClasses;
    }

    public getCreatedAt() {
        return this.createAt
    }

    public setCreatedAt(createAt: Date): void {
        this.createAt = createAt;
    }

    public getUpdatedAt() {
        return this.updateAt;
    }

    public setUpdatedAt(updateAt: Date): void {
        this.updateAt = updateAt;
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
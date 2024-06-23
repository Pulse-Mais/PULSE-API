import { TrailClass } from "../trail-class/trail-class-entity";

export class TrailBase {

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
            throw new Error("Id inválido!");
        }

        this.id = id;
    }

    public getTitle() {
        return this.title;
    }

    public setTitle(title: string): void {
        if (!title) throw new Error("O título não pode ser vazio!");

        if (title.length < 5 || title.length > 70) {
            throw new Error("O título deve ter entre 5 e 70 caracteres.");
        }


        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const matches = title.match(invalidCharacters);
        if (matches) {
            console.error("Caracteres inválidos encontrados:", matches);
            throw new Error("O título contém caracteres inválidos.");
        }

        if (/(\d{2,})/.test(title)) {
            throw new Error("O título não pode conter sequências numéricas.");
        }

        if (this.verifyIfContainsSwearsWords(title.toLowerCase())) {
            throw new Error(`O título contém palavras de baixo calão.`);
        }

        this.title = title;
    }


    public getSubtitle() {
        return this.subtitle;
    }

    public setSubtitle(subtitle: string): void {
        if (!subtitle) throw new Error("O subtítulo não pode ser vazio!");

        if (subtitle.length < 5 || subtitle.length > 70) {
            throw new Error("O subtítulo deve ter entre 5 e 70 caracteres.");
        }
        const invalidCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        const matches = subtitle.match(invalidCharacters);
        if (matches) {
            console.error("Caracteres inválidos encontrados:", matches);
            throw new Error("O subtítulo contém caracteres inválidos.");
        }

        if (/(\d{2,})/.test(subtitle)) {
            throw new Error("O subtítulo não pode conter sequências numéricas.");
        }

        if (this.verifyIfContainsSwearsWords(subtitle.toLowerCase())) {
            throw new Error(`O subtítulo contém palavras de baixo calão.`);
        }

        this.subtitle = subtitle;
    }

    public getDescription() {
        return this.description
    }

    public setDescription(description: string): void {
        if (!description) throw new Error("A descrição não pode ser vazia!")

        if (description.length < 5 || description.length > 600) {
            throw new Error("O subtítulo deve ter entre 5 e 600 caracteres.");
        }

        const invalidDescriptionCharacters = /[^a-zA-Z\u00C0-\u00FF0-9\s ?!.,"'-]/;
        if (invalidDescriptionCharacters.test(description)) {
            throw new Error("A descrição contém caracteres inválidos.");
        }

        if (/(\d{10,})/.test(description)) {
            throw new Error("O subtítulo não pode conter sequências numéricas.");
        }

        if (this.verifyIfContainsSwearsWords(description)) {
            throw new Error("A descrição contém palavras de baixo calão.");
        }

        this.description = description;
    }

    public getStatus(): "published" | "not-published" | undefined {
        return this.status;
    }

    public setStatus(status: "published" | "not-published"): void {
        if (status !== "published" && status !== "not-published") {
            throw new Error("Status inválido");
        }
        this.status = status;
    }

    public getStorageKey(): string | undefined {
        return this.storageKey;
    }

    public setStorageKey(key: string): void {

        if (key.length < 10) {
            throw new Error("Storage key inválida!");
        }

        this.storageKey = key;
    }

    public getTrailClasss(): TrailClass[] {
        return this.trailClass;
    }

    public setTrailClasss(trailClass: TrailClass[]): void {
        this.trailClass = trailClass.filter(c => c.getIdTrail() === this.id);
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
        return true;
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
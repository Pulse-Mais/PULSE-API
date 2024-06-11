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

    public getTitle(): string | undefined {
        return this.title;
    }

    public setTitle(title: string): void {

        const invalidCharacters = /[^a-zA-ZáéíóúÁÉÍÓÚàÀêÊôÔçÇüÜ0-9 -]/;

        if (invalidCharacters.test(title)) {
            throw new Error("O título contém caracteres inválidos.");
        }

        if (title.length < 5) {
            throw new Error("O título deve ter pelo menos 5 caracteres.");
        }

        this.title = title;
    }

    public getSubtitle(): string | undefined {
        return this.subtitle;
    }

    public setSubtitle(subtitle: string): void {

        const invalidSubtitleCharacters = /[^a-zA-ZáéíóúÁÉÍÓÚàÀêÊôÔçÇüÜ0-9 -]/;

        if (invalidSubtitleCharacters.test(subtitle)) {
            throw new Error("O subtítulo contém caracteres inválidos.");
        }

        if (subtitle.length < 5) {
            throw new Error("O subtítulo deve ter pelo menos 5 caracteres.");
        }

        this.subtitle = subtitle;
    }

    public getDescription(): string | undefined {
        return this.description;
    }

    public setDescription(description: string): void {

        const invalidDescriptionCharacters = /[^a-zA-ZáéíóúÁÉÍÓÚàÀêÊôÔçÇüÜ0-9 -]/;

        if (invalidDescriptionCharacters.test(description)) {
            throw new Error("A descrição contém caracteres inválidos.");
        }

        if (description.length < 10) {
            throw new Error("A descrição deve ter pelo menos 10 caracteres.");
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
}
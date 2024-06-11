import { TrailClass } from "../../src/domain/entity/trail-class/trail-class-entity"
import { ITrailClassRepository } from "../../src/domain/repository/ITrail-class-Repository"

interface TrailClassTable {
    id: string,
    idTrail: string,
    title: string,
    description: string,
    subtitle: string,
    status: "published" | "not-published",
    releaseSchedule: Date,
    releaseStatus: "locked" | "unlocked",
    trailClassStorageKey: string,
    contentUploadId: string,
    contentUploadStatus: "waiting" | "asset_created" | "errored" | "cancelled" | "timed_out" | "none"
    contentStatus: "empty" | "in-upload" | "filled"
    contentKey: string,
    contentType: "video" | "archive" | "empty",
    contentFormat: "planilha" | "pdf" | "slides" | "video" | "empty",
    createAt: string,
    updateAt: string
}


export class InMemoryTrailClassRepository implements ITrailClassRepository {

    public trailClass: TrailClassTable[] = []


    constructor() { }

    findByTrailClassUploadId(idUpload: string): TrailClass | null {
        const trailClass = this.trailClass.find(c => c.contentUploadId === idUpload)

        if (!trailClass) return null

        const trailClassDomainEntity = TrailClass.restore({
            id: trailClass.id,
            idTrail: trailClass.idTrail,
            title: trailClass.title,
            description: trailClass.description,
            subtitle: trailClass.subtitle,
            status: trailClass.status,
            release: {
                schedule: trailClass.releaseSchedule,
                status: trailClass.releaseStatus
            },
            trailClassStorageKey: trailClass.trailClassStorageKey,
            content: {
                type: trailClass.contentType,
                format: trailClass.contentFormat,
                key: trailClass.contentKey,
                status: trailClass.contentStatus,
                upload: {
                    id: trailClass.contentUploadId,
                    status: trailClass.contentUploadStatus
                }
            },
            createAt: trailClass.createAt,
            updateAt: trailClass.updateAt
        })

        return trailClassDomainEntity
    }

    findById(id: string): TrailClass | null {

        const trailClass = this.trailClass.find(c => c.id === id)

        if (!trailClass) return null

        const trailClassDomainEntity = TrailClass.restore({
            id: trailClass.id,
            idTrail: trailClass.idTrail,
            title: trailClass.title,
            description: trailClass.description,
            subtitle: trailClass.subtitle,
            status: trailClass.status,
            release: {
                schedule: trailClass.releaseSchedule,
                status: trailClass.releaseStatus
            },
            trailClassStorageKey: trailClass.trailClassStorageKey,
            content: {
                type: trailClass.contentType,
                format: trailClass.contentFormat,
                key: trailClass.contentKey,
                status: trailClass.contentStatus,
                upload: {
                    id: trailClass.contentUploadId,
                    status: trailClass.contentUploadStatus
                }
            },
            createAt: trailClass.createAt,
            updateAt: trailClass.updateAt
        })

        return trailClassDomainEntity
    }

    save(c: TrailClass): TrailClass {

        const id = c.getId();
        if (!id) throw new Error("AAAAAAAAAAAAA");

        const idTrail = c.getIdTrail();
        if (!idTrail) throw new Error("AAAAAAAAAAAAA");

        const title = c.getTitle();
        if (!title) throw new Error("AAAAAAAAAAAAA");

        const description = c.getDescription();
        if (!description) throw new Error("AAAAAAAAAAAAA");

        const subtitle = c.getSubtitle();
        if (!subtitle) throw new Error("AAAAAAAAAAAAA");

        const status = c.getStatus();
        if (!status) throw new Error("AAAAAAAAAAAAA");

        const trailClassStorageKey = c.getTrailClassStorageKey();
        if (!trailClassStorageKey) throw new Error("AAAAAAAAAAAAA");

        const content = c.getContent();
        if (!content) throw new Error("AAAAAAAAAAAAA");

        const createdAt = c.getCreatedAt();
        if (!createdAt) throw new Error("AAAAAAAAAAAAA");

        const updatedAt = c.getUpdatedAt();
        if (!updatedAt) throw new Error("AAAAAAAAAAAAA");

        const trailClass: TrailClassTable = {
            id,
            idTrail,
            title,
            description,
            subtitle,
            status,
            releaseSchedule: new Date(),
            releaseStatus: "locked",
            trailClassStorageKey,
            contentUploadId: content.upload.id,
            contentUploadStatus: content.upload.status,
            contentStatus: content.status,
            contentKey: content.key,
            contentType: content.type,
            contentFormat: content.format,
            createAt: createdAt.toLocaleDateString("pt-BR"),
            updateAt: updatedAt.toLocaleDateString("pt-BR")
        }

        const trailClassExist = this.trailClass.find(c => c.id === id)

        if (trailClassExist) {
            this.trailClass.splice(this.trailClass.indexOf(trailClassExist), 1)
        }

        this.trailClass.push(trailClass)

        return c
    }

    listByTrail(idTrail: string): TrailClass[] {

        let trailClass = this.trailClass.filter(c => c.idTrail === idTrail)
        let trailClassDomainEntities: TrailClass[] = []

        trailClass.forEach((trailClass) => trailClassDomainEntities.push(TrailClass.restore({
            id: trailClass.id,
            idTrail: trailClass.idTrail,
            title: trailClass.title,
            description: trailClass.description,
            subtitle: trailClass.subtitle,
            status: trailClass.status,
            release: {
                schedule: "empty",
                status: "locked"
            },
            trailClassStorageKey: trailClass.trailClassStorageKey,
            content: {
                type: trailClass.contentType,
                format: trailClass.contentFormat,
                key: trailClass.contentKey,
                status: trailClass.contentStatus,
                upload: {
                    id: trailClass.contentUploadId,
                    status: trailClass.contentUploadStatus
                }
            },
            createAt: trailClass.createAt,
            updateAt: trailClass.updateAt
        })))

        return trailClassDomainEntities

    }

    delete(id: string): void {
        
    }


}


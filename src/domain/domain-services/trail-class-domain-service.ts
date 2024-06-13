import { Logger } from "../../infra/logs/logger";
import { TrailClassNotFoundOnTrailDomainException } from "../domain-exception/trail-class-not-found-on-trail-domain-exception";
import { InvalidTrailDomainException } from "../domain-exception/invalid-trail-domain-exception";
import { InvalidTrailPropetyDomainException } from "../domain-exception/invalid-trail-propety-domain-exception";
import { TrailClass } from "../entity/trail-class/trail-class-entity";
import { Trail } from "../entity/trail/trail-entity";
import { Content, ContentValueObject } from "../entity/value-objects/content-value-object";
import { Release, ReleaseValueObject } from "../entity/value-objects/release-value-object";
import { InvalidTrailClassPropetyDomainException } from "../domain-exception/invalid-trail-class-propety-domain-exception";

interface CreateInput {
    trail: Trail

    title: string
    description: string
    subtitle: string
}

interface updateTrailClassInput {
    idTrailClass: string
    title?: string
    description?: string
    subtitle?: string
}

interface RestoreInput {
    id: string
    idTrail: string

    title: string
    description: string
    subtitle: string

    trailClassStorageKey: string
    content: Content
    status: "published" | "not-published"
    release: ReleaseValueObject

    createAt: string;
    updateAt: string;
}

interface GetTrailClassInput {
    trail: Trail
    idTrailClass: string
}


export class TrailClassDomainService {

    constructor() { }

    getTrailClass(input: GetTrailClassInput) {

        const { trail, idTrailClass } = input;
        if (!trail) throw new InvalidTrailDomainException("trailClass-domain-service.ts", "46");

        const trailClass: TrailClass | null = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trailClass-domain-service.ts", "97");



    }


    createTrailClass(input: CreateInput) {

        const { trail } = input;
        if (!trail) throw new InvalidTrailDomainException("trailClass-domain-service.ts", "46");

        const idTrail = trail.getId()
        if (!idTrail) throw new InvalidTrailPropetyDomainException("trailClass-domain-service.ts", "46", "idTrail");

        const trailStorageKey = trail.getStorageKey()
        if (!trailStorageKey) throw new InvalidTrailPropetyDomainException("trailClass-domain-service.ts", "52", "trailStorageKey");

        const data = {
            idTrail,
            trailStorageKey,
            title: input.title,
            description: input.description,
            subtitle: input.subtitle
        }

        return TrailClass.create(data)

    }

    restoreTrailClass(input: RestoreInput) {

        return TrailClass.restore(input)
    }

    updateTrailClassInfo(input: updateTrailClassInput, trail: Trail) {
        const trailClass = trail.getTrailClassById(input.idTrailClass)

        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trailClass-domain-service.ts", "76")

        if (input.title) {
            trailClass.updateTitle(input.title);
        }

        if (input.subtitle) {
            trailClass.updateSubtitle(input.subtitle);
        }

        if (input.description) {
            trailClass.updateDescription(input.description);
        }

        return trailClass

    }

    publishTrailClass(trail: Trail, idTrailClass: string, unlockDate: Date) {

        const trailClass: TrailClass | null = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trailClass-domain-service.ts", "97");

        if (!unlockDate) throw new Error("unlockDate is required");
        const releaseSchedule = new Release("locked", unlockDate)
        trailClass.publish(releaseSchedule)

        return trailClass
    }

    unlockTrailClass(trail: Trail, idTrailClass: string) {

        const trailClass: TrailClass | null = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trailClass-domain-service.ts", "107")

        trailClass.unlock()

        return trailClass
    }

    generateVideoContentKey(trail: Trail, idTrailClass: string, archiveExtension: string): string {

        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "124")

        const trailKey = trail.getStorageKey()
        const trailClassKey = trailClass.getTrailClassStorageKey()

        if (!trailKey) throw new Error("");
        if (!trailClassKey) throw new Error("");

        const trailParts = trailKey.split("/");
        const trailClassParts = trailClassKey.split("/");

        if (trailParts[1] !== trailClassParts[1]) throw new Error("");
        if (trailClassKey[2] !== `trailClass-${trailClass.getId()}`) throw new Error("");

        const key = `${trailClassKey}content.${archiveExtension}`

        return key
    }


    createNewArchiveContentObject(trail: Trail, idTrailClass: string, contentParams: {
        archiveExtension:
        | "pptx"
        | "xlsx"
        | "pdf"
        | "jpg"
        | "jpeg"
        | "png"
        | "svg"
        | "doc"
        | "docx"
        | "xls"
        | "txt";
        type: "video" | "archive"
        format: "planilha" | "pdf" | "slides" | "video"
    }): ContentValueObject {

        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "124")

        const trailKey = trail.getStorageKey()
        const trailClassKey = trailClass.getTrailClassStorageKey()

        if (!trailKey) throw new Error("");
        if (!trailClassKey) throw new Error("");

        const trailParts = trailKey.split("/");
        const trailClassParts = trailClassKey.split("/");

        if (trailParts[1] !== trailClassParts[1]) throw new Error("");
        if (trailClassParts[2] !== `trailClass-${trailClass.getId()}`) throw new Error(trailClassKey);

        const key = `${trailClassKey}content.${contentParams.archiveExtension}`

        const newContent = new Content(key, contentParams.type, contentParams.format, "empty", { id: "none", status: "waiting" });

        return newContent
    }

    createNewVideoContentObject(trail: Trail, idTrailClass: string, idUpload: string): ContentValueObject {

        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "124")

        const actualContent = trailClass.getContent()
        if (!actualContent) throw new InvalidTrailClassPropetyDomainException("trail-class-domain-service.ts", "187", "content")

        const newContent = new Content(actualContent.key, "video", "video", "empty", { id: idUpload, status: "waiting" });

        return newContent
    }

    createdFilledVideoContentObject(trail: Trail, idTrailClass: string, newKey: string) {
        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "124")

        const actualContent = trailClass.getContent()
        if (!actualContent) throw new InvalidTrailClassPropetyDomainException("trail-class-domain-service.ts", "199", "content")

        const updatedContent = new Content(newKey, actualContent.type, actualContent.format, "filled", { id: actualContent.upload.id, status: "asset_created" });

        return updatedContent
    }

    createdFilledArchiveContentObject(trail: Trail, idTrailClass: string, signedContentKeyUrl?: string) {

        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "124")

        const actualContent = trailClass.getContent()
        if (!actualContent) throw new Error("")

        if (signedContentKeyUrl) {
            const updatedContent = new Content(signedContentKeyUrl, actualContent.type, actualContent.format, "filled", { id: "none", status: "asset_created" });
            
            return updatedContent
        }

        const updatedContent = new Content(actualContent.key, actualContent.type, actualContent.format, "filled", { id: "none", status: "asset_created" });

        return updatedContent
    }

    updateTrailClassContent(trail: Trail, idTrailClass: string, content: ContentValueObject) {

        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "147")

        trailClass.updateContent(content)

        return trailClass
    }


}
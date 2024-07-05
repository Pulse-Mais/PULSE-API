import { TrailClassInvalidUpdateDomainException } from "@/domain/domain-exception/trail-class-invalid-update-domain-expection";
import { TrailClassNotFoundOnTrailDomainException,
    InvalidTrailDomainException,
    InvalidTrailPropetyDomainException,
    TrailClass,
    Trail,
    Content,
    ContentValueObject,
    InvalidTrailClassPropetyDomainException,
    CreateTrailClassDomainServiceInput,
    RestoreTrailClassDomainServiceInput,
    UpdateTrailClassDomainServiceInput

} from "./index"
export class TrailClassDomainService {

    constructor() { }

    createTrailClass(input: CreateTrailClassDomainServiceInput) {
        const { trail } = input;
        if (!trail) {
            throw new InvalidTrailDomainException("trailClass-domain-service.ts", "46", "trail");
        }

        const idTrail = trail.getId()
        if (!idTrail) {
            throw new InvalidTrailPropetyDomainException("trailClass-domain-service.ts", "46", "idTrail")
        }

        const trailStorageKey = trail.getStorageKey()
        if (!trailStorageKey) {
            throw new InvalidTrailPropetyDomainException("trailClass-domain-service.ts", "52", "trailStorageKey");
        }

        const data = {
            idTrail,
            trailStorageKey,
            title: input.title,
            subtitle: input.subtitle,
            description: input.description,
            duration: input.duration
        }

        return TrailClass.create(data)

    }

    restoreTrailClass(input: RestoreTrailClassDomainServiceInput) {
        return TrailClass.restore(input)
    }

    updateTrailClassInfo(input: UpdateTrailClassDomainServiceInput, trail: Trail) {
        const trailClass = trail.getTrailClassById(input.idTrailClass)

        if (!trailClass) {
            throw new TrailClassNotFoundOnTrailDomainException("trailClass-domain-service.ts", "76");
        }

        if (input.title) {
            trailClass.updateTitle(input.title);
        }

        if (input.subtitle) {
            trailClass.updateSubtitle(input.subtitle);
        }

        if (input.description) {
            trailClass.updateDescription(input.description);
        }

        if (input.duration) {
            trailClass.updateDuration(input.duration);
        }

        if (!input.title && !input.subtitle && !input.description && !input.duration) {
          throw new TrailClassInvalidUpdateDomainException("trailClass-domain-service.ts", "75");
        }

        return trailClass

    }

    publishTrailClass(trail: Trail, idTrailClass: string) {
        const trailClass: TrailClass | null = trail.getTrailClassById(idTrailClass)
        if (!trailClass) {
            throw new TrailClassNotFoundOnTrailDomainException("trailClass-domain-service.ts", "97");
        }

        trailClass.publish()
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

        const newContent = new Content(key, contentParams.type, "empty", { id: "none", status: "waiting" });

        return newContent
    }

    createNewVideoContentObject(trail: Trail, idTrailClass: string, idUpload: string): ContentValueObject {

        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "124")

        const actualContent = trailClass.getContent()
        if (!actualContent) throw new InvalidTrailClassPropetyDomainException("trail-class-domain-service.ts", "187", "content")

        const newContent = new Content(actualContent.key, "video", "empty", { id: idUpload, status: "waiting" });

        return newContent
    }

    createdFilledVideoContentObject(trail: Trail, idTrailClass: string, newKey: string) {
        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "124")

        const actualContent = trailClass.getContent()
        if (!actualContent) throw new InvalidTrailClassPropetyDomainException("trail-class-domain-service.ts", "199", "content")

        const updatedContent = new Content(newKey, actualContent.type, "filled", { id: actualContent.upload.id, status: "asset_created" });

        return updatedContent
    }

    createdFilledArchiveContentObject(trail: Trail, idTrailClass: string, signedContentKeyUrl?: string) {

        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "124")

        const actualContent = trailClass.getContent()
        if (!actualContent) throw new Error("")

        if (signedContentKeyUrl) {
            const updatedContent = new Content(signedContentKeyUrl, actualContent.type, "filled", { id: "none", status: "asset_created" });
            
            return updatedContent
        }

        const updatedContent = new Content(actualContent.key, actualContent.type, "filled", { id: "none", status: "asset_created" });

        return updatedContent
    }

    updateTrailClassContent(trail: Trail, idTrailClass: string, content: ContentValueObject) {

        const trailClass = trail.getTrailClassById(idTrailClass)
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("trail-class-domain-service.ts", "147")

        trailClass.updateContent(content)

        return trailClass
    }


}
import {
    TrailClass,
    InvalidTrailClassPropetyDomainException,
    CreateTrailClassDomainServiceInput,
    RestoreTrailClassDomainServiceInput,
    UpdateTrailClassDomainServiceInput,
    ContentArchiveValueObject,
    ContentVideoValueObject,
    ContentArticleValueObject,
    ContentEmptyValueObject,
    ClassAlreadyPublishedDomainException,
    TrailClassInvalidUpdateDomainException
} from "./index"

export class TrailClassDomainService {

    constructor() { }

    createTrailClass(input: CreateTrailClassDomainServiceInput) {
        const data = {
            idTrail: input.idTrail,
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

    updateTrailClassInfo(input: UpdateTrailClassDomainServiceInput) {
        const trailClass = input.trailClass

        if (!trailClass) {
            throw new Error("Aula recebida é inválida, criar exception, 62 domain-service.");
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

    publishTrailClass(trailClass: TrailClass) {
 
        trailClass.publish()
        return trailClass
    }

    // OK
    createFilledContentArticleValueObject(articleContent: string) {
        const filledContentArticle = new ContentArticleValueObject(
            articleContent
        );

        return filledContentArticle
    }

    // OK
    createdInUploadContentVideoValueObject(key: string, idUpload: string) {
        const filledContentVideo = new ContentVideoValueObject(
            key,
            "in-upload",
            idUpload,
            "waiting"
        );

        return filledContentVideo
    }

    // OK! (por enquanto). Depois é necessário pensar se é bom criar um value pra quando o conteúdo está
    // em upload, preenchido, e quando deu erro. Assim da pra "limpar" o conteúdo. Caso tenha dado erro.
    createdFilledContentVideoValueObject(key: string, idUpload: string) {
        const filledContentVideo = new ContentVideoValueObject(
            key,
            "filled",
            idUpload,
            "asset_created"
        );

        return filledContentVideo
    }

    // OK!
    createInUploadContentArchiveValueObject(trailClass: TrailClass, archiveExtension: "pptx" | "xlsx" | "pdf" | "jpg" | "jpeg" | "png" | "svg" | "doc" | "docx" | "xls" | "txt", signedContentKeyUrl?: string) {
        const idTrailClass = trailClass.getId()
        if (!idTrailClass) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-domain-service.ts",
                "189",
                "idTrailClass",
                "O id da aula não foi definido."
            )
        }

        const idTrail = trailClass.getIdTrail()
        if (!idTrail) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-domain-service.ts",
                "189",
                "idTrail",
                "O id da trilha não foi definido."
            )
        }

        const contentKey = `trilhas/trail-${idTrail}/trailClass-${idTrailClass}/content.${archiveExtension}`

        const inUploadContentArchive = new ContentArchiveValueObject(
            contentKey,
            "in-upload",
            archiveExtension
        );

        return inUploadContentArchive
    }

    // OK!
    createFilledContentArchiveValueObject(trailClass: TrailClass, archiveExtension: "pptx" | "xlsx" | "pdf" | "jpg" | "jpeg" | "png" | "svg" | "doc" | "docx" | "xls" | "txt", signedContentKeyUrl?: string) {
        const idTrailClass = trailClass.getId()
        if (!idTrailClass) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-domain-service.ts",
                "189",
                "idTrailClass",
                "O id da aula não foi definido."
            )
        }

        const idTrail = trailClass.getIdTrail()
        if (!idTrail) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-domain-service.ts",
                "189",
                "idTrail",
                "O id da trilha não foi definido."
            )
        }

        const contentKey = `trilhas/trail-${idTrail}/trailClass-${idTrailClass}/content.${archiveExtension}`

        const filledContentArchive = new ContentArchiveValueObject(
            contentKey,
            "filled",
            archiveExtension
        );

        return filledContentArchive
    }

    // OK!
    public updateContent(trailClass: TrailClass, content: ContentEmptyValueObject | ContentArticleValueObject | ContentVideoValueObject | ContentArchiveValueObject) {
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

        if (trailClass.getStatus() === "published") {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-entity",
                "75",
                "content",
                "Você não não pode alterar o conteúdo de uma aula já públicada!"
            )
        }

        if (content instanceof ContentEmptyValueObject) {
            throw new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível ataulizar o conteúdo de uma aula, para um conteúdo vazio.`
            )
        }

        if (content instanceof ContentArchiveValueObject) {
            trailClass.setArchiveTrailClassContent(content)
        }

        if (content instanceof ContentVideoValueObject) {
            trailClass.setVideoTrailClassContent(content)
        }

        if (content instanceof ContentArticleValueObject) {
            trailClass.setArticleTrailClassContent(content)
        }

        return trailClass
    }
}
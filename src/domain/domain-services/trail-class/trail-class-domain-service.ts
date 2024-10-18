import {
    TrailClass,
    InvalidTrailClassPropetyDomainException,
    CreateTrailClassDomainServiceInput,
    RestoreTrailClassDomainServiceInput,
    UpdateTrailClassDomainServiceInput,
    ClassAlreadyPublishedDomainException,
    TrailClassInvalidUpdateDomainException
} from "./index"
interface ContentItem {
    index: number;  
    type: 'text' | 'file' | 'alternatives' | 'dissertative';  
    content: string; 
    alternatives?: Array<{ text: string; correct: boolean }>;  
}
export class TrailClassDomainService {

    constructor() { }

    createTrailClass(input: CreateTrailClassDomainServiceInput) {
        const data = {
            idTrail: input.idTrail,
            type: input.type,
            title: input.title,
            description: input.description,
            duration: input.duration
        }

        return TrailClass.create(data)
    }

    restoreTrailClass(input: RestoreTrailClassDomainServiceInput) {
        return TrailClass.restore(input)
    }

    // updateTrailClassInfo(input: UpdateTrailClassDomainServiceInput) {
    //     const trailClass = input.trailClass

    //     if (!trailClass) {
    //         throw new Error("Aula recebida é inválida, criar exception, 62 domain-service.");
    //     }

    //     if (input.title) {
    //         trailClass.updateTitle(input.title);
    //     }

    //     if (input.subtitle) {
    //         trailClass.updateSubtitle(input.subtitle);
    //     }

    //     if (input.description) {
    //         trailClass.updateDescription(input.description);
    //     }

    //     if (input.duration) {
    //         trailClass.updateDuration(input.duration);
    //     }

    //     if (!input.title && !input.subtitle && !input.description && !input.duration) {
    //         throw new TrailClassInvalidUpdateDomainException("trailClass-domain-service.ts", "75");
    //     }

    //     return trailClass

    // }

    publishTrailClass(trailClass: TrailClass) {
 
        trailClass.publish()
        return trailClass
    }

    // OK
   

    // OK!
 

 

    // OK!
    // public updateContent(trailClass: TrailClass, content: ContentEmptyValueObject | ContentArticleValueObject | ContentVideoValueObject | ContentArchiveValueObject) {
    //     if (
    //         !(content instanceof ContentEmptyValueObject) &&
    //         !(content instanceof ContentArticleValueObject) &&
    //         !(content instanceof ContentVideoValueObject) &&
    //         !(content instanceof ContentArchiveValueObject)
    //     ) {
    //         throw new InvalidTrailClassPropetyDomainException(
    //             "trail-class-base-entity.ts",
    //             "404",
    //             "content",
    //             "O tipo de conteúdo não é suportado."
    //         )
    //     }

    //     if (trailClass.getStatus() === "published") {
    //         throw new InvalidTrailClassPropetyDomainException(
    //             "trail-class-entity",
    //             "75",
    //             "content",
    //             "Você não não pode alterar o conteúdo de uma aula já públicada!"
    //         )
    //     }

    //     if (content instanceof ContentEmptyValueObject) {
    //         throw new InvalidTrailClassPropetyDomainException(
    //             "trail-class-base-entity.ts",
    //             "241",
    //             "content",
    //             `Não é possível ataulizar o conteúdo de uma aula, para um conteúdo vazio.`
    //         )
    //     }

    //     if (content instanceof ContentArchiveValueObject) {
    //         trailClass.setArchiveTrailClassContent(content)
    //     }

    //     if (content instanceof ContentVideoValueObject) {
    //         trailClass.setVideoTrailClassContent(content)
    //     }

    //     if (content instanceof ContentArticleValueObject) {
    //         trailClass.setArticleTrailClassContent(content)
    //     }

    //     return trailClass
    // }
}
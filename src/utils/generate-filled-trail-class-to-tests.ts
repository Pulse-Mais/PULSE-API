import { TrailClass } from "@/domain/domain-services/trail-class"
import { CreateTrailClassInput } from "@/domain/entity/trail-class/trail-class-types"

export function generateFilledTrailClassToTests(idTrail: string, contentType: "archive" | "article" | "video" = "archive"): TrailClass {
    const inputTrailClassFilled: CreateTrailClassInput = {
        idTrail: idTrail,
        title: "Trilha com contéudo preenchido",
        description: "gerada automáticamente para testes",
        type: 'class',
        duration: 10,
    }

    const trailClassFilled = TrailClass.create(inputTrailClassFilled)

    // if (contentType === "archive") {
    //     trailClassFilled.setArchiveTrailClassContent(
    //         new ContentArchiveValueObject(
    //             `trilhas/trail-${idTrail}/trailClass-${trailClassFilled.getId()}/`,
    //             "filled",
    //             "pdf"
    //         ))
    // }

    // if (contentType === "article") {
    //     trailClassFilled.setArticleTrailClassContent(
    //         new ContentArticleValueObject(
    //             "aaaaaaaaaaaaaaaaaaaaaa"
    //         ))
    // }

    // if (contentType === "video") {
    //     trailClassFilled.setVideoTrailClassContent(
    //         new ContentVideoValueObject(
    //             "www.video-service/watch?v=AAAAAAAAAAAAA",
    //             "filled",
    //             "31313131345",
    //             "asset_created"
    //         )
    //     )
    // }


    return trailClassFilled
}
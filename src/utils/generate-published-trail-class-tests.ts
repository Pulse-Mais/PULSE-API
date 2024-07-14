import { TrailClass, ContentArchiveValueObject } from "@/domain/domain-services/trail-class"
import { CreateTrailClassInput } from "@/domain/entity/trail-class/trail-class-types"

export function generatePublishedTrailClass(idTrail: string): TrailClass {
    const inputTrailClassPublished: CreateTrailClassInput = {
        idTrail: idTrail,
        title: "Teste",
        description: "teste",
        subtitle: "teste",
        duration: 10,
    }

    const trailClassPublished = TrailClass.create(inputTrailClassPublished)

    trailClassPublished.setArchiveTrailClassContent(
        new ContentArchiveValueObject(
            `trilhas/trail-${idTrail}/trailClass-${trailClassPublished.getId()}/`,
            "filled",
            "pdf"
        ))
    
    trailClassPublished.publish()

    return trailClassPublished
}
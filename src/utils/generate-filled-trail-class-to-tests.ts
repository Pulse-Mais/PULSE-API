import { TrailClass, ContentArchiveValueObject } from "@/domain/domain-services/trail-class"
import { CreateTrailClassInput } from "@/domain/entity/trail-class/trail-class-types"

export function generateFilledTrailClassToTests(idTrail: string): TrailClass {
    const inputTrailClassFilled: CreateTrailClassInput = {
        idTrail: idTrail,
        title: "Trilha com contéudo preenchido",
        description: "gerada automáticamente para testes",
        subtitle: "teste",
        duration: 10,
    }

    const trailClassFilled = TrailClass.create(inputTrailClassFilled)

    trailClassFilled.setArchiveTrailClassContent(
        new ContentArchiveValueObject(
            `trilhas/trail-${idTrail}/trailClass-${trailClassFilled.getId()}/`,
            "filled",
            "pdf"
        ))
    
    return trailClassFilled
}
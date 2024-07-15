import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity"
import { ContentEmptyValueObject } from "@/domain/entity/value-objects/content-empty-value-object"
import { CreateTrailClassInput } from "@/domain/entity/trail-class/trail-class-types"

export function generateUnfilledTrailClassToTests(idTrail: string): TrailClass {
    const inputTrailClassUnfilled: CreateTrailClassInput = {
        idTrail: idTrail,
        title: "Trilha com contéudo vazio",
        description: "gerada automáticamente para testes",
        subtitle: "teste",
        duration: 10,
    }

    const trailClassUnfilled = TrailClass.create(inputTrailClassUnfilled)

    trailClassUnfilled.setContent(new ContentEmptyValueObject())

    return trailClassUnfilled
}
import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity"
import { CreateTrailClassInput } from "@/domain/entity/trail-class/trail-class-types"

export function generateUnfilledTrailClassToTests(idTrail: string): TrailClass {
    const inputTrailClassUnfilled: CreateTrailClassInput = {
        idTrail: idTrail,
        title: "Trilha com contéudo vazio",
        description: "gerada automáticamente para testes",
        type: 'class',
        duration: 10,
    }

    const trailClassUnfilled = TrailClass.create(inputTrailClassUnfilled)

     

    return trailClassUnfilled
}
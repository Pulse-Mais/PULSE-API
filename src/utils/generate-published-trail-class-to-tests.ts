import { TrailClass} from "@/domain/domain-services/trail-class"
import { CreateTrailClassInput } from "@/domain/entity/trail-class/trail-class-types"

export function generatePublishedTrailClassToTests(idTrail: string): TrailClass {
    const inputTrailClassPublished: CreateTrailClassInput = {
        idTrail: idTrail,
        title: "Teste",
        description: "teste",
        type: 'class',
        duration: 10,
    }

    const trailClassPublished = TrailClass.create(inputTrailClassPublished)

 
    trailClassPublished.publish()

    return trailClassPublished
}
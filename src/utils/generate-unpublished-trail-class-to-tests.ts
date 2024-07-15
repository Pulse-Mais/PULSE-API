import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity"
import { CreateTrailClassInput } from "@/domain/entity/trail-class/trail-class-types"
import { generateFilledTrailClassToTests } from "./generate-filled-trail-class-to-tests"
import { generateUnfilledTrailClassToTests } from "./generate-unfilled-trail-class-to-tests"


export function generateUnpublishedTrailClassToTests(idTrail: string, filled?: boolean, contentType: "archive" | "article" | "video" = "archive"): TrailClass {

    if (filled) {
        return generateFilledTrailClassToTests(idTrail, contentType)
    }

    return generateUnfilledTrailClassToTests(idTrail)
}       
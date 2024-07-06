import { CreateTrailClassInput } from "@/domain/entity/trail-class/trail-class-types"
import { CreateTrailInputDomainService, RestoreTrailInputDomainService } from "./@types/trail-domain-service-types"
import { TrailDomainService } from "./trail-domain-service"
import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity"
import { ContentArchiveValueObject } from "../trail-class"

const trailDomainService = new TrailDomainService()

const input: CreateTrailInputDomainService = {
    title: "Título",
    subtitle: "Subtítulo",
    description: "Descrição"
}

const trailDefault = trailDomainService.createTrail(input)

describe("TrailDomainService", () => {

    it("deve ser possível criar uma trilha", () => {

        const input: CreateTrailInputDomainService = {
            title: "Título",
            subtitle: "Subtítulo",
            description: "Descrição"
        }

        const trail = trailDomainService.createTrail(input)

        expect(trail).toBeTruthy()
        expect(trail.getTitle()).toBe("Título")
        expect(trail.getSubtitle()).toBe("Subtítulo")
        expect(trail.getDescription()).toBe("Descrição")

    })

    it("deve ser possível restaurar uma trilha", () => {

        const input: RestoreTrailInputDomainService = {
            id: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "Título",
            subtitle: "Subtítulo",
            description: "Descrição",
            status: "not-published",
            trailClasses: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const trail = trailDomainService.restoreTrail(input)

        expect(trail).toBeTruthy()
        expect(trail.getTitle()).toBe("Título")
        expect(trail.getSubtitle()).toBe("Subtítulo")
        expect(trail.getDescription()).toBe("Descrição")
        expect(trail.getStatus()).toBe("not-published")

    })

    it("Deve ser possível publicar uma trilha", () => {

        const publishedTrailClass = generatePublishedTrailClass()
        trailDefault.addTrailClass(publishedTrailClass)

        const trailPublished = trailDomainService.publishTrail(trailDefault)
        expect(trailPublished.getStatus()).toEqual("published")

    })

})

function generatePublishedTrailClass(): TrailClass {
    const inputtrailClassPublished: CreateTrailClassInput = {
        idTrail: `${trailDefault.getId()}`,
        title: "Teste",
        description: "teste",
        subtitle: "teste",
        duration: 10,
    }

    const trailClassPublished = TrailClass.create(inputtrailClassPublished)

    trailClassPublished.setArchiveTrailClassContent(
        new ContentArchiveValueObject(
            `trilhas/trail-${trailDefault.getId()}/trailClass-${trailClassPublished.getId()}/`,
            "filled",
            "pdf"
        ))
   
    trailClassPublished.publish()

    return trailClassPublished
}
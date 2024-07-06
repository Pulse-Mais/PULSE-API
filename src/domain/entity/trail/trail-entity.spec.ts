import { InvalidTrailDomainException } from "@/domain/domain-exception/invalid-trail-domain-exception"
import { Trail } from "./trail-entity"
import { CreateTrailInput } from "./trail-types"
import { CreateTrailClassInput } from "../trail-class/trail-class-types"
import { TrailClass } from "../trail-class/trail-class-entity"
import { TrailClassAlreadyAddedOnTrailDomainException } from "@/domain/domain-exception/trail-class-already-added-on-trail-domain-exception"
import { TrailClassIsNotPartOfTheTrailDomainException } from "@/domain/domain-exception/trail-class-is-not-part-of-the-trail-domain-exception"
import { TrailAlreadyPublishedDomainException } from "@/domain/domain-exception/trail-already-published-domain-exception"
import { TrailDoesNotHaveEnoughClassesForPublicationDomainException } from "@/domain/domain-exception/trail-does-not-have-enough-classes-for-publication-domain-exception"
import { ContentArchiveValueObject } from "../value-objects/content-archive-value-object"


describe("(UnityTest) - TrailDomainEntity \n\n", () => {
    const inputdDefaultTrail: CreateTrailInput = {
        title: "Teste",
        subtitle: "teste",
        description: "teste",
    }

    const trailDefault = Trail.create(inputdDefaultTrail)

    const inputdDefaultTrailClass: CreateTrailClassInput = {
        idTrail: `${trailDefault.getId()}`,
        title: "Teste",
        description: "teste",
        subtitle: "teste",
        duration: 10,
    }

    const trailClassDefault = TrailClass.create(inputdDefaultTrailClass)


    it("(create) - Deve ser possível criar uma trilha se todos os dados forem válidos", () => {

        const input: CreateTrailInput = {
            title: "Teste",
            subtitle: "teste",
            description: "teste",
        }

        const trail = Trail.create(input)
        expect(trail).toBeTruthy()
        expect(trail).toBeInstanceOf(Trail)
        expect(trail.getTitle()).toEqual("Teste")
        expect(trail.getDescription()).toEqual("teste")
        expect(trail.getSubtitle()).toEqual("teste")

    })

    it("(restore) - Deve ser possível restaurar uma trilha se todos os dados forem válidos", () => {
        const trail = Trail.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            subtitle: "teste",
            description: "teste",
            status: "not-published",
            trailClasses: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        expect(trail).toBeTruthy()
        expect(trail).toBeInstanceOf(Trail)
        expect(trail.getTitle()).toEqual("Teste")
        expect(trail.getDescription()).toEqual("teste")
        expect(trail.getSubtitle()).toEqual("teste")
        expect(trail.getTrailClasses()).toEqual([])
        expect(trail.getStatus()).toEqual("not-published")

    })

    it("(restore) - Não deve ser possível restaurar uma trilha se todos os dados não forem válidos", () => {
        expect(() => Trail.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Te",
            subtitle: "teste",
            description: "teste",
            status: "not-published",
            trailClasses: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        })).toThrow(
            new InvalidTrailDomainException(
                "trail-entity.ts",
                "35",
                "title",
                "O título deve ter entre 5 e 70 caracteres."
            )
        )
    })

    it("(addTrailClass) - Deve ser possível adicionar uma aula a uma trilha", () => {

        trailDefault.addTrailClass(trailClassDefault)
        expect(trailDefault.getTrailClasses()).toEqual([trailClassDefault])

        const trailFinded = trailDefault.getTrailClassById(`${trailClassDefault.getId()}`)
        expect(trailFinded).toBeTruthy()
        expect(trailFinded).toEqual(trailClassDefault)
    })

    it("(addTrailClass) - Não deve ser possível adicionar uma aula a uma trilha se a aula já está na trilha", () => {

        expect(() => trailDefault.addTrailClass(trailClassDefault)).toThrow(
            new TrailClassAlreadyAddedOnTrailDomainException(
                "trail-entity.ts",
                "100"
            )
        )
    })


    it("(addTrailClass) - Não deve ser possível adicionar uma aula que não pertence a uma trilha", () => {

        const trailClassNotPartOfTrailInput: CreateTrailClassInput = {
            idTrail: `30e4779b-8ab7-4d95-9905-d88c9aef924c`,
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClassNotPartOfTrail = TrailClass.create(trailClassNotPartOfTrailInput)

        expect(() => trailDefault.addTrailClass(trailClassNotPartOfTrail)).toThrow(TrailClassIsNotPartOfTheTrailDomainException)
    })

    it("(getTrailClassById) - Deve ser possível recuperar uma aula se ela pertence a uma trilha", () => {

        expect(trailDefault.getTrailClassById(`${trailClassDefault.getId()}`)).toBeTruthy()
    })

    it("(publish) - Deve ser possível publicar uma trilha se houver ao menos uma aula publicada", () => {

        const inputtrailClassPublished: CreateTrailClassInput = {
            idTrail: `${trailDefault.getId()}`,
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClassPublished = TrailClass.create(inputtrailClassPublished)
        expect(trailClassPublished).toBeTruthy()
        expect(trailClassPublished).toBeInstanceOf(TrailClass)

        trailClassPublished.setArchiveTrailClassContent(new ContentArchiveValueObject(
            `trilhas/trail-${trailDefault.getId()}/trailClass-${trailClassPublished.getId()}/`,
            "filled",
            "pdf"
        ))

        expect(trailClassPublished.getContent()).toBeTruthy()
        expect(trailClassPublished.getContent()).toBeInstanceOf(ContentArchiveValueObject)

        trailClassPublished.publish()
        expect(trailClassPublished.getStatus()).toEqual("published")

        trailDefault.addTrailClass(trailClassPublished)

        trailDefault.publish()
        expect(trailDefault.getStatus()).toEqual("published")
    })

    it("(publish) - Não deve ser possível publicar uma trilha que já foi publicada", () => {

        expect(() => trailDefault.publish()).toThrow(TrailAlreadyPublishedDomainException)

    })

    it("(publish) - Não deve ser possível publicar uma trilha se não houver ao menos uma aula publicada", () => {

        const inputTrail: CreateTrailInput = {
            title: "Teste",
            subtitle: "teste",
            description: "teste",
        }

        const trail = Trail.create(inputTrail)

        const inputTrailClassNotPublished: CreateTrailClassInput = {
            idTrail: `${trail.getId()}`,
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClassNotPublished = TrailClass.create(inputTrailClassNotPublished)
        expect(trailClassNotPublished).toBeTruthy()
        expect(trailClassNotPublished).toBeInstanceOf(TrailClass)
        expect(trailClassNotPublished.getStatus()).toEqual("not-published")

        trail.addTrailClass(trailClassNotPublished)

        expect(() => trail.publish()).toThrow(TrailDoesNotHaveEnoughClassesForPublicationDomainException)

    })

})  
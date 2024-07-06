import { InvalidTrailClassPropetyDomainException } from "@/domain/domain-exception/invalid-trail-class-propety-domain-exception"
import { TrailClass } from "./trail-class-entity"
import { CreateTrailClassInput, RestoreTrailClassInput } from "./trail-class-types"
import { ContentNotFilledDomainException } from "@/domain/domain-exception/content-not-filled-domain-exception"
import { ClassAlreadyPublishedDomainException } from "@/domain/domain-exception/class-already-published-domain-exception"
import { ContentEmptyValueObject } from "../value-objects/content-empty-value-object"
import { ContentArchiveValueObject } from "../value-objects/content-archive-value-object"


describe("(UnityTest) - TrailClassDomainEntity \n\n", () => {

    const input: CreateTrailClassInput = {
        idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
        title: "Teste",
        description: "teste",
        subtitle: "teste",
        duration: 10,
    }

    const trailClassDefault = TrailClass.create(input)

    it("(create) - Deve ser possível criar uma aula se todos os dados forem válidos", () => {

        const input: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)

        expect(trailClass).toBeTruthy()
        expect(trailClass).toBeInstanceOf(TrailClass)
        expect(trailClass.getTitle()).toEqual("Teste")
        expect(trailClass.getDescription()).toEqual("teste")
        expect(trailClass.getSubtitle()).toEqual("teste")
        expect(trailClass.getDuration()).toEqual(10)
        expect(trailClass.getIdTrail()).toEqual("07e4779b-8ab7-4d95-9905-d88c9aef924c")
    })

    it("(create [idTrail]]) - Não deve ser possível criar uma aula com o idTrail inválido", () => {

        const input: CreateTrailClassInput = {
            idTrail: "aaaaaaaaaa",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        expect(() => TrailClass.create(input)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "idTrail"
            )
        )

    })


    it("(create [title]) - Não deve ser possível criar uma aula com o título vazio", () => {

        const inputWithEmptyTitle: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithEmptyTitle)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "title",
                "O título não pode ser vazio!"
            )
        )

    })

    it("(create [title]) - Não deve ser possível criar uma aula com o título menor que 5 caracteres", () => {

        const inputWithSmallTitle: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "titu",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithSmallTitle)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "title",
                "O título deve ter entre 5 e 70 caracteres."
            )
        )

    })

    it("(create [title]) - Não deve ser possível criar uma aula com o título maior que 70 caracteres", () => {

        const inputWithBigTitle: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "titulo muitooooooooooooooooooooooooooo grandeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithBigTitle)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "title",
                "O título deve ter entre 5 e 70 caracteres."
            )
        )

    })

    it("(create [title]) - Não deve ser possível criar uma aula com um título com sequências numéricas", () => {

        const inputWithNumericTitle: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "12342542",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithNumericTitle)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "title",
                "O título não pode conter sequências numéricas."
            )
        )

    })

    it("(create [subtitle]) - Não deve ser possível criar uma aula com o subtítulo vazio", () => {

        const inputWithEmptySubtitle: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "Teste",
            subtitle: "",
            description: "teste",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithEmptySubtitle)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "subtitle",
                "O subtítulo não pode ser vazio!"
            )
        )

    })

    it("(create [subtitle]) - Não deve ser possível criar uma aula com o subtítulo menor que 5 caracteres", () => {

        const inputWithSmallSubtitle: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "Teste",
            subtitle: "test",
            description: "teste",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithSmallSubtitle)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "subtitle",
                "O subtítulo deve ter entre 5 e 70 caracteres."
            )
        )

    })

    it("(create [subtitle]) - Não deve ser possível criar uma aula com o subtítulo maior que 70 caracteres", () => {

        const inputWithBigSubtitle: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "titulo normal, tranquilo.",
            subtitle: "subtitulo muitooooooooooooooooooooooooooo grandeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            description: "teste",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithBigSubtitle)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "subtitle",
                "O subtítulo deve ter entre 5 e 70 caracteres."
            )
        )

    })


    it("(create [subtitle]) - Não deve ser possível criar uma aula com um subtítulo com sequências numéricas", () => {

        const inputWithNumericSubtitle: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "Sem numeros.",
            subtitle: "12342542",
            description: "teste",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithNumericSubtitle)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "subtitle",
                "O subtítulo não pode conter sequências numéricas."
            )
        )

    })

    it("(create [description]) - Não deve ser possível criar uma aula com a descrição vazia", () => {

        const inputWithEmptyDescription: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "Sem numeros.",
            subtitle: "subtítulo válido.",
            description: "",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithEmptyDescription)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "description",
                "A descrição não pode ser vazia!"
            )
        )
    })

    it("(create [description]) - Não deve ser possível criar uma aula com caracteres inválidos na descrição", () => {

        const inputWithInvalidCharactersDescription: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "Sem numeros.",
            subtitle: "subtítulo válido.",
            description: "////////////aaaaa#$%&",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithInvalidCharactersDescription)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "description",
                "A descrição contém caracteres inválidos. \n Caracteres inválidos encontrados: /"
            )
        )
    })

    it("(create [description]) - Não deve ser possível criar uma aula com sequências numéricas muito longas na descrição", () => {

        const inputWithLongNumericSequenceDescription: CreateTrailClassInput = {
            idTrail: "07e4779b-8ab7-4d95-9905-d88c9aef924c",

            title: "Sem numeros.",
            subtitle: "subtítulo válido.",
            description: "1234254210414014010401",
            duration: 10,
        }

        expect(() => TrailClass.create(inputWithLongNumericSequenceDescription)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "description",
                "a descrição não pode conter sequências numéricas muito longas."
            )
        )
    })


    it("(restore) - Deve ser possível restaurar uma aula se todos os dados forem válidos", () => {
        const trailClass = TrailClass.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            idTrail: "10e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            subtitle: "teste",
            description: "teste",
            duration: 10,
            status: "not-published",
            content: new ContentEmptyValueObject(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        expect(trailClass).toBeTruthy()
        expect(trailClass.getTitle()).toEqual("Teste")
        expect(trailClass.getDescription()).toEqual("teste")
        expect(trailClass.getSubtitle()).toEqual("teste")
        expect(trailClass.getDuration()).toEqual(10)
        expect(trailClass.getIdTrail()).toEqual("10e4779b-8ab7-4d95-9905-d88c9aef924c")
    })

    it("(restore [id]) - Não deve ser possível restaurar uma aula se o id não for válido", () => {
        expect(() => TrailClass.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c22",
            idTrail: "10e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            subtitle: "teste",
            description: "teste",
            duration: 10,
            status: "not-published",
            content: new ContentEmptyValueObject(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "id"
            )
        )
    })

    it("(restore [idTrail]) - Não deve ser possível restaurar uma aula se o idTrail não for válido", () => {
        expect(() => TrailClass.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            idTrail: "10e4779b-8ab7-4d95-9905-d88c9aef924c22",
            title: "Teste",
            subtitle: "teste",
            description: "teste",
            duration: 10,
            status: "not-published",
            content: new ContentEmptyValueObject(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "idTrail"
            )
        )
    })

    it("(restore [title]) - Não deve ser possível restaurar uma aula com o título inválido", () => {
        expect(() => TrailClass.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            idTrail: "10e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "",
            subtitle: "teste",
            description: "teste",
            duration: 10,
            status: "not-published",
            content: new ContentEmptyValueObject(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "title",
                "O título não pode ser vazio!"
            )
        )
    })

    it("(restore [subtitle]) - Não deve ser possível restaurar uma aula com o subtítulo inválido", () => {
        expect(() => TrailClass.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            idTrail: "10e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            subtitle: "",
            description: "teste",
            duration: 10,
            status: "not-published",
            content: new ContentEmptyValueObject(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "subtitle",
                "O subtítulo não pode ser vazio!"
            )
        )
    })

    it("(restore [description]) - Não deve ser possível restaurar uma aula com a descrição inválida", () => {
        expect(() => TrailClass.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            idTrail: "10e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            subtitle: "teste",
            description: "",
            duration: 10,
            status: "not-published",
            content: new ContentEmptyValueObject(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "description",
                "A descrição não pode ser vazia!"
            )
        )
    })

    it("(restore [content]) - Não deve ser possível restaurar uma aula se as propriedades de content não forem válidas", () => {
        expect(() => TrailClass.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            idTrail: "10e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            subtitle: "teste",
            description: "teste",
            duration: 10,
            status: "not-published",
            content: new ContentArchiveValueObject("a", "in-upload", "pptx"),
            createdAt: new Date(),
            updatedAt: new Date(),
        })).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "content",
                "o prexifo da key é inválido."
            )
        )
    })


    it("(restore [status]) - Não deve ser possível restaurar uma aula com status 'published' com o conteúdo vazio", () => {

        expect(() => TrailClass.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            idTrail: "10e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            subtitle: "teste",
            description: "teste",
            duration: 10,
            status: "published",
            content: new ContentEmptyValueObject(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "status",
                `status inválido. O status não pode ser "published" se o conteúdo não for válido`
            )
        )
    })

    it("(restore [status]) - Não deve ser possível restaurar uma aula com status 'published' com o conteúdo em upload", () => {

        expect(() => TrailClass.restore({
            id: "07e4779b-8ab7-4d95-9905-d88c9aef924c",
            idTrail: "10e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            subtitle: "teste",
            description: "teste",
            duration: 10,
            status: "published",
            content: new ContentArchiveValueObject("a", "in-upload", "pptx"),
            createdAt: new Date(),
            updatedAt: new Date(),
        })).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "35",
                "status",
                `status inválido. O status não pode ser "published" se o conteúdo não for válido`
            )
        )
    })

    it("(setArchiveTrailClassContent) - Deve ser possível alterar o conteúdo de uma aula não publicada, para conteúdo do tipo arquivo", () => {
        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)

        expect(trailClass).toBeTruthy()
        expect(trailClass).toBeInstanceOf(TrailClass)
        expect(trailClass.getTitle()).toEqual("Teste")
        expect(trailClass.getDescription()).toEqual("teste")
        expect(trailClass.getSubtitle()).toEqual("teste")
        expect(trailClass.getIdTrail()).toEqual("50e4779b-8ab7-4d95-9905-d88c9aef924c")
        expect(trailClass.getContent()).toBeTruthy()
        expect(trailClass.getContent()).toBeInstanceOf(ContentEmptyValueObject)
        expect(trailClass.getContent()).toEqual(new ContentEmptyValueObject())

        trailClass.setArchiveTrailClassContent(new ContentArchiveValueObject(`trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${trailClass.getId()}/`, "in-upload", "pptx"))

        expect(trailClass.getContent()).toBeTruthy()
        expect(trailClass.getContent()).toBeInstanceOf(ContentArchiveValueObject)
        expect(trailClass.getContent()).toEqual(new ContentArchiveValueObject(`trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${trailClass.getId()}/`, "in-upload", "pptx"))

        const content = trailClass.getContent()! as ContentArchiveValueObject
        expect(content.key).toEqual(`trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${trailClass.getId()}/`)
    })

    it("(setArchiveTrailClassContent) - Deve lançar uma exceção se o prefixo da key for inválido", () => {
        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)
        const invalidContent = new ContentArchiveValueObject(`invalidPrefix/trailClass-${trailClass.getId()}/`, "in-upload", "pptx")

        expect(() => trailClass.setArchiveTrailClassContent(invalidContent)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "324",
                "content",
                `o prexifo da key é inválido.`
            )
        )
    })

    it("(setArchiveTrailClassContent) - Deve lançar uma exceção se o tamanho da key for inválido", () => {
        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)
        const invalidContent = new ContentArchiveValueObject(`trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-/shortkey`, "in-upload", "pptx")

        expect(() => trailClass.setArchiveTrailClassContent(invalidContent)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O tamanho da key da aula é inválido.`
            )
        )
    })

    it("(setArchiveTrailClassContent) - Deve lançar uma exceção se o formato do id da trilha for inválido", () => {
        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)
        const invalidIdTrail = "00e4779b-8ab7-aaaaaaaa9905-d80000ef924c"
        const invalidContent = new ContentArchiveValueObject(`trilhas/trail-${invalidIdTrail}/trailClass-${trailClass.getId()}/`, "in-upload", "pptx")

        expect(() => trailClass.setArchiveTrailClassContent(invalidContent)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `o prexifo da key é inválido.`
            )
        )
    })

    it("(setArchiveTrailClassContent) - Deve lançar uma exceção se o formato do id da aula for inválido", () => {
        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)
        const invalidContent = new ContentArchiveValueObject(`trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-0000009b-8ab7-4d95-00000-d88c9aef924c/`, "in-upload", "pptx")

        expect(() => trailClass.setArchiveTrailClassContent(invalidContent)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O formato do id da aula presente da key da aula é inválido.`
            )
        )
    })

    it("(setArchiveTrailClassContent) - Deve lançar uma exceção se o id da trilha na key não corresponder ao id da trilha da aula", () => {
        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)
        const invalidIdTrail = "00e4779b-8ab7-4d95-9905-d88c9aef924c"
        const invalidContent = new ContentArchiveValueObject(`trilhas/trail-${invalidIdTrail}/trailClass-${trailClass.getId()}/`, "in-upload", "pptx")

        expect(() => trailClass.setArchiveTrailClassContent(invalidContent)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `o prexifo da key é inválido.`
            )
        )
    })

    it("(setArchiveTrailClassContent) - Deve lançar uma exceção se o id da aula na key não corresponder ao id da aula", () => {
        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)
        const invalidIdTrailClass = "50e4779b-8ab7-4d95-9905-d88c9aef924c"
        const invalidContent = new ContentArchiveValueObject(`trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${invalidIdTrailClass}/`, "in-upload", "pptx")

        expect(() => trailClass.setArchiveTrailClassContent(invalidContent)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `O id da aula presente na key da aula não é igual ao id da aula.`
            )
        )
    })

    it("(cleanTrailClassContent) - Deve ser possível limpar o conteúdo de uma aula não publicada", () => {

        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)

        expect(trailClass).toBeTruthy()
        expect(trailClass).toBeInstanceOf(TrailClass)
        expect(trailClass.getTitle()).toEqual("Teste")
        expect(trailClass.getDescription()).toEqual("teste")
        expect(trailClass.getSubtitle()).toEqual("teste")
        expect(trailClass.getIdTrail()).toEqual("50e4779b-8ab7-4d95-9905-d88c9aef924c")

        expect(trailClass.getContent()).toEqual(new ContentEmptyValueObject())

        trailClass.setArchiveTrailClassContent(new ContentArchiveValueObject(`trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${trailClass.getId()}/`, "in-upload", "pptx"))
        expect(trailClass.getContent()).toEqual(new ContentArchiveValueObject(`trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${trailClass.getId()}/`, "in-upload", "pptx"))

        trailClass.cleanTrailClassContent()
        expect(trailClass.getContent()).toEqual(new ContentEmptyValueObject())
    })
















    it("(updateTitle) - Deve alterar o título caso seja válido", () => {

        trailClassDefault.updateTitle("Teste")
        expect(trailClassDefault.getTitle()).toEqual("Teste")

        trailClassDefault.updateTitle("Teste? Teste! Teste. têste ção são")
        expect(trailClassDefault.getTitle()).toEqual("Teste? Teste! Teste. têste ção são")

        trailClassDefault.updateTitle("canção, são paulo. ácento cràse.")
        expect(trailClassDefault.getTitle()).toEqual("canção, são paulo. ácento cràse.")

        trailClassDefault.updateTitle("Diz ai qual é o planooo, que eu vou chegar voandooo!")
        expect(trailClassDefault.getTitle()).toEqual("Diz ai qual é o planooo, que eu vou chegar voandooo!")

    })

    it("(updateTitle) - Não deve alterar o título caso não seja válido", () => {

        expect(() => trailClassDefault.updateTitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "85",
                "title",
                `O título contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )

        expect(() => trailClassDefault.updateTitle("12342542")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "85",
                "title",
                `O título não pode conter sequências numéricas.`
            )
        )

        expect(() => trailClassDefault.updateTitle("")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "55",
                "title",
                "O título não pode ser vazio!"
            )
        )

        expect(() => trailClassDefault.updateTitle("abcd")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "85",
                "title",
                `O título deve ter entre 5 e 70 caracteres.`
            )
        )

    })

    it("(updateSubtitle) - Deve alterar o subtítulo caso seja válido", () => {

        trailClassDefault.updateSubtitle("Teste")
        expect(trailClassDefault.getSubtitle()).toEqual("Teste")

        trailClassDefault.updateSubtitle("Teste? Teste! Teste. têste ção são")
        expect(trailClassDefault.getSubtitle()).toEqual("Teste? Teste! Teste. têste ção são")

        trailClassDefault.updateSubtitle("canção, são paulo. ácento cràse.")
        expect(trailClassDefault.getSubtitle()).toEqual("canção, são paulo. ácento cràse.")

        trailClassDefault.updateSubtitle("Diz ai qual é o planooo, que eu vou chegar voandooo!")
        expect(trailClassDefault.getSubtitle()).toEqual("Diz ai qual é o planooo, que eu vou chegar voandooo!")

    })


    it("(updateSubtitle) - Não deve alterar o subtítulo caso não seja válido", () => {

        expect(() => trailClassDefault.updateSubtitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "131",
                "subtitle",
                `O subtítulo contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )

        expect(() => trailClassDefault.updateSubtitle("12342542")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "140",
                "subtitle",
                `O subtítulo não pode conter sequências numéricas.`
            )
        )

        expect(() => trailClassDefault.updateSubtitle("")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "113",
                "subtitle",
                `O subtítulo não pode ser vazio!`
            )
        )


        expect(() => trailClassDefault.updateSubtitle("abcd")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "149",
                "subtitle",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        )

    })

    it("(updateDescription) - Deve alterar a descrição caso seja válida", () => {

        trailClassDefault.updateDescription("Eleve sua habilidade financeira com nosso curso de Inteligência Financeira. Ideal para iniciantes ou para aqueles que procuram aprimorar seus conhecimentos, este curso oferece estratégias para gerenciar melhor suas finanças pessoais. Você aprenderá sobre orçamento, investimentos, gestão de dívidas e planejamento financeiro para alcançar a segurança financeira. Transforme sua relação com o dinheiro e tome decisões financeiras mais inteligentes.")
        expect(trailClassDefault.getDescription()).toEqual("Eleve sua habilidade financeira com nosso curso de Inteligência Financeira. Ideal para iniciantes ou para aqueles que procuram aprimorar seus conhecimentos, este curso oferece estratégias para gerenciar melhor suas finanças pessoais. Você aprenderá sobre orçamento, investimentos, gestão de dívidas e planejamento financeiro para alcançar a segurança financeira. Transforme sua relação com o dinheiro e tome decisões financeiras mais inteligentes.")

    })

    it("(updateDescription) - Não deve alterar a descrição caso não seja válida", () => {

        expect(() => trailClassDefault.updateDescription("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "180",
                "description",
                `A descrição contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )

    })

    it("(updateDuration) - Deve alterar a duração caso seja válida", () => {

        trailClassDefault.updateDuration(10)
        expect(trailClassDefault.getDuration()).toEqual(10)

        trailClassDefault.updateDuration(30)
        expect(trailClassDefault.getDuration()).toEqual(30)

        trailClassDefault.updateDuration(25)
        expect(trailClassDefault.getDuration()).toEqual(25)
    })

    it("(updateDuration) - Não deve alterar a duração caso não seja válida", () => {

        expect(() => trailClassDefault.updateDuration(0)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "140",
                "duration",
                "O tempo de duração de uma aula precisa ser igual ou maior a 1 minuto."
            )
        )

        expect(() => trailClassDefault.updateDuration(30.1)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "140",
                "duration",
                "O tempo de duração de uma aula deve ser igual ou menor que 30 minutos."
            )
        )

        expect(() => trailClassDefault.updateDuration(60)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-entity.ts",
                "140",
                "duration",
                "O tempo de duração de uma aula deve ser igual ou menor que 30 minutos."
            )
        )

    })

    it("(publish) - Não deve possível publicar uma aula sem conteúdo", () => {

        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)

        expect(trailClass).toBeTruthy()
        expect(trailClass).toBeInstanceOf(TrailClass)
        expect(trailClass.getTitle()).toEqual("Teste")
        expect(trailClass.getDescription()).toEqual("teste")
        expect(trailClass.getSubtitle()).toEqual("teste")
        expect(trailClass.getIdTrail()).toEqual("50e4779b-8ab7-4d95-9905-d88c9aef924c")


        expect(trailClass.getContent()).toEqual(new ContentEmptyValueObject())

        expect(() => trailClass.publish()).toThrow(ContentNotFilledDomainException)
    })

    it("(publish) - Deve ser possível publicar uma aula com conteúdo válido", () => {
        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)

        expect(trailClass).toBeTruthy()
        expect(trailClass).toBeInstanceOf(TrailClass)
        expect(trailClass.getTitle()).toEqual("Teste")
        expect(trailClass.getDescription()).toEqual("teste")
        expect(trailClass.getSubtitle()).toEqual("teste")
        expect(trailClass.getIdTrail()).toEqual("50e4779b-8ab7-4d95-9905-d88c9aef924c")
        expect(trailClass.getContent()).toEqual(new ContentEmptyValueObject())

        trailClass.setArchiveTrailClassContent(
            new ContentArchiveValueObject(
                `trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${trailClass.getId()}/`,
                "filled",
                "pptx"
            )
        )

        expect(trailClass.getContent()).toEqual(
            new ContentArchiveValueObject(
                `trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${trailClass.getId()}/`,
                "filled",
                "pptx"
            ))

        trailClass.publish()
        expect(trailClass.getStatus()).toEqual("published")
    })

    it("(publish) - Não deve ser possível publicar uma já publicada", () => {
        const input: CreateTrailClassInput = {
            idTrail: "50e4779b-8ab7-4d95-9905-d88c9aef924c",
            title: "Teste",
            description: "teste",
            subtitle: "teste",
            duration: 10,
        }

        const trailClass = TrailClass.create(input)

        expect(trailClass).toBeTruthy()
        expect(trailClass).toBeInstanceOf(TrailClass)
        expect(trailClass.getTitle()).toEqual("Teste")
        expect(trailClass.getDescription()).toEqual("teste")
        expect(trailClass.getSubtitle()).toEqual("teste")
        expect(trailClass.getIdTrail()).toEqual("50e4779b-8ab7-4d95-9905-d88c9aef924c")
        expect(trailClass.getContent()).toEqual(new ContentEmptyValueObject())

        trailClass.setArchiveTrailClassContent(
            new ContentArchiveValueObject(
                `trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${trailClass.getId()}/`,
                "filled",
                "pptx"
            )
        )

        expect(trailClass.getContent()).toEqual(
            new ContentArchiveValueObject(
                `trilhas/trail-50e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-${trailClass.getId()}/`,
                "filled",
                "pptx"
            ))

        trailClass.publish()
        expect(trailClass.getStatus()).toEqual("published")
        expect(() => trailClass.publish()).toThrow(ClassAlreadyPublishedDomainException)
    })







})
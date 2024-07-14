import {
    Trail,
    InvalidTrailPropetyDomainException,
    TrailClass,
    TrailNotFoundApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    PublishTrailClassOutputDTO,
    PublishTrailClassInputDTO,
    PublishTrailClassUseCase,
    mockTrailRepository,
    mockTrailClassRepository,
    generateFilledTrailClassToTests
} from "./index"


describe("PublishTrailClassUseCase", () => {
    const defaultTrailInput = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }

    const defaultTrail = Trail.create(defaultTrailInput)
    defaultTrail.setId("0799d17e-7e55-4d74-99d7-ab07de38ad7e")

    const defaultTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)
    defaultTrail.setTrailClasses([defaultTrailClass])

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
        mockTrailClassRepository.save = vi.fn().mockResolvedValue(defaultTrailClass)
    })

    it("Deve publicar a aula de trilha com sucesso", async () => {
        const publishTrailClassUseCase = new PublishTrailClassUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: PublishTrailClassInputDTO = {
            idTrailClass: defaultTrailClass.getId()!,
            idTrail: defaultTrail.getId()!,
        }

        const output: PublishTrailClassOutputDTO = await publishTrailClassUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.idTrail).toBe(defaultTrail.getId())
        expect(output.idTrailClass).toBe(defaultTrailClass.getId())
        expect(output.title).toBe(defaultTrailClass.getTitle())
        expect(output.status).toBe("published")
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)

        const publishTrailClassUseCase = new PublishTrailClassUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: PublishTrailClassInputDTO = {
            idTrail: "invalid-id",
            idTrailClass: "invalid-class-id"
        }

        await expect(publishTrailClassUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException("publish-trail-class-use-case", "30")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith("invalid-id")
    })

    it("Deve lançar uma exceção quando a aula não for salva no repositório", async () => {
        const unpublishedTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)
        defaultTrail.setTrailClasses([unpublishedTrailClass])

        mockTrailClassRepository.save = vi.fn().mockResolvedValue(null)
        const publishTrailClassUseCase = new PublishTrailClassUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: PublishTrailClassInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: unpublishedTrailClass.getId()!
        }

        await expect(publishTrailClassUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailClassNotSavedOnRepositoryApplicationException("publish-trail-class-use-case", "35")
        )

        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))
    })

    it("Deve lançar uma exceção se o idTrail não estiver definido", async () => {
        const invalidTrail = Trail.create(defaultTrailInput)

        const unpublishedTrailClass = generateFilledTrailClassToTests(invalidTrail.getId()!)
        invalidTrail.setTrailClasses([unpublishedTrailClass])

        invalidTrail.getId = () => undefined
        mockTrailRepository.findById = vi.fn().mockResolvedValue(invalidTrail)

        const publishTrailClassUseCase = new PublishTrailClassUseCase(mockTrailRepository, mockTrailClassRepository)
        const inputDTO: PublishTrailClassInputDTO = {
            idTrail: invalidTrail.getId()!,
            idTrailClass: unpublishedTrailClass.getId()!
        }

        await expect(publishTrailClassUseCase.execute(inputDTO)).rejects.toThrow(
            new InvalidTrailPropetyDomainException("publish-trail-class-use-case", "38", "idTrail")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(undefined)
    })

    it("Deve lançar uma exceção se o idTrailClass não estiver definido", async () => {
        const invalidTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)
        invalidTrailClass.getId = () => undefined

        defaultTrail.setTrailClasses([invalidTrailClass])
        console.log("default", defaultTrail)

        mockTrailClassRepository.save = vi.fn().mockResolvedValue(invalidTrailClass)
        const publishTrailClassUseCase = new PublishTrailClassUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: PublishTrailClassInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: invalidTrailClass.getId()!
        }

        await expect(publishTrailClassUseCase.execute(inputDTO)).rejects.toThrow(
            new InvalidTrailPropetyDomainException("publish-trail-class-use-case", "43", "idTrailClass")
        )
        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))
    })

    it("Deve lançar uma exceção se o título não estiver definido", async () => {
        const invalidTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)
        invalidTrailClass.getTitle = () => undefined

        defaultTrail.setTrailClasses([invalidTrailClass])
        mockTrailClassRepository.save = vi.fn().mockResolvedValue(invalidTrailClass)

        const publishTrailClassUseCase = new PublishTrailClassUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: PublishTrailClassInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: invalidTrailClass.getId()!
        }

        await expect(publishTrailClassUseCase.execute(inputDTO)).rejects.toThrow(
            new InvalidTrailPropetyDomainException("publish-trail-class-use-case", "48", "title")
        )
        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))
    })

    it("Deve lançar uma exceção se o status não estiver definido ou não for 'published'", async () => {
        const invalidTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)
        invalidTrailClass.getStatus = () => "not-published"

        defaultTrail.setTrailClasses([invalidTrailClass])
        mockTrailClassRepository.save = vi.fn().mockResolvedValue(invalidTrailClass)

        const publishTrailClassUseCase = new PublishTrailClassUseCase(mockTrailRepository, mockTrailClassRepository)
        const inputDTO: PublishTrailClassInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: invalidTrailClass.getId()!
        }

        await expect(publishTrailClassUseCase.execute(inputDTO)).rejects.toThrow(
            new InvalidTrailPropetyDomainException("publish-trail-class-use-case", "52", "status")
        )
        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))
    })
})

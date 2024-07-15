import {
    Trail,
    TrailClass,
    TrailNotFoundApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    InvalidTrailClassPropetyDomainException,
    UpdateTrailClassInfoUseCase,
    UpdateTrailClassInfoInputDTO,
    UpdateTrailClassInfoOutputDTO,
    mockTrailRepository,
    mockTrailClassRepository,
    generateFilledTrailClassToTests
} from "./index"


describe("UpdateTrailClassInfoUseCase", () => {
    const defaultTrailInput = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }

    const defaultTrail = Trail.create(defaultTrailInput)
    const defaultTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)

    defaultTrail.setTrailClasses([defaultTrailClass])

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
        mockTrailClassRepository.save = vi.fn().mockResolvedValue(defaultTrailClass)
    })

    it("Deve atualizar as informações da aula de trilha com sucesso", async () => {
        const updateTrailClassInfoUseCase = new UpdateTrailClassInfoUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: UpdateTrailClassInfoInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: defaultTrailClass.getId()!,
            newTitle: "Novo Título",
            newSubtitle: "Novo Subtítulo",
            newDescription: "Nova Descrição"
        }

        const output: UpdateTrailClassInfoOutputDTO = await updateTrailClassInfoUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.idTrail).toBe(defaultTrail.getId())
        expect(output.idTrailClass).toBe(defaultTrailClass.getId())
        expect(output.title).toBe("Novo Título")
        expect(output.subtitle).toBe("Novo Subtítulo")
        expect(output.description).toBe("Nova Descrição")
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))


    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const updateTrailClassInfoUseCase = new UpdateTrailClassInfoUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: UpdateTrailClassInfoInputDTO = {
            idTrail: "invalid-id",
            idTrailClass: defaultTrailClass.getId()!,
            newTitle: "Novo Título",
            newSubtitle: "Novo Subtítulo",
            newDescription: "Nova Descrição"
        }

        await expect(updateTrailClassInfoUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException("create-trail-class-use-case.ts", "34")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith("invalid-id")
    })

    it("Deve lançar uma exceção quando a aula de trilha não é salva no repositório", async () => {
        mockTrailClassRepository.save = vi.fn().mockResolvedValue(null)
        const updateTrailClassInfoUseCase = new UpdateTrailClassInfoUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: UpdateTrailClassInfoInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: defaultTrailClass.getId()!,
            newTitle: "Novo Título",
            newSubtitle: "Novo Subtítulo",
            newDescription: "Nova Descrição"
        }

        await expect(updateTrailClassInfoUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailClassNotSavedOnRepositoryApplicationException("create-trail-class-use-case.ts", "37")
        )
        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))
    })

    it("Deve lançar uma exceção se o idTrailClass não estiver definido", async () => {
        const invalidTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)
        invalidTrailClass.getId = () => undefined

        mockTrailClassRepository.save = vi.fn().mockResolvedValue(invalidTrailClass)
        defaultTrail.setTrailClasses([invalidTrailClass])

        const updateTrailClassInfoUseCase = new UpdateTrailClassInfoUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: UpdateTrailClassInfoInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: invalidTrailClass.getId()!,
            newTitle: "Novo Título",
            newSubtitle: "Novo Subtítulo",
            newDescription: "Nova Descrição"
        }

        await expect(updateTrailClassInfoUseCase.execute(inputDTO)).rejects.toThrow(
            new InvalidTrailClassPropetyDomainException("create-trail-class-use-case.ts", "41", "idTrailClass")
        )
        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))
    })

    it("Deve lançar uma exceção se o título não estiver definido", async () => {
        const invalidTrailClass =  generateFilledTrailClassToTests(defaultTrail.getId()!)
        invalidTrailClass.getTitle = () => undefined

        mockTrailClassRepository.save = vi.fn().mockResolvedValue(invalidTrailClass)
        defaultTrail.setTrailClasses([invalidTrailClass])

        const updateTrailClassInfoUseCase = new UpdateTrailClassInfoUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: UpdateTrailClassInfoInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: invalidTrailClass.getId()!,
            newTitle: "Novo Título",
            newSubtitle: "Novo Subtítulo",
            newDescription: "Nova Descrição"
        }

        await expect(updateTrailClassInfoUseCase.execute(inputDTO)).rejects.toThrow(
            new InvalidTrailClassPropetyDomainException("create-trail-class-use-case.ts", "38", "title")
        )
        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))
    })

    it("Deve lançar uma exceção se o subtítulo não estiver definido", async () => {
        const invalidTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)
        invalidTrailClass.getSubtitle = () => undefined

        mockTrailClassRepository.save = vi.fn().mockResolvedValue(invalidTrailClass)
        defaultTrail.setTrailClasses([invalidTrailClass])

        const updateTrailClassInfoUseCase = new UpdateTrailClassInfoUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: UpdateTrailClassInfoInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: invalidTrailClass.getId()!,
            newTitle: "Novo Título",
            newSubtitle: "Novo Subtítulo",
            newDescription: "Nova Descrição"
        }

        await expect(updateTrailClassInfoUseCase.execute(inputDTO)).rejects.toThrow(
            new InvalidTrailClassPropetyDomainException("create-trail-class-use-case.ts", "43", "subtitle")
        )
        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))
    })

    it("Deve lançar uma exceção se a descrição não estiver definida", async () => {
        const invalidTrailClass = generateFilledTrailClassToTests(defaultTrail.getId()!)
        invalidTrailClass.getDescription = () => undefined

        mockTrailClassRepository.save = vi.fn().mockResolvedValue(invalidTrailClass)
        defaultTrail.setTrailClasses([invalidTrailClass])

        const updateTrailClassInfoUseCase = new UpdateTrailClassInfoUseCase(mockTrailRepository, mockTrailClassRepository)

        const inputDTO: UpdateTrailClassInfoInputDTO = {
            idTrail: defaultTrail.getId()!,
            idTrailClass: invalidTrailClass.getId()!,
            newTitle: "Novo Título",
            newSubtitle: "Novo Subtítulo",
            newDescription: "Nova Descrição"
        }

        await expect(updateTrailClassInfoUseCase.execute(inputDTO)).rejects.toThrow(
            new InvalidTrailClassPropetyDomainException("create-trail-class-use-case.ts", "48", "description")
        )
        expect(mockTrailClassRepository.save).toHaveBeenCalledWith(expect.any(TrailClass))
    })
})

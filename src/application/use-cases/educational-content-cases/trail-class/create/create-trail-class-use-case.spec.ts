import {
    TrailNotFoundApplicationException,
    CreateTrailClassUseCase,
    CreateTrailClassInputDTO,
    CreateTrailClassOutputDTO,
    InvalidTrailPropetyDomainException,
    TrailClassNotSavedOnRepositoryApplicationException,
    TrailClass,
    Trail,
    mockTrailRepository,
    mockTrailClassRepository
} from "./index"

describe("CreateTrailClassUseCase", () => {

    const defaultTrailInputDTO = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }

    const defaultTrailCreated = Trail.create(defaultTrailInputDTO)
    defaultTrailCreated.setId("0799d17e-7e55-4d74-99d7-ab07de38ad7e")

    const defaultTrailClassInputDTO = {
        idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
        title: "Título",
        subtitle: "Subtítulo",
        description: "Descrição",
        duration: 20
    }

    const defaultTrailClassCreated = TrailClass.create(defaultTrailClassInputDTO)
    defaultTrailCreated.setTrailClasses([defaultTrailClassCreated])

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrailCreated)
        mockTrailClassRepository.save = vi.fn().mockResolvedValue(defaultTrailClassCreated)
    })

    it("Deve criar a aula", async () => {
        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)
        const output: CreateTrailClassOutputDTO = await createTrailClassUseCase.execute(defaultTrailClassInputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClass).toEqual(defaultTrailClassCreated)
        expect(mockTrailClassRepository.save).toHaveBeenCalledTimes(1)
    })

    it("Não deve criar a aula, caso não encontre a Trilha no banco", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)

        await expect(createTrailClassUseCase.execute(defaultTrailClassInputDTO)).rejects.toThrow(TrailNotFoundApplicationException)
        expect(mockTrailRepository.findById).toHaveBeenCalledTimes(1)
        expect(mockTrailClassRepository.save).toHaveBeenCalledTimes(0)
    })

    it("Deve lançar uma exceção se o idTrail não estiver definido", async () => {
        const invalidTrail = { ...defaultTrailCreated, getId: () => undefined }
        mockTrailRepository.findById = vi.fn().mockResolvedValue(invalidTrail)
        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)

        await expect(createTrailClassUseCase.execute(defaultTrailClassInputDTO)).rejects.toThrow(
            new InvalidTrailPropetyDomainException("create-trail-class-use-case", "36", "idTrail")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledTimes(1)
        expect(mockTrailClassRepository.save).toHaveBeenCalledTimes(0)
    })

    it("Deve lançar uma exceção quando a aula não for salva no repositório", async () => {
        mockTrailClassRepository.save = vi.fn().mockResolvedValue(null)
        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)

        await expect(createTrailClassUseCase.execute(defaultTrailClassInputDTO)).rejects.toThrow(
            new TrailClassNotSavedOnRepositoryApplicationException("aaaaaaaaaaaaaa", "58")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledTimes(1)
        expect(mockTrailClassRepository.save).toHaveBeenCalledTimes(1)
    })

    it("Não deve criar a aula caso o inputDTO seja inválido", async () => {
        const createTrailClassUseCase = new CreateTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)

        const InvalidTitleTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "1949141901---225-15]]248/",
            subtitle: "Subtítulo",
            description: "Descrição",
            duration: 20
        }

        const InvalidSubtitleTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "Título",
            subtitle: "1949141901---225-15]]248/",
            description: "Descrição",
            duration: 20
        }

        const InvalidDescriptionTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
            title: "Título",
            subtitle: "Subtítulo",
            description: "",
            duration: 20
        }

        const allInvalidTrailClassInputDTO: CreateTrailClassInputDTO = {
            idTrail: "aaaaaaaaa",
            title: "titulo valido",
            subtitle: "",
            description: "",
            duration: 0
        }

        await expect(createTrailClassUseCase.execute(InvalidTitleTrailClassInputDTO)).rejects.toThrow()
        await expect(createTrailClassUseCase.execute(InvalidSubtitleTrailClassInputDTO)).rejects.toThrow()
        await expect(createTrailClassUseCase.execute(InvalidDescriptionTrailClassInputDTO)).rejects.toThrow()
        await expect(createTrailClassUseCase.execute(allInvalidTrailClassInputDTO)).rejects.toThrow()
    })
})

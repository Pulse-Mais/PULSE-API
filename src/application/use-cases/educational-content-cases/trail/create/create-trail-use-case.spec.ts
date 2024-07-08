import {
    Trail,
    CreateTrailInputDTO,
    TrailClassNotSavedOnRepositoryApplicationException,
    mockTrailRepository,
    mockStorageService,
    CreateTrailUseCase,
    describe, it, expect, vi
} from "./index"

describe("UnitTests - CreateTrailUseCase", () => {

    const defautlInputDTO: CreateTrailInputDTO = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }
    const defaultTrailCreated: Trail = Trail.create(defautlInputDTO)

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrailCreated)
        mockTrailRepository.save = vi.fn().mockResolvedValue(defaultTrailCreated)
        mockTrailRepository.list = vi.fn().mockResolvedValue([defaultTrailCreated])
    })


    it("Deve criar a trilha", async () => {
        const createTrailUseCase = new CreateTrailUseCase(mockTrailRepository)
        const output = await createTrailUseCase.execute(defautlInputDTO)

        const trail = output.trail  
        expect(trail).toBeInstanceOf(Trail);

        expect(mockTrailRepository.save).toHaveBeenCalled()
    })

    it("Deve retornar a exceção 'TrailClassNotSavedOnRepositoryApplicationException' caso a trilha não seja salva do banco", async () => {

        mockTrailRepository.save = vi.fn().mockResolvedValue(null)
        const createTrailUseCase = new CreateTrailUseCase(mockTrailRepository)

        expect(async () => await createTrailUseCase.execute(defautlInputDTO)).rejects.toThrow(TrailClassNotSavedOnRepositoryApplicationException)
    })

    it("Não deve criar a trilha, caso o inputDTO seja inválido.", async () => {

        const createTrailUseCase = new CreateTrailUseCase(mockTrailRepository)

        const invalidTitleInputDTO: CreateTrailInputDTO = {
            title: "",
            subtitle: "Trail Subtitle",
            description: "Trail Description"
        }

        expect(async () => await createTrailUseCase.execute(invalidTitleInputDTO)).rejects.toThrow()

        const invalidSubtitleInputDTO: CreateTrailInputDTO = {
            title: "Título valido",
            subtitle: "",
            description: "Trail Description"
        }

        expect(async () => await createTrailUseCase.execute(invalidSubtitleInputDTO)).rejects.toThrow()

        const invalidDecriptionInputDTO: CreateTrailInputDTO = {
            title: "Título válido",
            subtitle: "Trail Subtitle",
            description: ""
        }

        expect(async () => await createTrailUseCase.execute(invalidDecriptionInputDTO)).rejects.toThrow()

        const allInvalidInputDTO: CreateTrailInputDTO = {
            title: "",
            subtitle: "",
            description: ""
        }

        expect(async () => await createTrailUseCase.execute(allInvalidInputDTO)).rejects.toThrow()

    })
});

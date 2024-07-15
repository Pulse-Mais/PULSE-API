import {
    Trail,
    TrailDomainService,
    TrailNotFoundApplicationException,
    ReadTrailClassesByContentTypeUseCase,
    ReadTrailClassesByContentTypeUseCaseInputDTO,
    ReadTrailClassesByContentTypeUseCaseOutputDTO,
    mockTrailRepository,
    generateFilledTrailClassToTests,
    generateUnfilledTrailClassToTests
} from "./index"

 
describe("ReadTrailClassesByContentTypeUseCase", () => {
    const defaultTrailInput = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }
    
    const defaultTrail = Trail.create(defaultTrailInput)


    const archiveTrailClass1 = generateFilledTrailClassToTests(defaultTrail.getId()!)
    const archiveTrailClass2 = generateFilledTrailClassToTests(defaultTrail.getId()!)
    const archiveTrailClass3 = generateFilledTrailClassToTests(defaultTrail.getId()!)

    const articleTrailClass1 = generateFilledTrailClassToTests(defaultTrail.getId()!, "article")
    const articleTrailClass2 = generateFilledTrailClassToTests(defaultTrail.getId()!, "article")
    const articleTrailClass3 = generateFilledTrailClassToTests(defaultTrail.getId()!, "article")

    const videoTrailClass1 = generateFilledTrailClassToTests(defaultTrail.getId()!, "video")
    const videoTrailClass2 = generateFilledTrailClassToTests(defaultTrail.getId()!, "video")
    const videoTrailClass3 = generateFilledTrailClassToTests(defaultTrail.getId()!, "video")


    const emptyTrailClass1 = generateUnfilledTrailClassToTests(defaultTrail.getId()!)
    const emptyTrailClass2 = generateUnfilledTrailClassToTests(defaultTrail.getId()!)
 
    defaultTrail.setTrailClasses([
        archiveTrailClass1,
        archiveTrailClass2,
        archiveTrailClass3,
        articleTrailClass1,
        articleTrailClass2,
        articleTrailClass3,
        videoTrailClass1,
        videoTrailClass2,
        videoTrailClass3,
        emptyTrailClass1,
        emptyTrailClass2
    ])

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
    })

    it("Deve retornar todas as aulas de uma trilha por tipo de conteúdo 'archive' com sucesso", async () => {
        const readTrailClassesByContentTypeUseCase = new ReadTrailClassesByContentTypeUseCase(mockTrailRepository)

        const inputDTO: ReadTrailClassesByContentTypeUseCaseInputDTO = {
            idTrail: defaultTrail.getId()!,
            contentType: "archive",
        }

        const output: ReadTrailClassesByContentTypeUseCaseOutputDTO = await readTrailClassesByContentTypeUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([archiveTrailClass1, archiveTrailClass2, archiveTrailClass3])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve retornar todas as aulas de uma trilha por tipo de conteúdo 'article' com sucesso", async () => {
        const readTrailClassesByContentTypeUseCase = new ReadTrailClassesByContentTypeUseCase(mockTrailRepository)

        const inputDTO: ReadTrailClassesByContentTypeUseCaseInputDTO = {
            idTrail: defaultTrail.getId()!,
            contentType: "article",
        }

        const output: ReadTrailClassesByContentTypeUseCaseOutputDTO = await readTrailClassesByContentTypeUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([articleTrailClass1, articleTrailClass2, articleTrailClass3])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve retornar todas as aulas de uma trilha por tipo de conteúdo 'video' com sucesso", async () => {
        const readTrailClassesByContentTypeUseCase = new ReadTrailClassesByContentTypeUseCase(mockTrailRepository)

        const inputDTO: ReadTrailClassesByContentTypeUseCaseInputDTO = {
            idTrail: defaultTrail.getId()!,
            contentType: "video",
        }

        const output: ReadTrailClassesByContentTypeUseCaseOutputDTO = await readTrailClassesByContentTypeUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([videoTrailClass1, videoTrailClass2, videoTrailClass3])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const readTrailClassesByContentTypeUseCase = new ReadTrailClassesByContentTypeUseCase(mockTrailRepository)

        const inputDTO: ReadTrailClassesByContentTypeUseCaseInputDTO = {
            idTrail: "invalid-id",
            contentType: "archive",
        }

        await expect(readTrailClassesByContentTypeUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException("read-trail-classes-by-content-type-use-case.ts", "13")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith("invalid-id")
    })

    it("Deve retornar uma lista vazia se a trilha não tiver aulas do tipo de conteúdo especificado", async () => {
        const trailWithoutClasses = Trail.create(defaultTrailInput)
        trailWithoutClasses.setId(defaultTrail.getId()!)
        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithoutClasses)
        vi.spyOn(TrailDomainService.prototype, 'getTrailClassesByContentType').mockReturnValue([])

        const readTrailClassesByContentTypeUseCase = new ReadTrailClassesByContentTypeUseCase(mockTrailRepository)

        const inputDTO: ReadTrailClassesByContentTypeUseCaseInputDTO = {
            idTrail: trailWithoutClasses.getId()!,
            contentType: "video",
        }

        const output: ReadTrailClassesByContentTypeUseCaseOutputDTO = await readTrailClassesByContentTypeUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(trailWithoutClasses.getId()!)
    })
})

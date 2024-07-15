import {
    Trail,
    TrailNotFoundApplicationException,
    ReadPublishedTrailClassesUseCase,
    ReadPublishedTrailClassesUseCaseInputDTO,
    ReadPublishedTrailClassesUseCaseOutputDTO,
    mockTrailRepository,
    generatePublishedTrailClassToTests,
    generateUnfilledTrailClassToTests
} from "./index"


describe("ReadPublishedTrailClassesUseCase", () => {
    const defaultTrailInput = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }

    const defaultTrail = Trail.create(defaultTrailInput)

    const publishedTrailClass1 = generatePublishedTrailClassToTests(defaultTrail.getId()!)
    const publishedTrailClass2 = generatePublishedTrailClassToTests(defaultTrail.getId()!)
    const publishedTrailClass3 = generatePublishedTrailClassToTests(defaultTrail.getId()!)

    const unfilledTrailClass1 = generateUnfilledTrailClassToTests(defaultTrail.getId()!)
    const unfilledTrailClass2 = generateUnfilledTrailClassToTests(defaultTrail.getId()!)

    defaultTrail.setTrailClasses([
        publishedTrailClass1,
        publishedTrailClass2,
        publishedTrailClass3,
        unfilledTrailClass1,
        unfilledTrailClass2
    ])

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
    })

    it("Deve retornar todas as aulas publicadas de uma trilha com sucesso", async () => {
        const readPublishedTrailClassesUseCase = new ReadPublishedTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadPublishedTrailClassesUseCaseInputDTO = {
            idTrail: defaultTrail.getId()!,
        }

        const output: ReadPublishedTrailClassesUseCaseOutputDTO = await readPublishedTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([publishedTrailClass1, publishedTrailClass2, publishedTrailClass3])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const readPublishedTrailClassesUseCase = new ReadPublishedTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadPublishedTrailClassesUseCaseInputDTO = {
            idTrail: "invalid-id",
        }

        await expect(readPublishedTrailClassesUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException("read-published-trail-classes-use-case", "16")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith("invalid-id")
    })

    it("Deve retornar uma lista vazia se a trilha não tiver aulas publicadas", async () => {
        const trailWithoutPublishedClasses = Trail.create(defaultTrailInput)
        trailWithoutPublishedClasses.setId(defaultTrail.getId()!)
        trailWithoutPublishedClasses.setTrailClasses([unfilledTrailClass1, unfilledTrailClass2])
        
        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithoutPublishedClasses)

        const readPublishedTrailClassesUseCase = new ReadPublishedTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadPublishedTrailClassesUseCaseInputDTO = {
            idTrail: trailWithoutPublishedClasses.getId()!,
        }

        const output: ReadPublishedTrailClassesUseCaseOutputDTO = await readPublishedTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(trailWithoutPublishedClasses.getId()!)
    })
})

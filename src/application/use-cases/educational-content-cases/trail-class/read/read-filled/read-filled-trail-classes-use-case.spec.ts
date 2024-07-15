import {
    Trail,
    TrailNotFoundApplicationException,
    ReadFilledTrailClassesUseCase,
    ReadFilledTrailClassesUseCaseInputDTO,
    ReadFilledTrailClassesUseCaseOutputDTO,
    mockTrailRepository,
    generateFilledTrailClassToTests,
    generateUnfilledTrailClassToTests
} from "./index"


describe("ReadFilledTrailClassesUseCase", () => {
    const defaultTrailInput = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }
    
    const defaultTrail = Trail.create(defaultTrailInput)

    const filledTrailClass1 = generateFilledTrailClassToTests(defaultTrail.getId()!)
    const filledTrailClass2 = generateFilledTrailClassToTests(defaultTrail.getId()!)
    const filledTrailClass3 = generateFilledTrailClassToTests(defaultTrail.getId()!)

    const unfilledTrailClass1 = generateUnfilledTrailClassToTests(defaultTrail.getId()!)
    const unfilledTrailClass2 = generateUnfilledTrailClassToTests(defaultTrail.getId()!)

    defaultTrail.setTrailClasses([
        filledTrailClass1,
        filledTrailClass2,
        filledTrailClass3,
        unfilledTrailClass1,
        unfilledTrailClass2
    ])

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
    })

    it("Deve retornar todas as aulas preenchidas de uma trilha com sucesso", async () => {
        const readFilledTrailClassesUseCase = new ReadFilledTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadFilledTrailClassesUseCaseInputDTO = {
            idTrail: defaultTrail.getId()!,
        }

        const output: ReadFilledTrailClassesUseCaseOutputDTO = await readFilledTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses.length).toBe(3)
        expect(output.trailClasses).toEqual([filledTrailClass1, filledTrailClass2, filledTrailClass3])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const readFilledTrailClassesUseCase = new ReadFilledTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadFilledTrailClassesUseCaseInputDTO = {
            idTrail: "invalid-id",
        }

        await expect(readFilledTrailClassesUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException("read-filled-trail-classes-use-case", "16")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith("invalid-id")
    })

    it("Deve retornar uma lista vazia se a trilha não tiver aulas preenchidas", async () => {
        const trailWithoutFilledClasses = Trail.create(defaultTrailInput)
        trailWithoutFilledClasses.setId(defaultTrail.getId()!)
        trailWithoutFilledClasses.setTrailClasses([unfilledTrailClass1, unfilledTrailClass2])
        
        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithoutFilledClasses)

        const readFilledTrailClassesUseCase = new ReadFilledTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadFilledTrailClassesUseCaseInputDTO = {
            idTrail: trailWithoutFilledClasses.getId()!,
        }

        const output: ReadFilledTrailClassesUseCaseOutputDTO = await readFilledTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(trailWithoutFilledClasses.getId()!)
    })
})

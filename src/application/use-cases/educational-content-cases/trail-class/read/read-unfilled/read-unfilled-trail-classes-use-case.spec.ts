import {
    Trail,
    TrailNotFoundApplicationException,
    ReadUnfilledTrailClassesUseCase,
    ReadUnfilledTrailClassesUseCaseInputDTO,
    ReadUnfilledTrailClassesUseCaseOutputDTO,
    mockTrailRepository,
    generateFilledTrailClassToTests,
    generateUnfilledTrailClassToTests
} from "./index"


describe("ReadUnfilledTrailClassesUseCase", () => {
    const defaultTrailInput = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }

    const defaultTrail = Trail.create(defaultTrailInput)

    const unfilledTrailClass1 = generateUnfilledTrailClassToTests(defaultTrail.getId()!)
    const unfilledTrailClass2 = generateUnfilledTrailClassToTests(defaultTrail.getId()!)
    const unfilledTrailClass3 = generateUnfilledTrailClassToTests(defaultTrail.getId()!)

    const filledTrailClass1 = generateFilledTrailClassToTests(defaultTrail.getId()!)
    const filledTrailClass2 = generateFilledTrailClassToTests(defaultTrail.getId()!)

    defaultTrail.setTrailClasses([
        unfilledTrailClass1,
        unfilledTrailClass2,
        unfilledTrailClass3,
        filledTrailClass1,
        filledTrailClass2
    ])

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
    })

    it("Deve retornar todas as aulas não preenchidas de uma trilha com sucesso", async () => {
        const readUnfilledTrailClassesUseCase = new ReadUnfilledTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadUnfilledTrailClassesUseCaseInputDTO = {
            idTrail: defaultTrail.getId()!,
        }

        const output: ReadUnfilledTrailClassesUseCaseOutputDTO = await readUnfilledTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([unfilledTrailClass1, unfilledTrailClass2, unfilledTrailClass3])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const readUnfilledTrailClassesUseCase = new ReadUnfilledTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadUnfilledTrailClassesUseCaseInputDTO = {
            idTrail: "invalid-id",
        }

        await expect(readUnfilledTrailClassesUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException("read-unfilled-trail-classes-use-case", "16")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith("invalid-id")
    })

    it("Deve retornar uma lista vazia se a trilha não tiver aulas não preenchidas", async () => {
        const trailWithoutUnfilledClasses = Trail.create(defaultTrailInput)
        trailWithoutUnfilledClasses.setId(defaultTrail.getId()!)
        trailWithoutUnfilledClasses.setTrailClasses([filledTrailClass1, filledTrailClass2])
        
        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithoutUnfilledClasses)

        const readUnfilledTrailClassesUseCase = new ReadUnfilledTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadUnfilledTrailClassesUseCaseInputDTO = {
            idTrail: trailWithoutUnfilledClasses.getId()!,
        }

        const output: ReadUnfilledTrailClassesUseCaseOutputDTO = await readUnfilledTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(trailWithoutUnfilledClasses.getId()!)
    })
})

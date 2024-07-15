 
import {
    Trail,
    TrailNotFoundApplicationException,
    ReadUnpublishedTrailClassesUseCase,
    ReadUnpublishedTrailClassesUseCaseInputDTO,
    ReadUnpublishedTrailClassesUseCaseOutputDTO,
    mockTrailRepository,
    generateUnpublishedTrailClassToTests,
    generatePublishedTrailClassToTests
} from "./index"


describe("ReadUnpublishedTrailClassesUseCase", () => {
    const defaultTrailInput = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }

    const defaultTrail = Trail.create(defaultTrailInput)

    const unpublishedTrailClass1 = generateUnpublishedTrailClassToTests(defaultTrail.getId()!, true)
    const unpublishedTrailClass2 = generateUnpublishedTrailClassToTests(defaultTrail.getId()!, true)
    const unpublishedTrailClass3 = generateUnpublishedTrailClassToTests(defaultTrail.getId()!, true)

    const publishedTrailClass1 = generatePublishedTrailClassToTests(defaultTrail.getId()!)
    const publishedTrailClass2 = generatePublishedTrailClassToTests(defaultTrail.getId()!)

    defaultTrail.setTrailClasses([
        unpublishedTrailClass1,
        unpublishedTrailClass2,
        unpublishedTrailClass3,
        publishedTrailClass1,
        publishedTrailClass2
    ])

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
    })

    it("Deve retornar todas as aulas não publicadas de uma trilha com sucesso", async () => {
        const readUnpublishedTrailClassesUseCase = new ReadUnpublishedTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadUnpublishedTrailClassesUseCaseInputDTO = {
            idTrail: defaultTrail.getId()!,
        }

        const output: ReadUnpublishedTrailClassesUseCaseOutputDTO = await readUnpublishedTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses.length).toEqual(3)
        expect(output.trailClasses).toEqual([unpublishedTrailClass1, unpublishedTrailClass2, unpublishedTrailClass3])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)
        const readUnpublishedTrailClassesUseCase = new ReadUnpublishedTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadUnpublishedTrailClassesUseCaseInputDTO = {
            idTrail: "invalid-id",
        }

        await expect(readUnpublishedTrailClassesUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException("read-unpublished-trail-classes-use-case", "16")
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith("invalid-id")
    })

    it("Deve retornar uma lista vazia se a trilha não tiver aulas não publicadas", async () => {
        const trailWithoutUnpublishedClasses = Trail.create(defaultTrailInput)
        trailWithoutUnpublishedClasses.setId(defaultTrail.getId()!)
        trailWithoutUnpublishedClasses.setTrailClasses([publishedTrailClass1, publishedTrailClass2])

        mockTrailRepository.findById = vi.fn().mockResolvedValue(trailWithoutUnpublishedClasses)

        const readUnpublishedTrailClassesUseCase = new ReadUnpublishedTrailClassesUseCase(mockTrailRepository)

        const inputDTO: ReadUnpublishedTrailClassesUseCaseInputDTO = {
            idTrail: trailWithoutUnpublishedClasses.getId()!,
        }

        const output: ReadUnpublishedTrailClassesUseCaseOutputDTO = await readUnpublishedTrailClassesUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.trailClasses).toEqual([])
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(trailWithoutUnpublishedClasses.getId()!)
    })
})

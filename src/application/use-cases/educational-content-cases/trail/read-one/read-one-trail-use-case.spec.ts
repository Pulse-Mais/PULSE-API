import {
    Trail,
    ReadOneTrailUseCaseInputDTO,
    ReadOneTrailUseCaseOutputDTO,
    TrailNotFoundApplicationException,
    mockTrailRepository,
    ReadOneTrailUseCase,
    describe, it, expect, vi,
} from "./index"

describe("UnitTests - ReadOneTrailUseCase", () => {

    const defaultTrail = Trail.create({
        title: "Título de teste",
        subtitle: "Subtítulo de teste",
        description: "Descrição de teste"
    })

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
    })

    it("Deve retornar a trilha quando ela é encontrada", async () => {
        const readOneTrailUseCase = new ReadOneTrailUseCase(mockTrailRepository)
        const input: ReadOneTrailUseCaseInputDTO = { idTrail: `${defaultTrail.getId()}` }
        const output: ReadOneTrailUseCaseOutputDTO = await readOneTrailUseCase.execute(input)

        expect(output).toEqual({ trail: defaultTrail })
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(`${defaultTrail.getId()}`)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)

        const readOneTrailUseCase = new ReadOneTrailUseCase(mockTrailRepository)
        const input: ReadOneTrailUseCaseInputDTO = { idTrail: '1' }

        await expect(readOneTrailUseCase.execute(input)).rejects.toThrow(
            new TrailNotFoundApplicationException(
                'read-one-trail-use-case.ts',
                '16'
            )
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith('1')
    })
})

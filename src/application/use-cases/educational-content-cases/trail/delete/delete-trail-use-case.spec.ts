import {
    DeleteTrailUseCaseInputDTO,
    DeleteTrailUseCaseOutputDTO,
    TrailNotFoundApplicationException,
    mockTrailRepository,
    DeleteTrailUseCase,
    TrailNotDeletedOnRepositoryApplicationException,
    Trail,
} from "./index"


describe("UnitTests - DeleteTrailUseCase", () => {

    const defaultTrail = Trail.create({
        title: "Título de teste",
        subtitle: "Subtítulo de teste",
        description: "Descrição de teste"
    })

    beforeEach(() => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
        mockTrailRepository.delete = vi.fn().mockResolvedValue(true)
    })

    it("Deve deletar a trilha com sucesso", async () => {
        const deleteTrailUseCase = new DeleteTrailUseCase(mockTrailRepository)
        const inputDTO: DeleteTrailUseCaseInputDTO = { idTrail: `${defaultTrail.getId()}` }

        const output: DeleteTrailUseCaseOutputDTO = await deleteTrailUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.isDeleted).toBe(true)

        expect(mockTrailRepository.findById).toHaveBeenCalledWith(`${defaultTrail.getId()}`)
        expect(mockTrailRepository.delete).toHaveBeenCalledWith(`${defaultTrail.getId()}`)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)

        const deleteTrailUseCase = new DeleteTrailUseCase(mockTrailRepository)
        const inputDTO: DeleteTrailUseCaseInputDTO = { idTrail: '1' }

        await expect(deleteTrailUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException(
                "delete-trail-use-case",
                "13"
            )
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith('1')
    })

    it("Deve lançar uma exceção quando a trilha não é deletada no repositório", async () => {
        mockTrailRepository.delete = vi.fn().mockResolvedValue(false)

        const deleteTrailUseCase = new DeleteTrailUseCase(mockTrailRepository)
        const inputDTO: DeleteTrailUseCaseInputDTO = { idTrail: `${defaultTrail.getId()}` }

        await expect(deleteTrailUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotDeletedOnRepositoryApplicationException(
                "delete-trail-use-case",
                "14"
            )
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(`${defaultTrail.getId()}`)
        expect(mockTrailRepository.delete).toHaveBeenCalledWith(`${defaultTrail.getId()}`)
    })
})

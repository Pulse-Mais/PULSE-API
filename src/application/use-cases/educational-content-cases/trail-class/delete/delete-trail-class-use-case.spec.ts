import {
    TrailClassNotFoundOnTrailDomainException,
    TrailNotFoundApplicationException,
    Trail,
    TrailClass,
    DeleteTrailClassUseCase,
    DeleteTrailClassInputDTO,
    DeleteTrailClassOutputDTO,
    mockTrailRepository,
    mockTrailClassRepository,
    CreateTrailInput,
    CreateTrailClassInput
} from "./index"


describe("UnitTests - DeleteTrailClassUseCase", () => {
    const defaultTrailInput: CreateTrailInput = {
        title: "Título de teste",
        subtitle: "Subtítulo de teste",
        description: "Descrição de teste"
    }
    
    const defaultTrail = Trail.create(defaultTrailInput)
    
    const defaultTrailClassInput: CreateTrailClassInput = {
        idTrail: defaultTrail.getId()!,
        title: "Aula de teste",
        description: "Descrição de teste",
        duration: 30,
        subtitle: "Subtítulo de teste"
    }
    const defaultTrailClass = TrailClass.create({
        ...defaultTrailClassInput,
        idTrail: defaultTrail.getId()!
    })

    beforeEach(() => {
        defaultTrail.getTrailClassById = vi.fn().mockReturnValue(defaultTrailClass)
        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrail)
        mockTrailClassRepository.delete = vi.fn().mockResolvedValue(true)
    })

    it("Deve deletar a aula de trilha com sucesso", async () => {
        const deleteTrailClassUseCase = new DeleteTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)
        const inputDTO: DeleteTrailClassInputDTO = { idTrail: defaultTrail.getId()!, idTrailClass: defaultTrailClass.getId()! }

        const output: DeleteTrailClassOutputDTO = await deleteTrailClassUseCase.execute(inputDTO)

        expect(output).toBeTruthy()
        expect(output.isDeleted).toBe(true)

        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
        expect(defaultTrail.getTrailClassById).toHaveBeenCalledWith(defaultTrailClass.getId()!)
        expect(mockTrailClassRepository.delete).toHaveBeenCalledWith(defaultTrailClass)
    })

    it("Deve lançar uma exceção quando a trilha não é encontrada", async () => {
        mockTrailRepository.findById = vi.fn().mockResolvedValue(null)

        const deleteTrailClassUseCase = new DeleteTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)
        const inputDTO: DeleteTrailClassInputDTO = { idTrail: '1', idTrailClass: '1' }

        await expect(deleteTrailClassUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailNotFoundApplicationException(
                "delete-trail-class-use-case.ts",
                "26"
            )
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith('1')
    })

    it("Deve lançar uma exceção quando a aula de trilha não é encontrada", async () => {
        defaultTrail.getTrailClassById = vi.fn().mockReturnValue(null)

        const deleteTrailClassUseCase = new DeleteTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)
        const inputDTO: DeleteTrailClassInputDTO = { idTrail: defaultTrail.getId()!, idTrailClass: '1' }

        await expect(deleteTrailClassUseCase.execute(inputDTO)).rejects.toThrow(
            new TrailClassNotFoundOnTrailDomainException(
                "delete-trail-class-use-case.ts",
                "29"
            )
        )
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
        expect(defaultTrail.getTrailClassById).toHaveBeenCalledWith('1')
    })

    it("Deve lançar uma exceção quando a aula de trilha não é deletada no repositório", async () => {
        mockTrailClassRepository.delete = vi.fn().mockResolvedValue(false)

        const deleteTrailClassUseCase = new DeleteTrailClassUseCase(mockTrailClassRepository, mockTrailRepository)
        const inputDTO: DeleteTrailClassInputDTO = { idTrail: defaultTrail.getId()!, idTrailClass: defaultTrailClass.getId()! }

        await expect(deleteTrailClassUseCase.execute(inputDTO)).rejects.toThrow(
            new Error("Criar exception. TrailClass not deleted on repository.")
        )
        
        expect(mockTrailRepository.findById).toHaveBeenCalledWith(defaultTrail.getId()!)
        expect(defaultTrail.getTrailClassById).toHaveBeenCalledWith(defaultTrailClass.getId()!)
        expect(mockTrailClassRepository.delete).toHaveBeenCalledWith(defaultTrailClass)
    })
})

import { TrailClassPartionNotCreatedApplicationException } from './../../../../application-exceptions/use-cases-application-exceptions/trail-class-partition-not-created-app-exception';
import { mockTrailRepository } from './../../../../../../test/mocks/mock-trail-repository';
import { mockStorageService } from './../../../../../../test/mocks/mock-storage-service';
import { CreateTrailUseCase } from '.';
import { Trail } from '@/domain/entity/trail/trail-entity';
import { CreateTrailInputDTO } from './dto/create-trail-input-dto';
import { describe, it, expect, vi } from 'vitest';
import { TrailClassNotSavedOnRepositoryApplicationException } from '@/application/application-exceptions/use-cases-application-exceptions/trail-class-not-saved-on-repository-app-exception';


describe("CreateTrailUseCase", () => {

    const defautlInputDTO: CreateTrailInputDTO = {
        title: "Válido Title",
        subtitle: "Trail Subtitle",
        description: "Trail Description"
    }
    const defaultTrailCreated: Trail = Trail.create(defautlInputDTO)

    beforeEach(() => {
        mockStorageService.createTrailFolder = vi.fn().mockResolvedValue(true),
        mockStorageService.getUrlForUploadArchiveContent = vi.fn().mockResolvedValue("url-ficticia-aaa"),
        mockStorageService.createClassFolder = vi.fn().mockResolvedValue(true),
        mockStorageService.createContentFolder = vi.fn().mockResolvedValue(true),
        mockStorageService.verifyFolderAvailability = vi.fn().mockResolvedValue(true),
        mockStorageService.deleteObject = vi.fn().mockResolvedValue(true),
        mockStorageService.listObjects = vi.fn().mockResolvedValue([])

        mockTrailRepository.findById = vi.fn().mockResolvedValue(defaultTrailCreated)
        mockTrailRepository.save = vi.fn().mockResolvedValue(defaultTrailCreated)
        mockTrailRepository.list = vi.fn().mockResolvedValue([defaultTrailCreated])
    })


    it("Deve criar a trilha", async () => {

        const createTrailUseCase = new CreateTrailUseCase(mockTrailRepository, mockStorageService)
        const trail = await createTrailUseCase.execute(defautlInputDTO)
       
        expect(trail).toBeInstanceOf(Trail);
        
        expect(mockTrailRepository.save).toHaveBeenCalled()
        expect(mockStorageService.createTrailFolder).toHaveBeenCalled()
    })

    it("Não deve criar a trilha se a partição dela não for criada no storage", async () => {

        mockStorageService.createTrailFolder = vi.fn().mockResolvedValue(false)
        const createTrailUseCase = new CreateTrailUseCase(mockTrailRepository, mockStorageService)

        expect(async () => await createTrailUseCase.execute(defautlInputDTO)).rejects.toThrow()
        expect(mockStorageService.createTrailFolder).toHaveBeenCalled()
        expect(mockTrailRepository.save).toHaveBeenCalledTimes(0)
    })

    it("Deve retornar a exceção 'TrailClassPartionNotCreatedApplicationException' caso a partição da trilha não seja criada no storage", async () => {

        mockStorageService.createTrailFolder = vi.fn().mockResolvedValue(false)
        const createTrailUseCase = new CreateTrailUseCase(mockTrailRepository, mockStorageService)

        expect(async () => await createTrailUseCase.execute(defautlInputDTO)).rejects.toThrow(
            new TrailClassPartionNotCreatedApplicationException("create-trail-use-case.ts", "25")
        )
        expect(mockStorageService.createTrailFolder).toHaveBeenCalled()
        expect(mockTrailRepository.save).toHaveBeenCalledTimes(0)
    })

    it("Deve retornar a exceção 'TrailClassNotSavedOnRepositoryApplicationException' caso a trilha não seja salva do banco", async () => {

        mockTrailRepository.save = vi.fn().mockResolvedValue(null)
        const createTrailUseCase = new CreateTrailUseCase(mockTrailRepository, mockStorageService)

        expect(async () => await createTrailUseCase.execute(defautlInputDTO)).rejects.toThrow(TrailClassNotSavedOnRepositoryApplicationException)
    })

    it("Não deve criar a trilha, caso o inputDTO seja inválido.", async () => {

        const createTrailUseCase = new CreateTrailUseCase(mockTrailRepository, mockStorageService)

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

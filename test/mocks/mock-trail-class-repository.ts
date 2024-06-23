import { ITrailClassRepository } from "@/domain/repository/ITrail-class-Repository";


export const mockTrailClassRepository: ITrailClassRepository = {
    findById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(null),
    findByTrailClassUploadId: vi.fn().mockResolvedValue(null),
    listByTrail: vi.fn().mockResolvedValue([]),
    deleteById: vi.fn().mockResolvedValue(null),

}
import { ITrailRepository } from "@/domain/repository/ITrail-Repository";


export const mockTrailRepository: ITrailRepository = {
    findById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(null),
    list: vi.fn().mockResolvedValue([]),
}
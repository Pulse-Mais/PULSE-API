import { Trail } from "@/domain/entity/trail/trail-entity";


export interface ReadNotPublishedTrailsUseCaseOutputDTO {
  trails: Trail[];
}
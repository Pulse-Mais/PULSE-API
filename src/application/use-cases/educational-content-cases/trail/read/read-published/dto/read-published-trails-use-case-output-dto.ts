import { Trail } from "@/domain/entity/trail/trail-entity";


export interface ReadPublishedTrailsUseCaseOutputDTO {
  trails: Trail[];
}
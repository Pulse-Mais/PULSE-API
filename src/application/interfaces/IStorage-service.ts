import { ArchiveContentItem } from "@/domain/entity/value-objects/archive-block-content-item";


export interface IStorageService {
    getPromise(archive: ArchiveContentItem, idTrailClass: string): Promise<any>;
    teste(fileStream: any, filename: string): Promise<any>;
}
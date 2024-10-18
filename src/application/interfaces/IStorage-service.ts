import { ArchiveContentItem } from "@/domain/entity/value-objects/archive-block-content-item";


export interface IStorageService {
    getPromise(archive: ArchiveContentItem): Promise<any>;
}
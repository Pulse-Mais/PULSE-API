

export interface IStorageService {

    getUrlForUploadArchiveContent: (key: string) => Promise<string>
    createTrailFolder: (key: string) => Promise<boolean>
    createClassFolder: (key: string) => Promise<boolean>

    createContentFolder: (key: string) => Promise<boolean>
    verifyFolderAvailability: (key: string) => Promise<boolean>

    deleteObject: () => any
    listObjects: () => any
    
}


export interface IVideoService {
    getUrlForUploadVideoContent: () => Promise<{ url: string, idUpload: string }>
}
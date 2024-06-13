export interface IContentDeliveryNetworkingService {
    generateContentSignedUrl(url: string): Promise<string>;
}
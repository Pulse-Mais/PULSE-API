import { InvalidContentKeyAppCDNServiceException } from "@/application/application-exceptions/services-application-exceptions/content-delivery-networking-service-exceptions/invalid-content-key-app-cdn-service-exception";
import { SignedContentUrlNotGeneratedAppCDNServiceException } from "@/application/application-exceptions/services-application-exceptions/content-delivery-networking-service-exceptions/signed-content-url-not-generated-app-cdn-service-exception";
import { IContentDeliveryNetworkingService } from "@/application/interfaces/IContent-delivery-networking-service";
import { getSignedUrl, CloudfrontSignInput } from "@aws-sdk/cloudfront-signer";
import 'dotenv/config';

export class AmazonCloudFrontAdapter implements IContentDeliveryNetworkingService {
    private readonly distributionDomainBaseUrl: string = process.env.CLOUDFRONT_DOMAIN_BASE_URL!;
    private readonly keyPairId: string = process.env.CLOUDFRONT_KEY_PAIR_ID!;
    private readonly privateKey: string = process.env.CLOUDFRONT_PRIVATE_KEY!;

    async generateContentSignedUrl(contentKey: string): Promise<string> {

        if (!this.contentKeyIsValid(contentKey)) {
            throw new InvalidContentKeyAppCDNServiceException(contentKey);
        }

        return this.generateSignedUrl(contentKey);
    }

    private contentKeyIsValid(contentKey: string): boolean {
        // TO-DO: Implementar a validação da key do conteúdo.
        console.log(contentKey)
        return contentKey.length > 0 && contentKey.length <= 255;
    }

    private async generateSignedUrl(contentKey: string): Promise<string> {
        try {
            
            // const expiresIn = new Date(Date.now() + 3600 * 1000).toISOString(); // acaba em uma horinha.

            // const input: CloudfrontSignInput = {
            //     url: `${this.distributionDomainBaseUrl}/${contentKey}`,
            //     keyPairId: this.keyPairId,
            //     privateKey: this.privateKey,
            //     dateLessThan: expiresIn
            // };

            // return getSignedUrl(input);

            // improvisando enquanto não ajusto.
            return `${this.distributionDomainBaseUrl}/${contentKey}`;
        } catch (error) {

            console.log("Não gerou a URL assinada:", error);
            throw new SignedContentUrlNotGeneratedAppCDNServiceException();
        }
    }
}

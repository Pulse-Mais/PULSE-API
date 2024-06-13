
export class SignedContentUrlNotGeneratedAppCDNServiceException extends Error {
    
    public readonly name = 'SignedContentUrlNotGeneratedApplicationContentDeliveryNetworkingServiceException';

    constructor(contentKey?: string) {
        super(`A chave de acesso '${contentKey || 'undefined'}' do sistema de armazenamento de conteúdo recebida \n não
             foi gerada de forma assinada pelo serviço de distribuição de conteúdo!`);
    }
}
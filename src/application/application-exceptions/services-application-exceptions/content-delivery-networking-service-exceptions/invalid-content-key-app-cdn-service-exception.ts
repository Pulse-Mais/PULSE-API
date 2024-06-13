
 
export class InvalidContentKeyAppCDNServiceException extends Error {
    
    public readonly name = 'InvalidContentKeyApplicationContentDeliveryNetworkingServiceException';

    constructor(contentKey?: string) {
        super(`A chave do conteúdo '${contentKey || 'undefined'}' do sistema de armazenamento de conteúdo recebida é é inválida ou nula!`);
    }
}


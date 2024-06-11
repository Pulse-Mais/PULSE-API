import { Logger } from "@/infra/logs/logger";

export class InvalidContentKeyDomainException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'InvalidContentKeyDomainException'

    constructor(filename: string, line: string) {
        super(`Não é possível publicar uma aula com a chave de armazenamento inválida`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({line: Number(line), message: "Não é possível publicar uma aula com a chave de armazenamento inválida"})
    }

}
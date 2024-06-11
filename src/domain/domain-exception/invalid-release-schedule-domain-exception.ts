import { Logger } from "@/infra/logs/logger";

export class InvalidReleaseScheduleDomainException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'InvalidReleaseScheduleDomainException'

    constructor(filename: string, line: string) {
        super(`A data de liberação da aula recebida é inválida!`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({line: Number(line), message: "A data de liberação da aula recebida é inválida!"})
    }

}
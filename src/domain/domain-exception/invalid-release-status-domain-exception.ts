// InvalidReleaseStatusDomainException

import { Logger } from "@/infra/logs/logger";

export class InvalidReleaseStatusDomainException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'InvalidReleaseStatusDomainException'

    constructor(filename: string, line: string) {
        super(`O status da programação de libração da aula recebido é inválida!`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({line: Number(line), message: "O status da programação de libração da aula recebido é inválida!"})
    }

}
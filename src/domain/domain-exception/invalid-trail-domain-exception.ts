import { Logger } from "@/infra/logs/logger";


export class InvalidTrailDomainException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'InvalidTrailDomainException'

    constructor(filename: string, line: string) {
        super(`A trilha fornecida ao serviço de domínio não é válida!`);
        this.logger = new Logger("domain", filename, line)
    }

}
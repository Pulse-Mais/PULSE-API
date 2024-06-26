import { Logger } from "@/infra/logs/logger";


export class InvalidTrailDomainException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'InvalidTrailDomainException'

    constructor(filename: string, line: string, propety: string, message?: string) {
        super(`\n A propriedade ${propety} da trilha está inválida! \n ${message}`);
        this.logger = new Logger("domain", filename, line)
    }

}
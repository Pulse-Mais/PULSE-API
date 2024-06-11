import { Logger } from "../../infra/logs/logger";
import { IUseCase } from "../../shared/IUse-case";



export abstract class GenericUseCase implements IUseCase {

    constructor(protected readonly filename: string, protected readonly path?: string) {}
}
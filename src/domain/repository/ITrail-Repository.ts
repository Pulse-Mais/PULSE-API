import { Trail } from "../entity/trail/trail-entity";


export interface ITrailRepository {

    findById: (id: string) => Promise<Trail | null>
    save: (t: Trail) => Promise<Trail>
    list: () => Promise<Trail[]>

    
}
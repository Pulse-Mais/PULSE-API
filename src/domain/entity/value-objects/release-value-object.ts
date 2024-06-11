

export class Release implements ReleaseValueObject {
    status: "locked" | "unlocked" 
    schedule: Date | "empty"
    constructor(status: "locked" | "unlocked", schedule: Date | "empty") {
        this.status = status;
        this.schedule = schedule;
    }
}
 
export interface ReleaseValueObject {
    status: "locked" | "unlocked" ;
    schedule: Date | "empty"
}
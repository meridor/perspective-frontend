//Contains the full list of event names
export class Event {
    
    constructor(public name: string) {}

    toString() {
        return this.name;
    }
    
    //Generic events
    static START = new Event('start');
    static LIST = new Event('list');
    
    //Instance-related events
    static INSTANCES_LIST = new Event('instances:list');
    
}

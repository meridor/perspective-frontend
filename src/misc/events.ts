//Contains the full list of event names
export class Event {

    constructor(public name: string) {
    }

    toString() {
        return this.name;
    }

    //Generic events
    static LIST = new Event('list');
    static RESET = new Event('reset');
    static START = new Event('start');

    //Instance-related events
    static INSTANCES_LIST = new Event('instances:list');
    static INSTANCE_GROUP_CHANGE = new Event('instance-group:change');

}

import {Image} from './image';
import {BaseModel, BaseCollection} from './base';

export class Instance extends BaseModel {

    toString() {
        return `Instance(${this.toJSONString()})`;
    }
}

export class Instances extends BaseCollection<Instance> {

    //public get url() {
    //    return '/instances';
    //}
    //
    toString() {
        return `Instances(${this.toJSONString()})`;
    }

}

export class InstancesGroup extends BaseModel {

    constructor(public id: string, public name: string) {
        super({
            id,
            name,
            instances: new Instances()
        });
        this.instances.on('reset', () => {
            this.trigger('change');
        });
    }

    public get instances(): Instances {
        return this.get('instances');
    }

    public get count(): number {
        return this.instances.length;
    }

    public isEmpty(): boolean {
        return this.count === 0;
    }

}

class InstancesGroups extends BaseCollection<InstancesGroup> {

    constructor(groups: InstancesGroup[]) {
        super(groups);
    }

}

export class InstancesSection extends BaseModel {

    private _groups: InstancesGroups;

    constructor(instancesGroups: InstancesGroup[]) {
        super(instancesGroups);
        this._groups = new InstancesGroups(instancesGroups);
    }

    get count() {
        return this.groups.map(ig => ig.count).reduce(
            //Sum up length field of each group
            (prev, curr) => {
                return prev + curr;
            }
        );
    }

    public get groups(): InstancesGroups {
        return this._groups;
    }
}
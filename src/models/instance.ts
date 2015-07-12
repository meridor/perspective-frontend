import * as Backbone from 'backbone';

export class Instance extends Backbone.Model {
    
}

export class Instances extends Backbone.Collection<Instance> {

    constructor(models: Instance[]){
        super(models);
    }
}

export class InstancesGroup extends Backbone.Model {
    
    private _count: number;
    
    private _instances: Instances;
    
    constructor(public id: string, public name: string, instances: Instance[]) {
        super({
            id,
            name
        });
        this._count = instances.length;
        this._instances = new Instances(instances);
    }


    public get instances():Instances {
        return this._instances;
    }

    public get count():number {
        return this._count;
    }
}

class InstancesGroups extends Backbone.Collection<InstancesGroup> {

    constructor(models: InstancesGroup[]){
        super(models);
    }
}

export class InstancesSection extends Backbone.Model {
    
    private _count: number;
    
    private _groups: InstancesGroups;
    
    constructor(instancesGroups: InstancesGroup[] = []) {
        super(instancesGroups);
        this._count = instancesGroups.map(ig => ig.count).reduce(
            //Sum up length field of each group
            (prev, curr) => {
                return prev + curr;
            }
        );
        this._groups = new InstancesGroups(instancesGroups);
    }
    
    get count() {
        return this._count;
    }

    public get groups(): InstancesGroups {
        return this._groups;
    }
}
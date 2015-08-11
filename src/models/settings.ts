import * as Backbone from 'backbone';
import {BaseModel, IdentifiedModel} from './base';

export class Settings extends BaseModel {

}

export class Network extends IdentifiedModel {

    toString() {
        return `Network(${this.toJSONString()})`;
    }

}

export class Flavor extends IdentifiedModel {

    toString() {
        return `Flavor(${this.toJSONString()})`;
    }

}

export class AvailabilityZone extends IdentifiedModel {

    toString() {
        return `AvailabilityZone(${this.toJSONString()})`;
    }

}

export class Project extends IdentifiedModel {

    public get cloudType() {
        return this.get('cloudType');
    }

    public get flavors(): Flavor[] {
        return this.modelsFromField('flavors', n => new Flavor(n));
    }

    public get networks(): Network[] {
        return this.modelsFromField('networks', n => new Network(n));
    }

    public get availabilityZones(): AvailabilityZone[] {
        return this.modelsFromField('availabilityZones', az => new AvailabilityZone(az));
    }

    toString() {
        return `Project(${this.toJSONString()})`;
    }

}

export class Projects extends Backbone.Collection<Project> {

    public get url() {
        return '/projects';
    }

    toString() {
        return `Projects(${JSON.stringify(this.models)})`;
    }

}
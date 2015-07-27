import * as Backbone from 'backbone';
import {BaseModel} from './base';

export class Settings extends BaseModel {

}

export class Clouds extends Backbone.Collection<Cloud> {

    constructor(clouds: Cloud[]) {
        super(clouds);
    }

}

export class Cloud extends BaseModel {

    private _name: string;

    constructor(name: string, options = {}) {
        options['name'] = name;
        super(options);
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    toString() {
        return `Cloud(${this.toJSONString()}})`;
    }

}

export class Project extends Cloud {

    private _selected: boolean;

    constructor(name: string, regionName: string = '', selected: boolean = false) {
        let finalName = (regionName.length > 0) ?
            `${name} - ${regionName}` : name;
        super(finalName, {selected});
        this._selected = selected;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        this._selected = value;
    }

    toString() {
        return `Project(${this.toJSONString()}})`;
    }

}
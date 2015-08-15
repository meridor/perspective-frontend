import * as Backbone from 'backbone';
import {Logger} from '../misc/logger';

let logger = new Logger('model:base');

export class BaseModel extends Backbone.Model {

    toJSONString() {
        return JSON.stringify(this.toJSON());
    }

    modelsFromField<T extends BaseModel>(field: string, fn: (any) => T): T[] {
        let rawElements: Array<any> = this.get(field);
        return rawElements.map((e) => fn.apply(e));
    }

}

export class IdentifiedModel extends BaseModel {

    public get id(): string {
        return this.get('id');
    }

    public get name(): string {
        return this.get('name');
    }

}

export class BaseCollection<T extends Backbone.Model> extends Backbone.Collection<T> {

    toJSONString() {
        return JSON.stringify(this.models);
    }

}

//Default Backbone.sync implementation
let oldSync = Backbone.sync;
Backbone.sync = function (method, model, options) {
    logger.debug(`Syncing state for method = ${method} of model ${model} with options ${JSON.stringify(options)}`);
    return oldSync(method, model, options);
};
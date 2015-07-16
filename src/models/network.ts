import {BaseModel} from './base';

export class Network extends BaseModel {

    toString():string {
        return `Network(${this.toJSONString()})`;
    }

}

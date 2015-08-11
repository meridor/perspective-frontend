import {BaseModel} from './base';

export class User extends BaseModel {

    toString() {
        return `User(${this.toJSONString()})`;
    }

}

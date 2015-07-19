import {BaseModel} from './base';

export class Image extends BaseModel {

    toString(): string {
        return `Image(${this.toJSONString()})`;
    }

}

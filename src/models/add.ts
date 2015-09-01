import {BaseModel} from './base';

export class AddPanelForm extends BaseModel {

    toString(): string {
        return `AddPanelForm(${this.toJSONString()})`;
    }

}

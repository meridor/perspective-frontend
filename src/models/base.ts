import * as Backbone from 'backbone';

export class BaseModel extends Backbone.Model {
    
    toJSONString(){
        return JSON.stringify(this.toJSON());
    }    
    
}
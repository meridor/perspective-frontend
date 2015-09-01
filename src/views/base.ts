import * as Marionette from 'backbone.marionette';
import * as _ from 'underscore';
import {Logger} from '../misc/logger';

let logger = new Logger('view:base');
export class BaseModal<TModel extends Backbone.Model> extends Marionette.ItemView<TModel> {

    constructor(model: TModel, public template: () => string, labelId: string = 'modalLabel') {
        super({
            id: 'modal',
            className: 'modal fade',
            model: model
        });
        this.$el.attr({
            'tabindex': '-1',
            'role': 'dialog',
            'aria-labelledby': 'addWindowLabel'
        });
        _.bindAll(this, 'show', 'teardown', 'render');
        this.delegateEvents({
            'hidden.bs.modal': 'teardown'
        });
        this.render();
    }
    
    teardown() {
        this.$el.data('modal', null);
        this.remove();
    }

    render(): Marionette.ItemView<TModel> {
        this.$el.html(this.template());
        this.$el.modal({backdrop: false, show: false});
        return <Marionette.ItemView<TModel>> this;
    }

    show() {
        this.$el.modal('show');
    }

}
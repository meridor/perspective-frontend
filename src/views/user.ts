import * as Marionette from 'backbone.marionette';
import {User} from '../models/user';

export class UserMenuView extends Marionette.ItemView<User> {

    constructor(user: User) {
        let userMenu = require('../templates/user/menu.hbs');
        super({
            tagName: 'ul',
            className: 'nav navbar-nav navbar-right',
            model: user,
            template: userMenu(user.toJSON())
        });

    }

    onRender(): void {
        this.$el = this.$el.children();
        this.$el.unwrap();
        this.setElement(this.$el);
    }

}
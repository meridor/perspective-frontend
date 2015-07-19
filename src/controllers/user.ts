import * as Marionette from 'backbone.marionette';
import {App} from '../app';
import {User} from '../models/user';
import {UserMenuView} from '../views/user';
import {Logger} from '../misc/logger';

let logger = new Logger('controller:user');

export class UserController extends Marionette.Object {

    showUserMenu() {
        logger.debug('Showing user menu');
        let user = new User({
            name: 'vania-pooh'
        });
        let userMenu = new UserMenuView(user);
        App.instance
            .mainLayoutView
            .headerView
            .user
            .show(userMenu);
    }

}
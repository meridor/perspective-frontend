import * as Marionette from 'backbone.marionette';
import {InstancesController} from './instance';
import {CloudsController} from './clouds';
import {UserController} from './user';

export class MainController extends Marionette.Object {

    private _instancesController: InstancesController;

    private _cloudsController: CloudsController;

    private _userController: UserController;

    constructor() {
        super();
        this._instancesController = new InstancesController();
        this._cloudsController = new CloudsController();
        this._userController = new UserController();
    }

    list() {
        this._instancesController.listInstances();
        this._cloudsController.listClouds();
        this._userController.showUserMenu();
    }

}

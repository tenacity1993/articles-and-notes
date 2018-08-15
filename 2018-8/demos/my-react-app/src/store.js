import {observable, action, runInAction, computed} from 'mobx'


class store {
    // list: todos
    @observable list = [];
    @observable item = {};
}
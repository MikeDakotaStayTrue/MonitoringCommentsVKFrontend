import {makeAutoObservable} from "mobx";

export default class DiscussStore {
    constructor() {
        this._id = 0
        makeAutoObservable(this)
    }

    setId(id) {
        this._id = id
    }

    get id() {
        return this._id
    }
}
import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._email = {}
        this._id = {}
        this._password = {}
        this._confirmed = {}
        this._code = {}
        this._passwordVK = {}
        this._loginVk = {}
        this._createdAt = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) { this._isAuth = bool}
    setUser(user) {this._user = user}
    setEmail(email) {this._email = email}
    setID(id) { this._id = id}
    setPassword(password) {this._password = password}
    setConfirmed(bool) {this._confirmed = bool}
    setCode(code) { this._code = code}
    setPasswordVK(passwordVK) {this._passwordVK = passwordVK}
    setLoginVK(loginVK) {this._loginVK = loginVK}
    setCreatedAt(createdAt) { this._createdAt = createdAt}

    get isAuth() {return this._isAuth}
    get user() {return this._user}
    get email() {return this._email}
    get id() {return this._id}
    get password() {return this._password}
    get confirmed() {return this._confirmed}
    get code() {return this._code}
    get passwordVK() {return this._passwordVK}
    get loginVK() {return this._loginVK}
    get createdAt() {return this._createdAt}
}
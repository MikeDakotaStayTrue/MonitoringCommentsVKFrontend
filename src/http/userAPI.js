import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('/auth/register', {email, password})
    if (data.result == true)
        alert("Regiser success!\nNeed to confirm email!")
    else
        alert(data.errorMessage)
    return true
}

export const login = async (email, password) => {
    const {data} = await $host.post('/auth/login', {email, password})
    if (data.errorMessage === "Confirm your email"){
        alert("Confirm Your email!")
        return 1;
    }
    if (data.errorMessage === "Error - user not exist"){
        alert("Error - user not exist!")
        return 2;
    }

    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    return 3;
}

export const confirm = async (email, code) => {
    const {data} = await $host.post('/auth/confirm', {email, code})
    if (data.result == true){
        alert("Email confirm success!")
    }
    else{
        alert("Code is incorrect!")
    }
    return true
}

export const logout = async (refreshToken) => {
    const {data} = await $authHost.post('/auth/logout', {refreshToken})

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return true
}

export const refresh = async () => {
    let refreshToken = localStorage.getItem('refreshToken');
    const {data} = await $authHost.post('/auth/refresh', {refreshToken})

    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)

    return jwt_decode(data.accessToken)
}

export const changePassword = async (email, password, new_password) => {
    const {data} = await $host.post('/auth/change_password', {email, password, new_password})
    if (data.result == true){
        alert("Password successfully changed!")
    }
    else{
        alert("Error!")
    }
    return true
}

export const add_vk = async (login, password) => {
    const {data} = await $authHost.post('/profile/add_vk', {login, password})
    return data
}

export const get_profile = async () => {
    const {data} = await $authHost.get('/profile/get_profile')
    return data
}

export const update_profile = async (name) => {
    const {data} = await $authHost.post('/profile/update_profile', {name})
    return data.profile.name
}
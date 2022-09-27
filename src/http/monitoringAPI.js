import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const discussion_add = async (link, description) => {

    const array = link.split("-")[1].split("_");
    const groupId = array[0]
    const topicId = array[1]

    const {data} = await $authHost.post('/discussions/add', {groupId, topicId, description})
    return data
}

export const discussion_get = async () => {
    const {data} = await $authHost.get('/discussions/get') 
    return data
}

export const discussion_del = async (discussion_id) => {
    const {data} = await $authHost.post('/discussions/del', {discussion_id}) 
    return data
}

export const discussion_add_list = async (discussion_id, list_id, type) => {
    const {data} = await $authHost.post('/discussions/add_list', {discussion_id, list_id, type}) 
    return data
}

export const discussion_get_accepted = async (discussion_id) => {
    const {data} = await $authHost.get('/discussions/get_accepted', {params: {discussion_id}})
    return data
}

export const lists_get = async () => {
    const {data} = await $authHost.get('/lists/get_lists') 
    return data
}

export const list_add = async (name, type) => {
    const {data} = await $authHost.post('/lists/add_list', {name, type}) 
    return data
}

export const list_add_word = async (words, list_id) => {
    const {data} = await $authHost.post('/lists/add_to_list', {words, list_id}) 
    return data
}

export const list_get_words = async (list_id) => {
    const {data} = await $authHost.get('/lists/get_list', {params: {list_id}}) 
    return data
}

export const list_del = async (list_id) => {
    const {data} = await $authHost.post('/lists/del_list', {list_id}) 
    return data
}

export const monitor_get_posts = async (discussion_id) => {
    const message_num = 2
    const {data} = await $authHost.get('/monitor/get_posts', {params: {discussion_id, message_num}}) 
    return data
}
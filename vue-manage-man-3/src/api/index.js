import instance from "@/utils/request";

export const getData = () => {
    return instance.get('/home/getData')
}

export const getUser = (params) => {
    return instance.get('/user/getUser', params)
}

export const addUser = (data) => {
    return instance.post('/user/add', data)
}

export const delUser = (data) => {
    return instance.post('/user/del', data)
}

export const editUser = (data) => {
    return instance.post('/user/edit', data)
}

export const getMenu = (data) => {
    return instance.post('/permission/getMenu', data)
}
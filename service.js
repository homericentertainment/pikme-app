import { httpService } from "./http.service"

export const service = {
    getUser,
    createUser
}

async function getUser(id) {
    const user = await httpService.get('get-user/' + id)
    return user
}

async function createUser(user) {
    const newUser = await httpService.post('create-user', {user} )
    return newUser
}

import { httpService } from "./http.service"

export const service = {
    getUser,
    createUser,
    getSaved,
    getCurrentEvent,
    addVote,
    createEvent
}

async function getUser(id) {
    const user = await httpService.get('get-user/' + id)
    return user
}

async function createUser(user) {
    const newUser = await httpService.post('create-user', { user })
    return newUser
}

async function getSaved(userId) {
    const saved = await httpService.get('get-saved/' + userId)
    return saved
}

async function getCurrentEvent() {
    const currentEvent = await httpService.get('get-current-event')
    return currentEvent
}

async function addVote(userId, chosen) {
    const confirm = await httpService.put('vote/' + userId, { chosen })
    return confirm
}

async function createEvent() {
    console.log('createEvent')
    const newEvent = await httpService.post('create-event')
    return newEvent
}


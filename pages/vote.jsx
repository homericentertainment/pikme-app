import { Text,View } from 'react-native'
import { Txt } from '../cmps/txt'
import style from '../style'
import { useState, useEffect } from 'react'
import { Error } from './error'
import { Loader } from '../cmps/loader'
import { service } from '../service'

export function Vote({ user, setUpperPopup, setPage, setHeader }) {
    const [event, setEvent] = useState(null)
    const [voteState, setVoteState] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        loadCurrentEvent()
    }, [])

    const loadCurrentEvent = async () => {
        try {
            const loadedEvent = await service.getCurrentEvent()
            console.log(loadedEvent.title)
            setHeader(loadedEvent.title)
            setEvent(loadedEvent)
            if (loadedEvent.voters[user._id]) {
                setVoteState('voted')
                return
            }
            const prevId = await service.loadFromStorage('prevId')
            let state
            if (prevId === loadedEvent._id) {
                const stateFromStorage = await service.loadFromStorage('voteState')
                if (!stateFromStorage) state = createNewState(loadedEvent)
                else state = stateFromStorage
            }
            else {
                state = createNewState(loadedEvent)
                await service.saveToStorage('prevId', loadedEvent._id)
            }
            setVoteState(state)
        }
        catch (err) {
            setError(true)
            console.log('888', err)
        }
    }

    const createNewState = (loadedEvent) => {
        const participants = Object.keys(loadedEvent.participants)
        let state = {
            currentTier: 1,
            totalParticipants: participants.length,
            1: participants,
            totalQuestions: participants.length - 1,
            answeredQuestions: 0
        }
        for (i = 2; i <= Math.log2(4) + 1; i++) state[i] = []
        return state
    }

    const handleChoice = async (chosenIdx) => {
        let { currentTier } = voteState
        if (currentTier === Math.log2(voteState.totalParticipants)) {
            vote(voteState[currentTier][chosenIdx])
            return
        }
        const nextTier = voteState[currentTier + 1]
        nextTier.push(voteState[currentTier][chosenIdx])
        let current = voteState[currentTier]
        current.splice(0, 2)
        let tier = voteState.currentTier
        if (current.length === 0) tier++
        const newState = { ...voteState, currentTier: tier, [currentTier + 1]: voteState[currentTier + 1], [currentTier]: current, answeredQuestions: voteState.answeredQuestions + 1 }
        await service.saveToStorage('voteState', newState)
        setVoteState(newState)
    }

    const vote = async (chosen) => {
        try {
            await service.addVote(user._id, chosen)
            loadCurrentEvent()
        }
        catch {
            setUpperPopup('error')
        }
    }

    const saveAnime = async (anime, image) => {
        try {
            await service.saveAnime(user._id, anime, image)
            setUpperPopup('saved')

        }
        catch {
            setUpperPopup('error')
        }
    }

    if (error) return <Error />

    if (!voteState) return <Loader />

    if (voteState === 'voted') {
        try {
            const participants = Object.values(event.participants).sort((a, b) => b.votes - a.votes)
            return <View>
                {participants.map((p) => <View key={p.name}>
                    <Text style={style.words}>{p.name} : {p.votes}</Text>
                    <Text style={style.words} onPress={() => saveAnime(p.from, p.animeImage)}>save {p.from}</Text>
                </View>)}
            </View>
        }
        catch (err) {
            console.log('222', err)
            return <Error />
        }
    }

    try {
        const { currentTier } = voteState
        return (
            <View >
                <Text style={style.words}>{voteState.answeredQuestions}/{voteState.totalQuestions}</Text>
                <Text style={style.words}>{event.title}</Text>
                <Text style={style.words}>{event._id}</Text>
                <Text style={style.words} onPress={() => handleChoice(0)}>{voteState[currentTier][0]}</Text>
                <Text style={style.words} onPress={() => handleChoice(1)}>{voteState[currentTier][1]}</Text>
            </View>
        )
    }

    catch (err) {
        console.log('444', err)
        return <Error />
    }
}


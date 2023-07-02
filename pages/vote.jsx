import { Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setUpperPopup} from '../store/reducer'
import { Error } from './error'
import { Loader } from '../cmps/loader'
import { service } from '../service'

export function Vote({ user, style }) {
    const dispatch = useDispatch()
    const [event, setEvent] = useState(null)
    const [voteState, setVoteState] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        loadCurrentEvent()
    }, [])

    const loadCurrentEvent = async () => {
        try {
            const loadedEvent = await service.getCurrentEvent()
            setEvent(loadedEvent)
            if (loadedEvent.voters[user._id]) {
                setVoteState('voted')
                return
            }
            console.log(loadedEvent)
            const state = {
                currentTier: 1,
                totalParticipants: loadedEvent.participants.length,
                1: loadedEvent.participants
            }
            for (i = 2; i <= Math.log2(4) + 1; i++) state[i] = []
            setVoteState(state)
        }
        catch (err) {
            setError(true)
            console.log(err)
        }
    }

    const handleChoice = (chosenIdx) => {
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
        setVoteState({ ...voteState, currentTier: tier, [currentTier + 1]: voteState[currentTier + 1], [currentTier]: current })
    }

    const vote = async (chosen) => {
        try {
            const g = chosen.ll.gg
            await service.addVote(user._id, chosen)
            setVoteState('voted')
        }
        catch {
            dispatch(setUpperPopup('error'))
            setError(true)
        }

    }

    if (error) return <Error />

    if (!voteState) return <Loader />

    if (voteState === 'voted') {
        try {
            const participants = Object.keys(event.votes)
            const votes = Object.values(event.votes)
            return <View>
                {participants.map((participant, idx) => <Text key={idx}>{participant} : {votes[idx]}</Text>)}
            </View>
        }
        catch {
            return <Error />
        }
    }

    try {
        const { currentTier } = voteState
        return (
            <View>
                <Text onPress={() => handleChoice(0)}>{voteState[currentTier][0]}</Text>
                <Text onPress={() => handleChoice(1)}>{voteState[currentTier][1]}</Text>
            </View>
        )
    }

    catch (err) {
        console.log(err)
        return <Error />
    }
}


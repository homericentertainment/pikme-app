import { Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Error } from './error'
import { Loader } from '../cmps/loader'
import { service } from '../service'

export function Vote({ user, style }) {

    const [event, setEvent] = useState(null)
    const [voteState, setVoteState] = useState(null)





    useEffect(() => {
        loadCurrentEvent()
    }, [])

    const loadCurrentEvent = async () => {
        try {
            // const loadedEvent = await service.getCurrentEvent()
            // setEvent(loadedEvent)

            const loadedEvent = {}
            loadedEvent.participants = [
                'John', 'Emma', 'Michael', 'Sophia', 'Robert', 'Olivia', 'William', 'Ava',
                'David', 'Mia', 'Joseph', 'Isabella', 'James', 'Charlotte', 'Charles', 'Amelia',
                'George', 'Emily', 'Daniel', 'Abigail', 'Matthew', 'Harper', 'Jackson', 'Evelyn',
                'Andrew', 'Elizabeth', 'Henry', 'Sofia', 'Anthony', 'Victoria', 'Thomas', 'Grace'
            ]

            const state = {
                currentTier: 1,
                totalParticipants: loadedEvent.participants.length,
                1: loadedEvent.participants
            }
            for (i = 2; i <= Math.log2(32) + 1; i++) state[i] = []
            setVoteState(state)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleChoice = (chosenIdx) => {
        let { currentTier } = voteState
        const nextTier = voteState[currentTier + 1]
        nextTier.push(voteState[currentTier][chosenIdx])
        let current = voteState[currentTier]
        current.splice(0, 2)
        let tier = voteState.currentTier
        if (current.length === 0) tier++
        setVoteState({ ...voteState, currentTier: tier, [currentTier + 1]: voteState[currentTier + 1], [currentTier]: current })
    }

    if (!voteState) return <Loader/>

    let { currentTier, totalParticipants } = voteState

    if (currentTier === Math.log2(totalParticipants) + 1) return <Text>Winner:{voteState[currentTier][0]}</Text>

    try {
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


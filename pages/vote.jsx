import { Image, Text, View, TouchableHighlight } from 'react-native'
import style from '../style'
import { useState, useEffect } from 'react'
import { Error } from './error'
import { Swiper } from '../cmps/swiper'
import { Loader } from '../cmps/loader'
import { service } from '../service'

export function Vote({ user, setUpperPopup, setHeader }) {
    const [event, setEvent] = useState(null)
    const [voteState, setVoteState] = useState(null)
    const [error, setError] = useState(false)
    const [saved, setSaved] = useState({})

    useEffect(() => {
        loadCurrentEvent()
        loadSaved()
    }, [])

    const loadCurrentEvent = async () => {
        try {
            const loadedEvent = await service.getCurrentEvent()
            setHeader(loadedEvent.title + '?')
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
        setVoteState(async (prevState) => {
            const currentTier = prevState.currentTier
            if (currentTier === Math.log2(prevState.totalParticipants)) {
                vote(prevState[currentTier][chosenIdx])
                return prevState
            }

            const nextTier = prevState[currentTier + 1]
            nextTier.push(prevState[currentTier][chosenIdx])
            const current = prevState[currentTier].slice(2)
            let tier = prevState.currentTier
            if (current.length === 0) tier++
            const newState = {
                ...prevState,
                [currentTier + 1]: nextTier,
                [currentTier]: current,
                answeredQuestions: prevState.answeredQuestions + 1,
                currentTier: tier
            }
            await service.saveToStorage('voteState', newState)
            setVoteState(newState)
            return newState
        })
    }

    const vote = async (chosen) => {
        try {
            await service.addVote(user._id, chosen)
        }
        catch {
            setUpperPopup('error')
        }
        finally {
            loadCurrentEvent()
        }
    }

    async function loadSaved() {
        try {
            const loadedSaved = await service.getSaved(user._id)
            setSaved(loadedSaved)
        }
        catch (err) {
            console.log(err)
            setError(true)
        }
    }

    const handleSave = async (anime, image, spot, question) => {
        try {
            if (!saved[anime]) {
                console.log(0)
                const newAnime = await service.saveAnime(user._id, anime, image, spot, question)
                setSaved({ ...saved, [anime]: newAnime })
            }
            else {
                console.log(1)
                await service.deleteSaved(user._id, anime)
                const s = { ...saved }
                delete s[anime]
                setSaved(s)
            }
        }
        catch {
            setUpperPopup('error')
        }
    }

    const getImage = (idx) => {
        if (idx === 0) return <Image source={require('../images/1.webp')} />
        if (idx === 1) return <Image source={require('../images/2.webp')} />
        if (idx === 2) return <Image source={require('../images/3.webp')} />
    }

    if (error) return <Error />

    if (!voteState) return <Loader />

    try {
        if (voteState === 'voted') {
            const participants = Object.values(event.participants).sort((a, b) => b.votes - a.votes)
            return <View style={style.saved}>
                {participants.map((p, idx) => <View key={p.name} style={{ ...style.leadboardItem, borderColor: saved[p.from] ? '#699BF7' : 'rgba(255,255,255,0.6)' }}>
                    <View style={style.savedWrapper}>
                        <View >{idx <= 2 ? getImage(idx) : <Text style={{ width: 30, textAlign: 'center', color: 'white' }}>{idx + 1}</Text>}</View>
                        <Image style={style.savedImage} source={p.image} />
                        <View style={style.savedDetails}>
                            <Text>{p.name}</Text>
                            {p.name !== p.from && <Text>from {p.from}</Text>}
                        </View>
                    </View>
                    <TouchableHighlight style={style.saveButton} onPress={() => handleSave(p.from, p.animeImage, idx + 1, event.title)}>
                        <Image source={saved[p.from] ? require('../images/full.webp') : require('../images/empty.webp')} />
                    </TouchableHighlight>

                    <Text>{p.votes} Votes</Text>
                </View>)}
            </View>
        }

        const { currentTier } = voteState
        const first = event.participants[voteState[currentTier][0]]
        const second = event.participants[voteState[currentTier][1]]
        if(!first) return <Loader />
        return (
            <View style={style.vote}>
                <View style={style.progressWrapper}>
                    <View style={{ ...style.progress, width: `${(voteState.answeredQuestions / voteState.totalQuestions) * 100}%` }}></View>
                </View>
                <Swiper left={first.image} right={second.image} handleChoice={handleChoice} />
                <View style={style.randomize} ><Text onPress={() => handleChoice(Math.random() > 0.5 ? 0 : 1)} style={style.randomizeText}>Randomize</Text></View>
            </View>
        )
    }

    catch (err) {
        console.log('222', err)
        return <Error />
    }
}


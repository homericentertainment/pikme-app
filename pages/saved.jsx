import { Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { service } from '../service'
import { setUpperPopup } from '../store/reducer'
import { Loader } from '../cmps/loader'
import { Error } from './error'

export function Saved({ user, style }) {
    const dispatch = useDispatch()
    const [saved, setSaved] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        loadSaved()
    }, [])

    async function loadSaved() {
        try {
            const loadedSaved = await service.getSaved(user._id)
            setSaved(Object.values(loadedSaved))
        }
        catch (err) {
            console.log(err)
            setError(true)
        }
    }

    async function deleteSaved(animeName) {
        try {
            await service.deleteSaved(user._id, animeName)
            loadSaved()
        }
        catch (err) {
            console.log(err)
            dispatch(setUpperPopup('error'))
        }
    }

    if (error) return <Error />

    if (!saved) return <Loader />

    if (saved.length === 0) return <Text>no saved</Text>

    try {
        return (
            <View >
                <Text onPress={() => service.createEvent()}>create!</Text>
                {saved.map((anime, idx) => <Text onPress={() => deleteSaved(anime.name)} key={idx}>{anime.name}</Text>)}
            </View>
        )
    }
    catch {
        return <Error />
    }

}
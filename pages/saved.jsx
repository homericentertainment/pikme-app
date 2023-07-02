import { Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { service } from '../service'
import { Loader } from '../cmps/loader'
import { Error } from './error'

export function Saved({ user, style }) {
    const [saved, setSaved] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        loadSaved()
    }, [])

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

    if (error) return <Error />

    if (!saved) return <Loader />

    if (saved.length === 0) return <Text>no saved</Text>

    try {
        return (
            <View >
                <Text onPress={()=>service.createEvent()}>create!</Text>
                {saved.map((anime,idx) => <Text key={idx}>{anime.name}</Text>)}
            </View>
        )
    }
    catch {
        return <Error />
    }

}

import { Text, View } from 'react-native'
import style  from '../style'
import { useState, useEffect } from 'react'
import { service } from '../service'
import { Loader } from '../cmps/loader'
import { Error } from './error'

export function Saved({ user, setUpperPopup,setPage,setHeader }) {
    const [saved, setSaved] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        setHeader('My List')
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
            setUpperPopup('error')
            console.log(err)
        }
    }

    if (error) return <Error />

    if (!saved) return <Loader />

    if (saved.length === 0) return <Text>no saved for {user.name}</Text>

    try {
        return (
            <View >
                <Text>{user.name}</Text>
                {saved.map((anime, idx) => <Text onPress={() => deleteSaved(anime.name)} key={idx}>{anime.name}</Text>)}
            </View>
        )
    }
    catch {
        return <Error />
    }

}

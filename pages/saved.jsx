import { Image, Text, View } from 'react-native'
import style from '../style'
import { useState, useEffect } from 'react'
import { service } from '../service'
import { Loader } from '../cmps/loader'
import { Error } from './error'

export function Saved({ user, setUpperPopup, setHeader }) {
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

    if (saved.length === 0) return <Text style={style.noSaved}>There are currently no saved anime</Text>

    try {
        return (
            <View style={style.saved}>
                {saved.map((anime, idx) => <View key={idx} style={style.savedItem}>
                    <View style={style.savedWrapper}>
                        <Image style={style.savedImage} source={anime.image} />
                        <View style={style.savedDetails}>
                            <Text style={style.savedName}>{anime.name}</Text>
                            <Text style={style.savedSpot}>#{anime.spot} {anime.question}</Text>
                        </View>
                    </View>
                    <Text onPress={() => deleteSaved(anime.name)} style={style.remove}>-Remove</Text>
                </View>)}
            </View>
        )
    }
    catch (err) {
        console.log(err)
        return <Error />
    }

}

               
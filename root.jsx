import { Text, View } from 'react-native'
import { Loader } from './cmps/loader'
import { Error } from './pages/error'
import { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import { style } from './style.js'
import { Vote } from './pages/vote'
import { Saved } from './pages/saved'
import { UpperPopup } from './cmps/upper-popup'
import { service } from './service'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Root() {
    const [user, setUser] = useState(null)
    const [upperPopup, setUpperPopup] = useState('')
    const [page, setPage] = useState('saved')
    const [error, setError] = useState(false)

    useEffect(() => {
        loadFont()
        handleUser()
    }, [])

    async function loadFont() {
        await Font.loadAsync({
            'custom-font': require('./Roboto-Medium.ttf')
        })
    }

    const handleUser = async () => {
        try {
            const userFromStorage = await service.loadFromStorage('user')
            if (!userFromStorage) {
                const newUser = await service.createUser({ name: 'user' + Math.random() })
                await service.saveToStorage('user', newUser)
                setUser(newUser)
            }
            else setUser(userFromStorage)
        }
        catch (err) {
            console.log(err)
            setError(true)
        }
    }

    if (error) return <Error />

    if (!user) return <Loader />

    try {
        return (
            <View style={style.main}>
                {page === 'saved' && <Saved style={style} user={user} setUpperPopup={setUpperPopup} />}
                {page === 'vote' && <Vote style={style} user={user} setUpperPopup={setUpperPopup} />}
                <View style={style.footer}>
                    <Text onPress={() => setPage('saved')}>saved</Text>
                    <Text onPress={() => setPage('vote')}>vote</Text>
                    <Text onPress={() => service.createEvent()}>new ev</Text>
                </View>
                <UpperPopup tyle={style} upperPopup={upperPopup} setUpperPopup={setUpperPopup} />
            </View>
        )
    }
    catch (err) {
        console.log(err)
        return <Error />
    }
}         

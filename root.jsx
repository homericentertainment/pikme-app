import { Text, View, ImageBackground, ScrollView } from 'react-native'
import { Loader } from './cmps/loader'
import { Error } from './pages/error'
import { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import style from './style.js'
import { Vote } from './pages/vote'
import { Saved } from './pages/saved'
import { Landing } from './pages/landing'
import { Header } from './cmps/header'
import { UpperPopup } from './cmps/upper-popup'
import { service } from './service'

export default function Root() {
    const [user, setUser] = useState(null)
    const [upperPopup, setUpperPopup] = useState('')
    const [page, setPage] = useState('vote')
    const [error, setError] = useState(false)
    const [header, setHeader] = useState('')
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        loadFont()
        handleUser()
    }, [])

    async function loadFont() {
        await Font.loadAsync({
            'custom-font': require('./Roboto-Medium.ttf')
        })
        const landing = await service.loadFromStorage('landing')
        if (!landing) setPage('landing')
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
            <ImageBackground source={require('./images/background.webp')} style={{ width: '100%', height: '100%' }}>
                {page !== 'landing' && <Header header={header} setPage={setPage} />}
                <ScrollView>
                    <View style={style.main}>
                        {page === 'saved' && <Saved style={style} user={user} setUpperPopup={setUpperPopup} setPage={setPage} setHeader={setHeader} />}
                        {page === 'vote' && <Vote style={style} user={user} setUpperPopup={setUpperPopup} setPage={setPage} setHeader={setHeader} />}
                        {page === 'landing' && <Landing setPage={setPage} />}
                        <UpperPopup tyle={style} upperPopup={upperPopup} setUpperPopup={setUpperPopup} />
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
    catch (err) {
        console.log(err)
        return <Error />
    }
}         

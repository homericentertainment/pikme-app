import { Text, View } from 'react-native'
import { Loader } from './cmps/loader'
import { useSelector, useDispatch } from 'react-redux'
import { setPage, setUser } from './store/reducer'
import { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import style from './style/main.css'
import { Vote } from './pages/vote'
import { Saved } from './pages/saved'
import { UpperPopup } from './cmps/upper-popup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { service } from './service'

export default function Root() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.reducer)
    const { page } = useSelector(state => state.reducer)
    const [error, setError] = useState(false)

    useEffect(() => {
        loadFont()
        handleUser()
    }, [])

    async function loadFont() {
        await Font.loadAsync({
            'custom-font': require('./style/Roboto-Medium.ttf'),
        })
    }

    const handleUser = async () => {
        try {
            const newUser = await service.createUser({ name: 'user' + Math.random() })
            console.log(newUser)
            await AsyncStorage.setItem('user', newUser)
        }
        catch{
setError('4444')
        }
        // try {
        //     const userFromStorage = await AsyncStorage.getItem('user')
        //     if (!userFromStorage) {
        //         const newUser = await service.createUser({ name: 'user' + Math.random() })
        //         await AsyncStorage.setItem('user', newUser)
        //         dispatch(setUser(newUser))
        //     }
        //     else dispatch(setUser(user))

        // }
        // catch (err) {
        //     console.log(err)
        //     setError('22222222222')
        // }
    }

    if (error) {
        console.log(error)
        return <Text>{error}</Text>
    }

    return <View style={style.main}>
        <Text>{error}</Text>
    </View>

    if (!user) return <Loader />

    return (
        <View style={style.main}>
            {page === 'saved' && <Saved style={style} user={user} />}
            {page === 'vote' && <Vote style={style} user={user} />}
            <View style={style.footer}>
                <Text onPress={() => dispatch(setPage('saved'))}>saved</Text>
                <Text onPress={() => dispatch(setPage('vote'))}>vote</Text>
            </View>
            <UpperPopup style={style} />
        </View>
    )
}

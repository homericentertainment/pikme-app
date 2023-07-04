import { Text, View } from 'react-native'
import { Loader } from './cmps/loader'
import { useSelector, useDispatch } from 'react-redux'
import { setPage, setUser } from './store/reducer'
import { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import style from './style/main.css'
import { AsyncStorage } from 'react-native'
import { Vote } from './pages/vote'
import { Saved } from './pages/saved'
import { UpperPopup } from './cmps/upper-popup'
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
        if(!AsyncStorage) setError('000000000')
        else setError('999999')

        // try {
        //     if(!AsyncStorage) setError('000000000')
        //     const userFromStorage = await AsyncStorage.getItem('user')
        //     try{
        //         if (!userFromStorage) {
        //         const newUser = await service.createUser({ name: 'user' + Match.random() })
        //         await AsyncStorage.setItem('user', newUser)
        //         dispatch(setUser(newUser))
        //     }
        //     else dispatch(setUser(user))
        //     }
        //     catch{
        //         setError('111111')
        //     }
        // }
        // catch (err) {
        //     setError('22222222222')
        // }

    }

    if (error) {
        return <Text>{error}</Text>
    }

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

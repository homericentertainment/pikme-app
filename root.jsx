import { Text, View } from 'react-native'
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
    const { page } = useSelector(state => state.reducer)

    useEffect(() => {
        loadFont()
        // handleUser()
    }, [])

    async function loadFont() {
        await Font.loadAsync({
            'custom-font': require('./style/Roboto-Medium.ttf'),
        })
    }

    const handleUser = async () => {
        // const userId = await AsyncStorage.getItem('userId')
        // if (!userId) {
        //     try {
        //         const newUser = await service.createUser({ name: 'shoval' })
        //         setLog(newUser._id)
        //         await AsyncStorage.setItem('userId', newUser)
        //     }
        //     catch (err) {
        //         console.log(err)
        //     }
        // }
        // else {
        //     try {
        //         const user = await service.getUser(userId)
        //     }
        //     catch (err) {
        //         console.log(err)
        //     }
        // }
    }

    return (
        <View style={style.main}>
            {page === 'saved' && <Saved style={style} user={{ _id: '64a16bc001e9edc6d8b9c43a' }} />}
            {page === 'vote' && <Vote style={style} user={{ _id: '64a16bc001e9edc6d8b9c43a' }}/>}
            <View style={style.footer}>
                <Text onPress={() => dispatch(setPage('saved'))}>saved</Text>
                <Text onPress={() => dispatch(setPage('vote'))}>vote</Text>
            </View>
            <UpperPopup />
        </View>
    )
}

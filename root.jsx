import { Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setPage, setUser } from './store/reducer'
import { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import st from './style/main.scss'
import { AsyncStorage } from 'react-native'
import { service } from './service'

export default function Root() {
    const dispatch = useDispatch()
    const page = useSelector(state => state.reducer)
    console.log(page)
    const [log, setLog] = useState('')
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
        const userId = await AsyncStorage.getItem('userId')
        if (!userId) {
            try {
                const newUser = await service.createUser({ name: 'shoval' })
                setLog(newUser._id)
                await AsyncStorage.setItem('userId', newUser)
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            try {
                const user = await service.getUser(userId)
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <View style={st.main}>
            {page === '1' && <Text>1ffffffff</Text>}
            {page === 'home' && <Text>hffffffffome</Text>}
            {page === '3' && <Text>3dddddddddd</Text>}
            <View style={st.footer}>
                <Text onPress={() => dispatch(setPage('1'))}>1</Text>
                <Text onPress={() => dispatch(setPage('home'))}>shoval is gay {log}</Text>
                <Text onPress={() => dispatch(setPage('3'))}>3</Text>
            </View>
        </View>
    )
}

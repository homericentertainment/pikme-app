import { Text, View } from 'react-native'
import { useEffect } from 'react'
import * as Font from 'expo-font'
import st from './style/main.scss'
import { AsyncStorage } from 'react-native'

export default function App() {

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
    const user = await AsyncStorage.getItem('user')
    if (!user) {
      let newUser = service.createUser()
      
    }
  }

  return (
    <View>
      <Text>shoval is gay </Text>
    </View>
  )
}

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import st from './style/main.scss'
import { mm } from './ser'

export default function App() {

  return (
    <View style={st.lala}>
      <Text>Shoval is gay AF {mm.lala()}</Text>
      <StatusBar style="auto" />
    </View>
  )
}

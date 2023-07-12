import React from 'react'
import style from '../style'
import { View, ActivityIndicator } from 'react-native'

export function Loader() {
  return (
    <View style={style.main}>
      <ActivityIndicator size="large" color='#699BF7' />
    </View>
  )
}
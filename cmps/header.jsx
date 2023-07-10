import { View, Image, TouchableHighlight } from 'react-native'
import { Txt } from './txt'
import style from '../style'
export function Header({ header, setPage }) {

    navigate = () => {
        if (header === 'My List') setPage('vote')
        else setPage('saved')
    }

    return (
        <View style={style.header}>
            <TouchableHighlight onPress={() => { () => console.log('mmm') }} ><Image style={style.menuIcon} source={require('../images/menu.webp')} /></TouchableHighlight>
            <Txt msg={header} fontSize={20}/>
            <TouchableHighlight onPress={navigate} ><Image style={style.menuIcon} source={require('../images/switch.webp')} /></TouchableHighlight>
        </View>
    )
}

import { Text, View, Image, TouchableHighlight, ImageBackground } from 'react-native'
import style from '../style'

export function Header({ header, setPage }) {
    navigate = () => {
        if (header === 'My List') setPage('vote')
        else setPage('saved')
    }
    try {
        return (
            <ImageBackground style={style.header} source={require('../images/background.webp')}>
                <View style={style.header}>
                    <TouchableHighlight onPress={() => { () => console.log('mmm') }} ><Image style={style.menuIcon} source={require('../images/menu.webp')} /></TouchableHighlight>
                    <Text style={style.headerText}>{header}</Text>
                    <TouchableHighlight onPress={navigate} ><Image style={style.menuIcon} source={header === 'My List' ? require('../images/play.webp') : require('../images/list.webp')} /></TouchableHighlight>
                </View>
            </ImageBackground>
        )
    }
    catch (err) {
        console.log(err)
        return <View></View>
    }

}

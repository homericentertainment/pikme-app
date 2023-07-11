import { Text, View, Image } from 'react-native'
import style from '../style'

export function Error() {
    return (
        <View style={style.error}>
            <Image style={style.errorImage} source={require('../images/error.webp')} />
            <Text style={style.errorText}>This page cannot be displayed right now, please try again later.</Text>
        </View>
    )
}

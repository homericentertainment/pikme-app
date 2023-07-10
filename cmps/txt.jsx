
import style from '../style'
import { Text } from 'react-native'

export function Txt({ msg = '', className = 'words', onClick = () => { }, p = null, fontSize = 16, opacity = 1 }) {
    return <Text style={{ ...style[className], fontSize, opacity }} onPress={() => onClick(p)}>{msg}</Text>
}

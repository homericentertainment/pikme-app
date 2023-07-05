import { View, Text } from 'react-native'
import { useEffect } from "react"

export function UpperPopup({ style, upperPopup, setUpperPopup }) {
    useEffect(() => {
        if (upperPopup) reset()
    }, [upperPopup])

    const reset = () => {
        setTimeout(() => { setUpperPopup('') }, 4000)
    }

    if (!upperPopup) return <></>

    return (
        <View style={style.upperPopupWrapper}>
            <View style={style.upperPopup}>
                {upperPopup === 'error' && <Text>Something went wrong... please try again later</Text>}
                {upperPopup === 'saved' && <Text>saved!</Text>}
            </View>
        </View>
    )
}
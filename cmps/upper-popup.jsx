import { View, Text } from 'react-native'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUpperPopup } from "../store/reducer"

export function UpperPopup({style}) {
    const dispatch = useDispatch()
    const { upperPopup } = useSelector(state => state.reducer)

    useEffect(() => {
        if (upperPopup) reset()
    }, [upperPopup])

    const reset = () => {
        setTimeout(() => { dispatch(setUpperPopup('')) }, 4000)
    }

    if(!upperPopup) return <></>

    return (
        <View style={style.upperPopupWrapper}>
            <View style={style.upperPopup}>
            {upperPopup === 'error' && <Text>Something went wrong... please try again later</Text>}
            {upperPopup === 'saved' && <Text>saved!</Text>}
            </View>
        </View>
    )
}
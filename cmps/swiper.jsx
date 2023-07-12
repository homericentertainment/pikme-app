import React, { useRef, useState } from 'react'
import { Text, View, Image, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native'
const totalWidth = Dimensions.get('window').width - 36

export function Swiper({ left, right, handleChoice }) {
    const [widthLeft, setWidthLeft] = useState(totalWidth / 2)
    const [widthRight, setWidthRight] = useState(totalWidth / 2)
    const [zIndexLeft, setZIndexLeft] = useState(0)
    const [zIndexRight, setZIndexRight] = useState(0)

    const panResponderLeft = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                if (gesture.dx > 0) {
                    setWidthLeft(totalWidth / 2 + gesture.dx)
                    setZIndexLeft(1)
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx > totalWidth * 0.3) handleChoice(0)
                setWidthLeft(totalWidth / 2)
                setZIndexLeft(0)
            },
        })
    ).current

    const panResponderRight = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                if (gesture.dx < 0) {
                    setWidthRight(totalWidth / 2 - gesture.dx)
                    setZIndexRight(1)
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (-gesture.dx > totalWidth * 0.3) handleChoice(1)
                setWidthRight(totalWidth / 2)
                setZIndexRight(0)
            },
        })
    ).current


    try {
        return (
            <View style={styles.swipeHolder}>
                <Animated.View style={[styles.left, { width: widthLeft, zIndex: zIndexLeft }]}{...panResponderLeft.panHandlers}>
                    <Image source={left} style={{ ...styles.left, width: widthLeft }} />
                </Animated.View>
                <Animated.View style={[styles.right, { width: widthRight, zIndex: zIndexRight }]}{...panResponderRight.panHandlers}>
                    <Image source={right} style={{ ...styles.right, width: widthRight }} />
                </Animated.View>
            </View>
        )
    }
    catch (err) {
        console.log(err)
        return <Text>Error</Text>
    }

}

const styles = StyleSheet.create({
    swipeHolder: {
        flex: 100,
        width: '100%',
        height: (Dimensions.get('window').width - 36),
        marginBottom: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    left: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        maxWidth: totalWidth
    },
    right: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        height: '100%',
        resizeMode: 'cover',
        maxWidth: totalWidth
    },
})

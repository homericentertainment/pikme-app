import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, PanResponder, Animated } from 'react-native';

export function Vote() {
    const [width, setWidth] = useState(200)

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                if (gesture.dx > 0) {
                    setWidth(200 + gesture.dx);
                }
                console.log(gesture.dx)
            },
            onPanResponderRelease: (_, gesture) => {
                console.log(gesture.dx);
                setWidth(200);
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.imageContainer, { width: width }]}
                {...panResponder.panHandlers}
            >
                <Image source={'https://pbs.twimg.com/profile_images/1192101281252495363/c_xL2w3j_400x400.jpg'} style={{ ...styles.image, width }} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '400px',
        backgroundColor: 'red',

    },
    imageContainer: {
        width: 200,
        height: 200,
    },
    image: {
        height: '300px',

        resizeMode: 'cover',
    },
});

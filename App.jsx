/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import Video from 'react-native-video';
import {
    Dimensions,
    StatusBar,
    Text,
    View,
} from 'react-native';
import { StyleSheet } from "react-native";
import Sound from 'react-native-sound';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const { height } = Dimensions.get("window");

function App() {

    useEffect(() => {
        const whoosh = new Sound('katawaredoki.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            } else {
                whoosh.play()
            }
        })

        StatusBar.setHidden(true)
        SystemNavigationBar.navigationHide();

    }, [])

    return (
        <View>
            <Video
                source={require('./src/assets/videos/bg.mp4')}
                style={styles.backgroundVideo}
                muted={true}
                repeat={false}
                resizeMode={"cover"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    }
});


export default App;
